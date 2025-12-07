import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStu = { name, age: Number(age), class: stuClass };
    axios.post('http://localhost:5001/api/students', newStu)
      .then(res => {
        console.log("Đã thêm:", res.data);
        setStudents(prev => [...prev, res.data]);
        setName("");
        setAge("");
        setStuClass("");
      })
      .catch(err => console.error("Lỗi khi thêm:", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa học sinh này?")) return;
    axios.delete(`http://localhost:5001/api/students/${id}`)
      .then(res => {
        console.log(res.data.message);
        setStudents(prevList => prevList.filter(s => s._id !== id));
      })
      .catch(err => console.error("Lỗi khi xóa:", err));
  };

  return (
    <div className="App">
      <h1>Quản lý học sinh</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Thêm học sinh mới</h2>
        <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto', gap: '10px' }}>
          <input
            type="text"
            placeholder="Họ tên"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <input
            type="number"
            placeholder="Tuổi"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <input
            type="text"
            placeholder="Lớp"
            value={stuClass}
            onChange={e => setStuClass(e.target.value)}
            required
            style={{ padding: '8px', fontSize: '14px' }}
          />
          <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            Thêm học sinh
          </button>
        </form>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', width: '300px', borderRadius: '5px', border: '1px solid #ddd', marginRight: '10px' }}
        />
        <button 
          onClick={() => setSortAsc(prev => !prev)}
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#FF9800', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}
        >
          Sắp xếp theo tên: {sortAsc ? 'A → Z' : 'Z → A'}
        </button>
      </div>

      <h2>Danh sách học sinh</h2>
      {students.length === 0 ? (
        <p>Chưa có học sinh nào</p>
      ) : (
        (() => {
          const filteredStudents = students.filter(s =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          const sortedStudents = [...filteredStudents].sort((a, b) => {
            if (a.name < b.name) return sortAsc ? -1 : 1;
            if (a.name > b.name) return sortAsc ? 1 : -1;
            return 0;
          });
          return sortedStudents.length === 0 ? (
            <p>Không tìm thấy học sinh nào</p>
          ) : (
            <table border="1" style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px' }}>Họ tên</th>
                  <th style={{ padding: '10px' }}>Tuổi</th>
                  <th style={{ padding: '10px' }}>Lớp</th>
                  <th style={{ padding: '10px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((student) => (
              <tr key={student._id}>
                <td style={{ padding: '10px' }}>{student.name}</td>
                <td style={{ padding: '10px' }}>{student.age}</td>
                <td style={{ padding: '10px' }}>{student.class}</td>
                <td style={{ padding: '10px' }}>
                  <button 
                    onClick={() => navigate(`/edit/${student._id}`)}
                    style={{ padding: '5px 15px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px', marginRight: '5px' }}
                  >
                    Sửa
                  </button>
                  <button 
                    onClick={() => handleDelete(student._id)}
                    style={{ padding: '5px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
                ))}
              </tbody>
            </table>
          );
        })()
      )}
    </div>
  );
}

export default HomePage;

