import {Component} from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-go-top',
    template: `
        <div id="go-to-top">
            <span class="fa" (click)="goTop()">Up</span>
        </div>
    `,
    styles: [`
        #go-to-top {
        display: block;
        position: fixed;
        bottom: 30px;
        right: 30px;
        }
        #go-to-top span {
            font-family: mcFontLight;
            padding: 5px;
            font-size: 20px;
            background: rgba(0,0,0,0.7);
            border: 1px solid rgb(255,205,0);
            border-radius: 50%;
            color: rgb(255,205,0);
            cursor: pointer;
        }
    `]
})
export class GoToTopComponent {
    constructor () {
    }
    goTop () {
        $('html').animate({
            scrollTop: 0
        }, 500);
    }
}
