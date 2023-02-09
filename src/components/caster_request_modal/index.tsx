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
      border-color: #e8e6e3;
    }
  }
  .MuiFormHelperText-root {
    color: #e8e6e3;
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CasterRequestModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={boxStyle}>
        Is this a podcast made by You?
        <br /> <br />
        Submit a claim request and You be able to manage it's private feeds and Your Supporters.
        <br /> <br /> <br />
        <CustomTextField
          id='standard-proof-link'
          label='Proof link'
          helperText='Example: docs.google.com/document/d/1xADaoAZorOtNA'
          variant='outlined'
          size='small'
        />
        <br /> <br />
        <Button
          style={{ marginRight: '8px' }}
          variant='contained'
          onClick={() => {
            alert('Submit caster request');
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

export default CasterRequestModal;
