import React from 'react';
import style from './style.module.scss';
import Sidebar from './components/sidebar';
import SearchBar from './components/search_bar';
import BottomPlayer from './components/bottom_player';

const Main = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  return (
    <div className={style.main}>
      <Sidebar />
      <header className={style.header}>
        <SearchBar />
      </header>
      <div className={style.body}>{children}</div>
      <div className={style.bottomPlayer}>
        <BottomPlayer />
      </div>
    </div>
  );
};

export default Main;
