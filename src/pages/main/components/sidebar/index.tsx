import React, { useState } from 'react';
import { Button, Paper, Stack } from '@mui/material';
import SubmitFeedModal from '../../../../components/submit_feed_modal';
import style from './style.module.scss';

const Sidebar = (): React.ReactElement => {
  const [selected, setSelected] = useState('');

  const [isNewFeedOpen, setIsNewFeedOpen] = useState<boolean>(false);

  const openNewFeedModal = () => setIsNewFeedOpen(true);
  const closeNewFeedModal = () => setIsNewFeedOpen(false);

  const menus = [
    { id: 'Início', title: 'Home', link: '/', gap: true, cb: () => {} },
    { id: 'Minhas inscrições', title: 'Subscriptions', link: '', hasDropdown: true, cb: () => {} },
    { id: 'Meus apoios', title: 'Supports', link: '', cb: () => {} },
    { id: 'Meus programas', title: 'My shows', link: '', gap: true, cb: () => {} },
    {
      id: 'Submit Feed',
      title: 'Submit RSS Feed',
      link: '',
      gap: true,
      cb: () => {
        openNewFeedModal();
      },
    },
    { id: 'Meu perfil', title: 'Profile', link: '/profile', cb: () => {} },
  ];

  return (
    <Paper elevation={15} className={style.sidebar}>
      {menus.map((menu, index) => (
        <React.Fragment key={index}>
          <Stack className={style.buttons} justifyContent={'center'} alignItems={'center'}>
            <Button
              variant={selected === menu.id ? 'outlined' : 'contained'}
              href={menu.link}
              onClick={menu.cb}
              fullWidth
            >
              {menu.title}
            </Button>
          </Stack>
          {!!menu.gap && <div className={style.spacer} />}
        </React.Fragment>
      ))}
      <SubmitFeedModal isOpen={isNewFeedOpen} onClose={closeNewFeedModal} />
    </Paper>
  );
};

export default Sidebar;
