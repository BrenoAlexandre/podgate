import React from 'react';
import style from './style.module.scss';

const SearchBar = () => {
  return (
    <div className={style.searchbar}>
      <div className={style.input}>
        <input type='text' placeholder='Encontre aqui o seu podcast favorito!' />
        <button>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
