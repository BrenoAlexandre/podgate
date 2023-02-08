import React from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';

const boxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  border: '1px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitFeedModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={boxStyle}>
        Looking for a feed that you didn't find on Podgate?
        <br /> <br />
        Submit it's RSS feed link and you can listen to it whenever You want!
        <br /> <br /> <br />
        <TextField
          id='standard-feed-link'
          label='RSS Link'
          helperText='Example: https://anchor.fm/s/00000000/podcast/rss'
          variant='outlined'
          size='small'
        />
        <br /> <br />
        <Button
          style={{ marginRight: '8px' }}
          variant='contained'
          onClick={() => {
            alert('Submit new feed');
            onClose();
          }}
        >
          Send
        </Button>
        <Button variant='outlined' onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default SubmitFeedModal;
