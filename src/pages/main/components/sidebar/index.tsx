import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Paper, Stack } from '@mui/material';
import SubmitFeedModal from '../../../../components/submit_feed_modal';
import { useAuth } from '../../../../contexts/AuthContext';
import style from './style.module.scss';
import Logo from '../../../../assets/icons/Logo';
import { CastersService } from '../../../../services/server/casters/caster.service';
import ReviewClaimModal from '../../../../components/review_claims_modal';
import { IFeed } from '../../../../interfaces/IFeeds';
import { EStatus } from '../../../../interfaces/EStatus';
import ReviewSupportModal from '../../../../components/review_supports_modal';
import { ISupport } from '../../../../interfaces/ISupports';
import { SupportsService } from '../../../../services/server/supports/supports.service';

interface casterClaims {
  _id: string;
  userId: string;
  feeds: {
    approvedAt: string;
    feedId: string;
    proofUrl: string;
    status: EStatus;
    _id: string;
  }[];
  claimedFeeds: IFeed[];
  createdAt: Date;
  updatedAt: Date;
}

const Sidebar = (): React.ReactElement => {
  const { user, Logout } = useAuth();
  const navigate = useNavigate();

  const [isNewFeedOpen, setIsNewFeedOpen] = useState<boolean>(false);
  const openNewFeedModal = () => setIsNewFeedOpen(true);
  const closeNewFeedModal = () => setIsNewFeedOpen(false);

  const [feedClaims, setFeedClaims] = useState<casterClaims[] | undefined>(undefined);

  const [isReviewClaimOpen, setIsReviewClaimOpen] = useState<boolean>(false);
  const openReviewClaimModal = () => setIsReviewClaimOpen(true);
  const closeReviewClaimModal = () => setIsReviewClaimOpen(false);

  const handleReviewFeedClaims = () => {
    openReviewClaimModal();
  };

  const [supportClaims, setSupportClaims] = useState<ISupport[] | undefined>(undefined);

  const [isReviewSupportOpen, setIsReviewSupportOpen] = useState<boolean>(false);
  const openReviewSupportModal = () => setIsReviewSupportOpen(true);
  const closeReviewSupportModal = () => setIsReviewSupportOpen(false);

  const handleReviewSupportClaims = () => {
    openReviewSupportModal();
  };

  const profileOp = () => {
    if (user.name) {
      Logout();
      navigate('/');
    } else navigate('/login');
  };

  const menus = [
    { id: 'Início', title: 'Home', gap: true, cb: () => navigate('/') },
    {
      id: 'Minhas inscrições',
      title: 'Subscriptions',
      cb: () => navigate('/subscriptions'),
      private: true,
    },
    { id: 'Meus apoios', title: 'Supports', cb: () => navigate('/supports'), private: true },
    // {
    //   id: 'Meus programas',
    //   title: 'My shows',
    //   gap: true,
    //   cb: () => navigate('caster'),
    //   private: true,
    // },
    { id: 'Submit Feed', title: 'Submit RSS Feed', gap: true, cb: openNewFeedModal },
    { id: 'Operações de perfil', title: user?.name ? 'Logout' : 'Login', gap: true, cb: profileOp },
  ];

  const fetchClaims = useCallback(async () => {
    if (user.email === 'admin@admin.com') {
      const claims = await CastersService.fetchRequests();
      setFeedClaims(claims);
    }
  }, [user]);

  const fetchSupports = useCallback(async () => {
    if (!!user.casterId) {
      // const supports = await SupportsService.fetchRequests('');
      // setSupportClaims(supports);
    }
  }, [user]);

  useEffect(() => {
    fetchClaims();
    fetchSupports();
  }, [user]);

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
      <ReviewClaimModal
        isOpen={isReviewClaimOpen}
        onClose={closeReviewClaimModal}
        claims={feedClaims}
      />
      <ReviewSupportModal
        isOpen={isReviewSupportOpen}
        onClose={closeReviewSupportModal}
        supports={supportClaims}
      />
    </Paper>
  );
};

export default Sidebar;
