import React, { useState } from 'react';
import style from './style.module.scss';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const menus = [
    { title: 'Início', link: '/', gap: true },
    { title: 'Incrições', link: '/subscriptions' },
    { title: 'Episódios favoritos', link: '/favorites' },
    { title: 'Apoios', link: '/supports' },
    { title: 'Histórico', link: '/history', gap: true },
    { title: 'Meus programas', link: '/myShows' },
    { title: 'Episódios exclusivos', link: '/exclusives', gap: true },
    { title: 'Meu perfil', link: '/profile' },
    { title: 'Configurações', link: '/settings' },
  ];

  // const isUser = true;

  return (
    <div className={style.sidebar}>
      <div className={style.sidebar_buttons}>
        {menus.map((menu) => (
          <div>
            <a href={menu.link}>
              <button className={style.button}>{menu.title}</button>
            </a>
            {menu.gap && (
              <>
                <hr className={style.button_spacer} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
