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
  feedTitle: string;
}

const SupportRequestModal: React.FC<ModalProps> = ({ isOpen, onClose, feedTitle }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={boxStyle}>
        Are you a active supporter of a campaign of {feedTitle}.
        <br /> <br />
        Submit a recent receipt to receive access to it's private content!
        <br /> <br /> <br />
        <TextField
          id='standard-receipt-link'
          label='Receipt Link'
          helperText='Example: docs.google.com/document/d/1xADaoAZorOtNA'
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

export default SupportRequestModal;
