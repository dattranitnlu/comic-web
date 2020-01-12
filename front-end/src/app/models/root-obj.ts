import { Page } from './page';
export interface RootObj<T> {
    errorCode: number;
    data: T;
    message: string;
    pageInfo: Page;
}
