import {Component, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {ResizeService} from '../_services/resize';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-go-top',
    template: `
        <div id="go-to-top">
            <span class="fa" (click)="goTop()">Up</span>
        </div>
    `,
    styles: [`
        #go-to-top {
        display: none;
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
export class GoToTopComponent implements OnInit, OnDestroy {
    resize: Subscription;
    constructor (
        private rs: ResizeService
    ) {
    }
    ngOnInit () {
        this.resize = this.rs.onScroll$.subscribe(data => this.setDom(data));
    }
    ngOnDestroy () {
        if (this.resize) {
            this.rs.onScroll$.unsubscribe();
        }
    }
    goTop () {
        $('html').animate({
            scrollTop: 0
        }, 500);
    }
    setDom (data) {
        if (data.scrollY < data.height * 0.3) {
            $('#go-to-top').fadeOut(500);
        } else {
            $('#go-to-top').fadeIn(500);
        }
    }
}
