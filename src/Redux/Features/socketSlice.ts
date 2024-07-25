// src/features/socketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//type
import { Message } from '../../Types/message';
import { Conversation } from '../../Types/message';

interface SocketState {
    isConnected: boolean;
    conversations: Conversation[];
}

const initialState: SocketState = {
    isConnected: false,
    conversations: [],
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        //add message requires conversation id and message
        addMessage: (state, action: PayloadAction<{ id: string; message: Message }>) => {
            const { id, message } = action.payload;
            const conversation = state.conversations.find(conversation => conversation.id === id);
            if (conversation) {
                conversation.messages.push(message);
            } else {
                //TODO: 还没想好怎么解决这个问题
            }
        },
    },
});

export const { setConnected, addMessage } = socketSlice.actions;
export default socketSlice.reducer;
