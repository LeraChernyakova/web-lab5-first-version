import React from 'react';
import { Typography, TextField, Button, Box, Modal } from '@mui/material';

const AddBrokerModal = ({isModalOpen, closeModal, newBrokerData, isFormSubmitted, setNewBrokerData, addBroker,}) => {
    return (
        <Modal open={isModalOpen} onClose={closeModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    p: 4,
                }}
            >
                <Typography variant="h6" component="div" gutterBottom>
                    Add New Broker
                </Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={newBrokerData.name}
                    onChange={(e) => {
                        setNewBrokerData({ ...newBrokerData, name: e.target.value });
                    }}
                    required
                    error={isFormSubmitted && !newBrokerData.name}
                    helperText={isFormSubmitted && !newBrokerData.name && 'Name is required'}
                />
                <TextField
                    label="Start Capital"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="number"
                    value={newBrokerData.balance}
                    onChange={(e) => {
                        setNewBrokerData({ ...newBrokerData, balance: e.target.value });
                    }}
                    required
                    error={isFormSubmitted && !newBrokerData.balance}
                    helperText={isFormSubmitted && !newBrokerData.balance && 'Start Capital is required'}
                />
                <Button variant="contained" color="primary" onClick={addBroker}>
                    Add Broker
                </Button>
            </Box>
        </Modal>
    );
};

export default AddBrokerModal;
