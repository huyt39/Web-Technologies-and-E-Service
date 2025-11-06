// buoc 1: import React
import React from 'react';

// buoc 3: component SearchForm - nhan input tu nguoi dung de tim kiem
function SearchForm({ onChangeValue }) {
  return (
    <input
      type="text"
      placeholder="Tim theo name, username"
      // khi input thay doi, goi ham callback de cap nhat kw o App
      onChange={(e) => onChangeValue(e.target.value)}
    />
  );
}

export default SearchForm;

