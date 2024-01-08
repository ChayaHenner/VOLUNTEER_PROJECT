// alertUtil.js
import React, { useState, useEffect, useCallback } from 'react';
import Alert from './alert'; // Make sure to adjust the import path

export const useAutoAlert = () => {
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const showAlert = (message) => {
        setAlertMessage(message);
        setIsAlertVisible(true);

        // Automatically close the alert after 5 seconds
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 5000);
    };
    const onClose = useCallback(() => {
        setIsAlertVisible(false);
    }, []);

    const AutoAlert = () => (
        <div>
            {isAlertVisible && <Alert text={alertMessage} onClose={onClose} />}
        </div>
    );

    return { showAlert, AutoAlert };
};
