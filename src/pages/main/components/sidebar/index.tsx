import React from 'react';
import { Button } from '../../../../components/button';
import style from './style.module.scss';

const Sidebar = (): React.ReactElement => {
  const menus = [
    { title: 'Início', link: '/', gap: true },
    { title: 'Inscrições', link: '/subscriptions' },
    { title: 'Episódios favoritos', link: '/favorites' },
    { title: 'Apoios', link: '/supports' },
    { title: 'Histórico', link: '/history', gap: true },
    { title: 'Meus programas', link: '/myShows' },
    { title: 'Episódios exclusivos', link: '/exclusives', gap: true },
    { title: 'Meu perfil', link: '/profile' },
    { title: 'Configurações', link: '/settings' },
  ];

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_buttons}>
        {menus.map((menu, index) => (
          <Button key={index * Math.random()} link={menu.link} title={menu.title} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

// <React.Fragment key={index * Math.random()}>
// {menu.gap ? <hr className={style.button_spacer} /> : null}
// </React.Fragment>
