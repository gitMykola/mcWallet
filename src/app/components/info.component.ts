import {Component, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {Subscription} from 'rxjs/Subscription';
import {InfoMonitor} from '../_services/info.monitor';

@Component({
    selector: 'app-info',
    template: `
        <div id="info">
            <div class="content scroll-hide">
                <span class="last">test span</span>
            </div>
        </div>
    `,
    styles: [`
        #info {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 3px 80px;
            border-radius: 3px;
            background: transparent;
        }

        #info div {
            margin: 0;
            padding: 0;
            font-size: 25px;
            background: transparent;
        }

        #info .content {
            min-height: 15px;
            min-width: 90%;
            background: transparent;
        }
        #info .content .last {
            opacity: 0;
            min-height: 15px;
            background: rgba(0,0,0,0.8);
            border-radius: 3px;
            min-width: 90%;
        }
        @media screen and (max-width: 580px) {
            #info {
                padding: 2px;
            }
        }
    `]
})
export class InfoComponent implements OnInit, OnDestroy {
    private _info: Subscription;
    constructor (
        private im: InfoMonitor
    ) {
    }
    ngOnInit () {
        this._info = this.im.onInfo$.subscribe(data => this.setInfo(data));
    }
    ngOnDestroy () {
        if (this._info) {
            this.im.onInfo$.unsubscribe();
        }
    }
    setInfo (data) {
        const msgDom = document.createElement('div'),
            content = document.querySelector('#info .content'),
            last = content.querySelector('.last'),
            msg = content.querySelectorAll('DIV');
        const cat = data.category === 2 ? ' error' : data.category ? ' warning' : ' message';
        msgDom.innerText = last.innerHTML = data.message;
        msgDom.className = cat + ' ziro-height';
        content.appendChild(msgDom);
        const col = data.category === 2 ? 'rgb(225,0,0)'
            : data.category ? 'rgb(100,100,0)' : 'rgb(255,205,0)';
        $(last).css({
            opacity: 1,
            color: col,
            background: 'rgba(0,0,0,0.8)',
            minWidth: '90%'
        }).animate({opacity: 1}, 100);
        setTimeout(() => $(last).animate({
            opacity: 0
        }, 500), 5000);
    }
    showContent () {
        $('#info .content .ziro-height').slideToggle();
    }
}
