import { EventManager } from '@angular/platform-browser';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ResizeService {

    public onResize$ = new EventEmitter<{ width: number; height: number; }>();
    public onLoad$ = new EventEmitter<{ width: number; height: number; }>();

    constructor(eventManager: EventManager) {
        eventManager.addGlobalEventListener('window', 'resize',
            e => this.onResize$.emit({
                width: e.target.innerWidth,
                height: e.target.innerHeight
            }));
        eventManager.addGlobalEventListener('window', 'load',
            e => this.onLoad$.emit({
                    width: e.currentTarget.innerWidth,
                    height: e.currentTarget.innerHeight
            }));
    }
}
