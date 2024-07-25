// src/socket.ts

import io, { Socket } from 'socket.io-client';
import { store } from '../Redux/store';
import { setConnected, addMessage } from '../Redux/Features/socketSlice';
import { Message } from '../Types/message';

let socket: Socket | null = null;

export const initSocketConnection = (): Socket | null => {
    socket = io(import.meta.env.VITE_BACKEND_API_URL, {
        auth: {
            token: localStorage.getItem('accessToken'), // 携带token进行连接
        },
    });

    socket.on('connect', () => {
        console.log('WebSocket Connected');
        store.dispatch(setConnected(true));
    });

    socket.on('disconnect', () => {
        console.log('WebSocket Disconnected');
        store.dispatch(setConnected(false));
    });

    socket.on('receiveMessage', (id:string, message: Message) => {
        console.log('Received message:', message);
        store.dispatch(addMessage({id, message}));
    });

    return socket;
};

export const sendMessage = (message: Message): void => {
    if (socket) {
        socket.emit('sendMessage', message);
    }
};

export const joinRoom = (roomId: string): void => {
    if (socket) {
        socket.emit('joinRoom', roomId);
    }
};

export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
    }
};
