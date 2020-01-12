import { User } from './user';
export interface Payment {
    id: number;
    userid: number;
    coin: number;
    payerEmail: string;
    payValue: string;
    payDate: string;
    payStatus: boolean;
    user: User;
}