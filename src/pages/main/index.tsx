import React from 'react';
import style from './style.module.scss';
import Sidebar from './components/sidebar';
import BottomPlayer from './components/bottom_player';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

interface IProps {
  children: React.ReactNode;
}

const Main: React.FC<IProps> = ({ children }) => {
  return (
    <Router>
      <AuthProvider>
        <div className={style.main}>
          <Sidebar />
          <div className={style.body}>{children}</div>
          <div className={style.bottomPlayer}>
            <BottomPlayer />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default Main;
