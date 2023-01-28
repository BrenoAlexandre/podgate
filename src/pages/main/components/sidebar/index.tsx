import React from 'react';
import { SidebarButton as Button } from '../sidebar_button';
import style from './style.module.scss';

const Sidebar = (): React.ReactElement => {
  const menus = [
    { id: 'Início', title: 'Início', link: '/', gap: true },
    { id: 'Minhas inscrições', title: 'Inscrições', link: '', hasDropdown: true },
    { id: 'Meus episódios favoritos', title: 'Episódios favoritos', link: '', hasDropdown: true },
    { id: 'Meus apoios', title: 'Apoios', link: '' },
    { id: 'Meu histórico', title: 'Histórico', link: '', gap: true },
    { id: 'Meus programas', title: 'Meus programas', link: '' },
    { id: 'Episódios exclusivos', title: 'Episódios exclusivos', link: '', gap: true },
    { id: 'Meu perfil', title: 'Meu perfil', link: '/profile' },
    { id: 'Configurações', title: 'Configurações', link: '/settings' },
  ];

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_buttons}>
        {menus.map((menu, index) => (
          <React.Fragment key={index * Math.random()}>
            <Button key={index * Math.random()} {...menu} />
            {!!menu.gap && <hr className={style.spacer} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
