import React from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import styled from 'styled-components';

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
  feedTitle: string;
}

const SupportRequestModal: React.FC<ModalProps> = ({ isOpen, onClose, feedTitle }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={boxStyle}>
        <p style={{ color: '#fff' }}>Are you a active supporter of a campaign of {feedTitle}.</p>
        <br />
        <p style={{ color: '#fff' }}>
          Submit a recent receipt to receive access to it's private content!
        </p>
        <br /> <br />
        <CustomTextField
          id='standard-receipt-link'
          label='Receipt Link'
          helperText='Example: docs.google.com/document/d/1xADaoAZorOtNA'
          variant='outlined'
          size='small'
          InputLabelProps={{
            style: { color: '#e8e6e3' },
          }}
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
