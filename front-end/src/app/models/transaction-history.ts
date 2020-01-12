import { User } from './user';
import { StoriesChapter } from './stories-chapter';

export interface TransactionHistory {
    id: number;
    buyerid: number;
    sellerid: number;
    chapid: number;
    chapCoin: number;
    tranDate: Date;
    buyer: User;
    chapter: StoriesChapter;
}

