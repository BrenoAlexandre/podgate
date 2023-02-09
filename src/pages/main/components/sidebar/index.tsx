import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Stack } from '@mui/material';
import SubmitFeedModal from '../../../../components/submit_feed_modal';
import { useAuth } from '../../../../contexts/AuthContext';
import style from './style.module.scss';

const Sidebar = (): React.ReactElement => {
  const { user, Logout } = useAuth();
  const navigate = useNavigate();

  const [isNewFeedOpen, setIsNewFeedOpen] = useState<boolean>(false);
  const openNewFeedModal = () => setIsNewFeedOpen(true);
  const closeNewFeedModal = () => setIsNewFeedOpen(false);

  const profileOp = () => {
    if (user.name) {
      Logout();
      navigate('/');
    } else navigate('/login');
  };

  const menus = [
    { id: 'Início', title: 'Home', gap: true, cb: () => navigate('/') },
    { id: 'Minhas inscrições', title: 'Subscriptions', cb: () => navigate('/subscriptions') },
    { id: 'Meus apoios', title: 'Supports', cb: () => navigate('/supports') },
    { id: 'Meus programas', title: 'My shows', gap: true, cb: () => navigate('caster') },
    { id: 'Submit Feed', title: 'Submit RSS Feed', gap: true, cb: () => openNewFeedModal() },
    { id: 'Operações de perfil', title: user?.name ? 'Logout' : 'Login', cb: () => profileOp() },
  ];

  return (
    <Paper elevation={15} className={style.sidebar}>
      {menus.map((menu, index) => (
        <React.Fragment key={index}>
          <Stack className={style.buttons} justifyContent={'center'} alignItems={'center'}>
            <Button variant={'contained'} onClick={menu.cb} fullWidth>
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
