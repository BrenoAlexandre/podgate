import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Stack } from '@mui/material';
import SubmitFeedModal from '../../../../components/submit_feed_modal';
import { useAuth } from '../../../../contexts/AuthContext';
import style from './style.module.scss';
import Logo from '../../../../assets/icons/Logo';

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

  const handleReviewFeedClaims = () => {};
  const handleReviewSupportClaims = () => {};

  const menus = [
    { id: 'Início', title: 'Home', gap: true, cb: () => navigate('/') },
    {
      id: 'Minhas inscrições',
      title: 'Subscriptions',
      cb: () => navigate('/subscriptions'),
      private: true,
    },
    { id: 'Meus apoios', title: 'Supports', cb: () => navigate('/supports'), private: true },
    {
      id: 'Meus programas',
      title: 'My shows',
      gap: true,
      cb: () => navigate('caster'),
      private: true,
    },
    { id: 'Submit Feed', title: 'Submit RSS Feed', gap: true, cb: openNewFeedModal },
    { id: 'Operações de perfil', title: user?.name ? 'Logout' : 'Login', gap: true, cb: profileOp },
  ];

  return (
    <Paper elevation={15} className={style.sidebar}>
      <div style={{ color: '#fff' }}>
        <Logo />
      </div>
      {menus.map((menu, index) => (
        <React.Fragment key={index}>
          {(menu.id === 'Meus programas' && user.casterId) || menu.id !== 'Meus Programas' ? (
            <Stack className={style.buttons} justifyContent={'center'} alignItems={'center'}>
              <Button variant={'contained'} onClick={menu.cb} fullWidth>
                {menu.title}
              </Button>
            </Stack>
          ) : null}
          {!!menu.gap && <div className={style.spacer} />}
        </React.Fragment>
      ))}
      <div className={style.spacer} />

      {user.email === 'admin@admin.com' ? (
        <Stack className={style.buttons} justifyContent={'center'} alignItems={'center'}>
          <Button variant={'contained'} onClick={handleReviewFeedClaims} fullWidth>
            Review Feed Claims
          </Button>
        </Stack>
      ) : null}
      {user.casterId ? (
        <Stack className={style.buttons} justifyContent={'center'} alignItems={'center'}>
          <Button variant={'contained'} onClick={handleReviewSupportClaims} fullWidth>
            Review Support Claims
          </Button>
        </Stack>
      ) : null}
      <SubmitFeedModal isOpen={isNewFeedOpen} onClose={closeNewFeedModal} />
    </Paper>
  );
};

export default Sidebar;
