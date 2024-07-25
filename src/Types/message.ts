import { User } from "./Auth";
import { CustomizablePlan } from "./Product";

export interface Message {
    senderId: string;
    receiverId: string;
    message: string;
    timestamp?: Date;
}

export interface Conversation {
    id: string;
    talker: User;
    unread: number;
    messages: Message[];
    orderDetails: {
        orderNumber: string;
        saler: User;
        buyer: User;
        diyPlan: {
            plan: CustomizablePlan;
            options: {
                question: string;
                answer: string;
                status: 'pending' | 'Approve' | 'Reject';
            }[];
            price: number;
            shipping: number;
            tax: number;
        }
        expectedDeliveryDate: Date;
        paymentStatus?: {
            time: Date;
            status: 'pending' | 'success' | 'fail';
            method: string;
            receipt: string;
        }
    }
}

export interface SocketEvent {
    connect: () => void;
    disconnect: () => void;
    receiveMessage: (message: Message) => void;
}