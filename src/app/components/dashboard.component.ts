import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {TranslatorService} from '../_services/translator.service';
import * as $ from 'jquery';
import {ResizeService} from '../_services/resize';

@Component({
    selector: 'app-dash',
    template: `
        <div id="dashboard">
            <ul>
                    <li class="dash-on" title="{{ts.translate('dash.exit')}}"
                    (click)="exit()">
                        <span class="fa">&#xf011;</span>
                        <span>{{ts.translate('dash.exit')}}</span>
                    </li>
                    <li class="dash-on" title="{{ts.translate('dash.settings')}}">
                        <span class="fa">&#xf085;</span>
                        <span>{{ts.translate('dash.settings')}}</span>
                    </li>
                    <li class="dash-on" title="{{ts.translate('dash.popups')}}">
                        <span class="fa">&#xf05a;</span>
                        <span>{{ts.translate('dash.popups')}}</span>
                    </li>
                    <li class="dash-menu" title="{{ts.translate('dash.menu')}}"
                    (click)="showDash()">
                        <span>
                            <span class="fa">&#xf0c9;</span>
                            <span class="fa">&#xf00d;</span>
                        </span>
                        <span>{{ts.translate('dash.menu')}}</span>
                    </li>
            </ul>
            <span></span>
            <div class="dash-scroll" title="{{ts.translate('dash.up')}}"
                (click)="goTop()">
                <span class="fa">&#xf077;</span>
                <span>{{ts.translate('dash.up')}}</span>
            </div>
        </div>
    `,
    styles: [`
        #dashboard {
            display: block;
            position: fixed;
            bottom: 50px;
            right: 0;
        }

        #dashboard ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        #dashboard ul li, #dashboard div {
            display: flex;
            align-items: center;
            margin: 2px 0 2px 2px;
            padding: 2px;
            width: 170px;
            background: linear-gradient(rgba(255, 205, 0, 0.9) 5%,
                rgba(0, 0, 0, 0.8) 40%,rgba(0, 0, 0, 0.8));
            border-top: 1px solid rgb(255, 205, 5);
            border-left: 1px solid rgb(255, 205, 5);
            border-bottom: 1px solid rgb(255, 205, 5);
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            cursor: pointer;
        }
        #dashboard ul li span, #dashboard ul li span span, #dashboard .dash-scroll span {
            font-size: 25px;
            color: rgb(255, 205, 0);
        }
        #dashboard ul .dash-menu {
            position: relative;
            min-height: 50px;
        }
        #dashboard ul li span, #dashboard .dash-scroll span {
            min-width: 50px;
            text-align: center;
            padding: 10px;
        }
        #dashboard ul li span:nth-child(2), #dashboard .dash-scroll span:nth-child(2) {
            font-size: 20px;
        }
        #dashboard ul .dash-menu span:nth-child(1) span {
            display: block;
            position: absolute;
            top: 2px;
            left: 2px;
        }
        #dashboard ul .dash-menu span:nth-child(1) span:nth-child(2) {
            display: none;
        }
        #dashboard > span {
            display: block;
            position: relative;
            min-height: 50px;
            min-width: 50px;
            margin: 2px 0 2px 2px;
            padding: 2px;
        }
        #dashboard .dash-scroll {
            position:absolute;
            bottom: 0;
            right: 0;
            opacity: 0.5;
            display: none;
        }
        @media screen and (max-width: 992px) {
            #dashboard ul li, #dashboard div {
                width: auto;
            }
            #dashboard ul li span:nth-child(2), #dashboard .dash-scroll span:nth-child(2) {
                display: none;
            }
        }
    `]
})
export class DashboardComponent implements OnInit, OnDestroy, OnChanges {
    private resize: Subscription;
    private load: Subscription;
    private scroll: Subscription;
    public dashOn: boolean;
    public menuOn: boolean;
    public info: boolean;
    @Input() open: boolean;
    @Output() onExit = new EventEmitter<boolean>();
    constructor (public ts: TranslatorService,
                 private rs: ResizeService) {}
    ngOnInit () {
        this.resize = this.rs.onResize$.subscribe(data => this.setDashOn(data));
        this.load = this.rs.onLoad$.subscribe(data => this.setDashOn(data));
        this.scroll = this.rs.onScroll$.subscribe(data => this.setScroll(data));
        this.setDash();
    }
    ngOnDestroy () {
        if (this.resize) {
            this.rs.onResize$.unsubscribe();
        }
        if (this.load) {
            this.rs.onLoad$.unsubscribe();
        }
        if (this.scroll) {
            this.rs.onScroll$.unsubscribe();
        }
    }
    ngOnChanges (changes: {[chopen: string]: SimpleChange}) {
        this.setDash();
    }
    setDash () {
        const domDashMenu = document.querySelector('#dashboard ul');
        if (this.open) {
            $(domDashMenu).show();
        } else {
            $(domDashMenu).hide();
        }
        this.setDashOn({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }
    setDashOn (data) {
        const domDashOn = document.querySelectorAll('#dashboard .dash-on'),
            domDashMenu = document.querySelectorAll('#dashboard .dash-menu');
        this.menuOn = false;
        if (data.width < 640) {
            $(domDashOn).hide();
            $(domDashMenu).show();
            this.dashOn = false;
        } else {
            $(domDashOn).show();
            $(domDashMenu).hide();
            this.dashOn = true;
        }
    }
    showDash() {
        this.menuOn = !this.menuOn;
        const domDashOn = document.querySelectorAll('#dashboard .dash-on'),
            dashMenuIcon = document.querySelectorAll('#dashboard .dash-menu span span');
        if (this.menuOn) {
            if (!this.dashOn) {
                $(domDashOn).fadeIn();
                $(dashMenuIcon[1]).fadeIn();
                $(dashMenuIcon[0]).fadeOut();
            }
        } else {
            if (!this.dashOn) {
                $(domDashOn).hide();
                $(dashMenuIcon[0]).fadeIn();
                $(dashMenuIcon[1]).fadeOut();
            }
        }
    }
    goTop () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    }
    setScroll (data) {
        const dashScroll = document.querySelector('#dashboard .dash-scroll');
        if (data.scrollY < data.height * 0.3) {
            $(dashScroll).fadeOut();
        } else {
            $(dashScroll).fadeIn();
        }
    }
    exit () {
        this.showDash();
        this.dashOn = false;
        this.onExit.emit(false);
    }
}
