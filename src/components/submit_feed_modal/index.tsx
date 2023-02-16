import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Tooltip } from '@mui/material';
import styled from 'styled-components';
import { FeedsService } from '../../services/server/feeds/feeds.service';
import { useAuth } from '../../contexts/AuthContext';

const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#1a1c1d',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const CustomTextField = styled(TextField)`
  & label.MuiOutlinedInput {
    color: #e8e6e3;
  }
  & .MuiOutlinedInput-root {
    &.MuiOutlinedInput-root fieldset {
      color: #e8e6e3;
      border-color: #e8e6e3;
    }
  }
  & .MuiFormLabel-root {
    color: #e8e6e3;
  }
  & .MuiInputBase-input {
    color: #e8e6e3;
  }
  & .MuiFormHelperText-root {
    color: #e8e6e3;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitFeedModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [rssLink, setRssLink] = useState<string>('');
  const { logged } = useAuth();

  const openTooltip = () => setIsTooltipOpen(true);
  const closeTooltip = () => setIsTooltipOpen(false);

  const submitHandler = () => {
    if (rssLink) {
      FeedsService.submitFeed(rssLink);
      setRssLink('');
    }
    closeTooltip();
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={boxStyle}>
        <p style={{ color: '#fff' }}>Looking for a feed that you didn't find on Podgate?</p>
        <br />
        <p style={{ color: '#fff' }}>
          Submit it's RSS feed link and you can listen to it whenever You want!
        </p>
        <br /> <br />
        <CustomTextField
          id='standard-feed-link'
          label='RSS Link'
          helperText='Example: https://anchor.fm/s/00000000/podcast/rss'
          variant='outlined'
          size='small'
          value={rssLink}
          onChange={(e) => {
            setRssLink(e.target.value);
          }}
        />
        <br /> <br />
        <Tooltip
          title='Login to submit feeds'
          arrow
          disableHoverListener
          open={isTooltipOpen}
          onClose={closeTooltip}
        >
          <Button
            style={{ marginRight: '8px' }}
            variant='contained'
            onClick={() => {
              if (logged) submitHandler();
              else openTooltip();
            }}
          >
            Send
          </Button>
        </Tooltip>
        <Button variant='outlined' onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default SubmitFeedModal;
