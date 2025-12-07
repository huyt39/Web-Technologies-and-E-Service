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

      <h2>Danh sách học sinh</h2>
      {students.length === 0 ? (
        <p>Chưa có học sinh nào</p>
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
            {students.map((student) => (
              <tr key={student._id}>
                <td style={{ padding: '10px' }}>{student.name}</td>
                <td style={{ padding: '10px' }}>{student.age}</td>
                <td style={{ padding: '10px' }}>{student.class}</td>
                <td style={{ padding: '10px' }}>
                  <button 
                    onClick={() => navigate(`/edit/${student._id}`)}
                    style={{ padding: '5px 15px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HomePage;

