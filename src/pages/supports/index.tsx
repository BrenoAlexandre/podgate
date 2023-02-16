import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import { Card } from '../../components/card';
import { EStatus } from '../../interfaces/EStatus';
import { IFeed } from '../../interfaces/IFeeds';
import { SupportsService } from '../../services/server/supports/supports.service';

import style from './style.module.scss';

const Supports: React.FC = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<IFeed[]>([]);
  const [activeFeeds, setActiveFeeds] = useState([]);
  const [pendingFeeds, setPendingFeeds] = useState([]);
  const [revokedFeeds, setRevokedFeeds] = useState([]);

  const { category = '' } = useParams();

  const fetchSupports = async () => {
    const feedsData = await SupportsService.getUserSupports();
    setFeeds(feedsData[0].supports);

    const activeFeeds = feedsData[0].supports.filter((f: any) => {
      let active = feedsData[0].feeds.filter((f: any) => f.status === EStatus.APPROVED);
      let activeIds = active.map((pf: any) => pf.feedId);
      if (activeIds.includes(f._id)) return f;
    });
    setActiveFeeds(activeFeeds);

    const pendingFeeds = feedsData[0].supports.filter((f: any) => {
      const pending = feedsData[0].feeds.filter((f: any) => f.status === EStatus.PENDING);
      let pendingIds = pending.map((pf: any) => pf.feedId);
      if (pendingIds.includes(f._id)) return f;
    });
    setPendingFeeds(pendingFeeds);

    const revokedFeeds = feedsData[0].supports.filter((f: any) => {
      const revoked = feedsData[0].feeds.filter((f: any) => f.status === EStatus.REVOKED);
      let revokedIds = revoked.map((pf: any) => pf.feedId);
      if (revokedIds.includes(f._id)) return f;
    });
    setRevokedFeeds(revokedFeeds);
  };

  useEffect(() => {
    fetchSupports();
  }, [category]);

  return (
    <div className={style.main}>
      <h3 className={style.title}>
        <p onClick={() => navigate('/')}>
          <FaArrowLeft />
          My Supports
        </p>
      </h3>
      <div className={style.body}>
        {activeFeeds.map((feed, index) => (
          <React.Fragment key={index}>
            <Card feed={feed} />
          </React.Fragment>
        ))}
        {/* {pendingFeeds.map((feed, index) => (
          <React.Fragment key={index}>
            <Card feed={feed} />
          </React.Fragment>
        ))} */}
        {/* {revokedFeeds.map((feed, index) => (
          <React.Fragment key={index}>
            <Card feed={feed} />
          </React.Fragment>
        ))} */}
      </div>
    </div>
  );
};

export default Supports;
