// buoc 1: import React
import React from 'react';
import SearchForm from './components/SearchForm';
import AddUser from './components/AddUser';
import ResultTable from './components/ResultTable';
import './App.css';

// buoc 1: component goc App
// buoc 2: App quan ly toan bo state va truyen props xuong con
function App() {
  // buoc 2: state cho tu khoa tim kiem
  const [kw, setKeyword] = React.useState("");
  // buoc 2: state cho nguoi dung moi
  const [newUser, setNewUser] = React.useState(null);

  return (
    <div className="App">
      <h1>Quan ly nguoi dung</h1>
      {/* buoc 2: SearchForm nhan ham onChangeValue (tuc la setKeyword tu App) */}
      <SearchForm onChangeValue={setKeyword} />
      {/* buoc 2: AddUser nhan ham onAdd (tuc la setNewUser tu App) */}
      <AddUser onAdd={setNewUser} />
      {/* buoc 2: ResultTable nhan keyword, user va callback onAdded */}
      <ResultTable
        keyword={kw}
        user={newUser}
        onAdded={() => setNewUser(null)}
      />
    </div>
  );
}

export default App;

