import React, { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { CastersService } from '../../services/server/casters/caster.service';
import { IFeed } from '../../interfaces/IFeeds';
import { EStatus } from '../../interfaces/EStatus';

const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: '#fff',
  bgcolor: '#1a1c1d',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

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
  claimedFeeds: { _id: string; title: string }[];
  createdAt: Date;
  updatedAt: Date;
}

interface ModalProps {
  claims: casterClaims[] | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewClaimModal: React.FC<ModalProps> = ({ isOpen, onClose, claims }) => {
  const answerClaim = async (feedId: string, casterId: string, status: EStatus) => {
    await CastersService.answerRequest(status, casterId.toString(), feedId.toString());
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={boxStyle}>
        {claims?.map((claim: casterClaims, index: any) => {
          return (
            <React.Fragment key={index}>
              {claim?.claimedFeeds.map((cf, i) => {
                const xTitle = cf?.title;
                const xLink = claim.feeds.find((feed) => feed.feedId === cf._id)?.proofUrl;
                return (
                  <React.Fragment key={i}>
                    <div style={{ padding: '8px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <p>{xTitle}</p>
                          <a href={xLink} target='_blank' style={{ color: '#fff' }}>
                            Proof document
                          </a>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Button
                            variant='contained'
                            onClick={() => {
                              answerClaim(cf._id, claim?._id, EStatus.APPROVED);
                            }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant='contained'
                            onClick={() => {
                              answerClaim(cf._id, claim?._id, EStatus.DENIED);
                            }}
                          >
                            Deny
                          </Button>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              <hr />
            </React.Fragment>
          );
        })}
      </Box>
    </Modal>
  );
};

export default ReviewClaimModal;
