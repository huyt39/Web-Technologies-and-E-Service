import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5001/api/students/${id}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/students/${id}`, {
      name,
      age: Number(age),
      class: stuClass
    })
      .then(res => {
        console.log("Đã cập nhật:", res.data);
        navigate("/");
      })
      .catch(err => console.error("Lỗi khi cập nhật:", err));
  };

  return (
    <div className="App">
      <h1>Chỉnh sửa thông tin học sinh</h1>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '20px auto', gap: '10px' }}>
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
        <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Cập nhật
        </button>
        <button type="button" onClick={() => navigate("/")} style={{ padding: '10px', fontSize: '16px', backgroundColor: '#757575', color: 'white', border: 'none', cursor: 'pointer' }}>
          Hủy
        </button>
      </form>
    </div>
  );
}

export default EditStudent;

