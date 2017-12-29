import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly baseAppUrl: string = 'http://localhost:8000/api/';
    lists: any = null;
    list: any = null;
}
