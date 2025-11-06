// buoc 1: import React
import React from 'react';

// buoc 4: component ResultTable - hien thi, loc, sua, xoa nguoi dung
function ResultTable({ keyword, user, onAdded }) {
  // state de luu danh sach nguoi dung
  const [users, setUsers] = React.useState([]);
  // buoc 6: state de luu nguoi dung dang sua
  const [editing, setEditing] = React.useState(null);

  // buoc 4: tai du lieu 1 lan khi component mount
  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => { setUsers(data); });
  }, []);

  // buoc 4: loc danh sach theo keyword
  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(keyword.toLowerCase()) || 
    u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  // buoc 5: khi prop user thay doi -> them vao danh sach trong ResultTable
  React.useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // buoc 6: sao chep du lieu user sang state editing (deep copy)
  function editUser(user) {
    setEditing({ ...user, address: { ...user.address } });
  }

  // buoc 6: xu ly thay doi khi sua
  const handleEditChange = (field, value) => {
    if (["street", "suite", "city"].includes(field)) {
      setEditing({ ...editing, address: { ...editing.address, [field]: value } });
    } else {
      setEditing({ ...editing, [field]: value });
    }
  };

  // buoc 6: luu sau khi chinh sua
  function saveUser() {
    setUsers(prev => prev.map(u => u.id === editing.id ? editing : u));
    setEditing(null);
  }

  // buoc 7: xoa nguoi dung
  function removeUser(id) {
    // giu lai tat ca nguoi dung co id khac voi id can xoa
    setUsers((prev) => prev.filter((u) => u.id != id));
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ho ten</th>
            <th>Ten dang nhap</th>
            <th>Email</th>
            <th>Thanh pho</th>
            <th>Thao tac</th>
          </tr>
        </thead>
        <tbody>
          {/* buoc 4: hien thi du lieu bang map */}
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.address.city}</td>
              <td>
                <button onClick={() => editUser(u)}>Sua</button>
                <button className="btn-delete" onClick={() => removeUser(u.id)}>Xoa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* buoc 6: form sua nguoi dung */}
      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Sua nguoi dung</h4>
            <label htmlFor="edit-name"> Ho ten: </label>
            <input id="edit-name" type="text" value={editing.name} onChange={(e) => handleEditChange("name", e.target.value)} />
            <br />
            <label htmlFor="edit-username"> Ten dang nhap: </label>
            <input id="edit-username" type="text" value={editing.username} onChange={(e) => handleEditChange("username", e.target.value)} />
            <br />
            <label htmlFor="edit-email"> Email: </label>
            <input id="edit-email" type="text" value={editing.email} onChange={(e) => handleEditChange("email", e.target.value)} />
            <br />
            <label htmlFor="edit-street"> Duong: </label>
            <input id="edit-street" type="text" value={editing.address.street} onChange={(e) => handleEditChange("street", e.target.value)} />
            <br />
            <label htmlFor="edit-suite"> Phuong: </label>
            <input id="edit-suite" type="text" value={editing.address.suite} onChange={(e) => handleEditChange("suite", e.target.value)} />
            <br />
            <label htmlFor="edit-city"> Thanh pho: </label>
            <input id="edit-city" type="text" value={editing.address.city} onChange={(e) => handleEditChange("city", e.target.value)} />
            <br />
            <label htmlFor="edit-phone"> So dien thoai: </label>
            <input id="edit-phone" type="text" value={editing.phone} onChange={(e) => handleEditChange("phone", e.target.value)} />
            <br />
            <label htmlFor="edit-website"> Website: </label>
            <input id="edit-website" type="text" value={editing.website} onChange={(e) => handleEditChange("website", e.target.value)} />
            <br />
            <button onClick={saveUser}>Luu</button>
            <button onClick={() => setEditing(null)}>Huy</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultTable;

