// buoc 1: import React
import React from 'react';

// buoc 5: component AddUser - form them nguoi dung moi
function AddUser({ onAdd }) {
  // state de dieu khien hien thi form
  const [adding, setAdding] = React.useState(false);
  
  // state de luu du lieu form
  const [user, setUser] = React.useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: ""
  });

  // xu ly thay doi input
  const handleChange = (e) => {
    const { id, value } = e.target;
    // neu la truong address (street, suite, city) thi phai dung spread operator
    if (["street", "suite", "city"].includes(id)) {
      setUser({ ...user, address: { ...user.address, [id]: value } });
    } else {
      setUser({ ...user, [id]: value });
    }
  };

  // xu ly them nguoi dung
  const handleAdd = () => {
    // kiem tra name va username khong duoc rong
    if (user.name === "" || user.username === "") {
      alert("Vui long nhap Ho ten va Ten dang nhap!");
      return;
    }
    // goi ham onAdd de truyen du lieu len App
    onAdd(user);
    // reset form ve trang thai ban dau
    setUser({ name: "", username: "", email: "", address: { street: "", suite: "", city: "" }, phone: "", website: "" });
    setAdding(false);
  };

  return (
    <div>
      <button onClick={() => setAdding(true)}>Them</button>
      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Them nguoi dung</h4>
            <label htmlFor="name"> Ho ten: </label>
            <input id="name" type="text" value={user.name} onChange={handleChange} />
            <br />
            <label htmlFor="username"> Ten dang nhap: </label>
            <input id="username" type="text" value={user.username} onChange={handleChange} />
            <br />
            <label htmlFor="email"> Email: </label>
            <input id="email" type="text" value={user.email} onChange={handleChange} />
            <br />
            <label htmlFor="street"> Duong: </label>
            <input id="street" type="text" value={user.address.street} onChange={handleChange} />
            <br />
            <label htmlFor="suite"> Phuong: </label>
            <input id="suite" type="text" value={user.address.suite} onChange={handleChange} />
            <br />
            <label htmlFor="city"> Thanh pho: </label>
            <input id="city" type="text" value={user.address.city} onChange={handleChange} />
            <br />
            <label htmlFor="phone"> So dien thoai: </label>
            <input id="phone" type="text" value={user.phone} onChange={handleChange} />
            <br />
            <label htmlFor="website"> Website: </label>
            <input id="website" type="text" value={user.website} onChange={handleChange} />
            <br />
            <button onClick={handleAdd}>Luu</button>
            <button onClick={() => setAdding(false)}>Huy</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddUser;

