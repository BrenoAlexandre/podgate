import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import style from './style.module.scss';

const SearchBar = (): React.ReactElement => {
  return (
    <div id='searchBar' className={style.searchBar}>
      <input
        id='searchBar__input'
        className={style.searchBar__input}
        type='text'
        placeholder='Encontre aqui o seu podcast favorito!'
      />
      <button
        id='searchBar__button'
        className={style.searchBar__button}
        type='button'
        onClick={() => console.log(90)}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
