import { User } from './user';

export interface Story {
    id: number;
    storyname: string;
    description: string;
    copyright: string;
    imgUrl: string;
    typeid: number;
    userid: number;
    user: User;
}

