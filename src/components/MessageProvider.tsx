import React, {useContext, useEffect, useState} from 'react';
import {Alert, Snackbar} from "@mui/material";

export const QueueContext = React.createContext<Array<string>>([]);
export const QueueUpdateContext = React.createContext((test: string) => {});

export const useSnackbarMessages = () => {
    return useContext(QueueUpdateContext);
}

export function MessageProvider(props: any) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [messageQueue, setMessageQueue] = useState<Array<string>>([]);
    const [currentMessage, setCurrentMessage] = useState('');

    const addMessage = (newMessage: string): void => {
        console.log('here is the message')
        // setMessages(newMessage);
    }

    const handleClose = () => {

    }

    useEffect(() => {
        if (messageQueue.length > 0 && !snackbarOpen) {
            const [message, ...remaining] = messageQueue;
            setMessageQueue(remaining);
            setCurrentMessage(message);
            setSnackbarOpen(true);
        }
    }, [messageQueue, snackbarOpen]);

    const handleSnackbarClose = (event: any) => {
        setSnackbarOpen(false);
    };

    const showSnackbar = (message: string) => {
        setMessageQueue((prevQueue) => [...prevQueue, message]);
    };

    return (
        <QueueContext.Provider value={messageQueue}>
            <QueueUpdateContext.Provider value={addMessage}>
                {props.children}
                {currentMessage && (
                    <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                        <Alert onClose={handleSnackbarClose} severity="success">
                            {currentMessage}
                        </Alert>
                    </Snackbar>
                )}
            </QueueUpdateContext.Provider>
        </QueueContext.Provider>
    );
}
