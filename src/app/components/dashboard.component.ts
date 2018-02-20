import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {TranslatorService} from '../_services/translator.service';
import * as $ from 'jquery';
import {ResizeService} from '../_services/resize';

@Component({
    selector: 'app-dash',
    template: `
        <div id="dashboard">
            <ul>
                <li class="dash-on" title="{{ts.translate('dash.exit')}}">
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
                <li class="dash-scroll" title="{{ts.translate('dash.up')}}"
                (click)="goTop()">
                    <span class="fa">&#xf077;</span>
                    <span>{{ts.translate('dash.up')}}</span>
                </li>
            </ul>
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

        #dashboard ul li {
            display: flex;
            align-items: center;
            margin: 2px 0 2px 2px;
            padding: 2px;
            width: 160px;
            background: linear-gradient(rgba(255, 205, 0, 0.9) 5%,
                rgba(0, 0, 0, 0.8) 40%,rgba(0, 0, 0, 0.8));
            border-top: 1px solid rgb(255, 205, 5);
            border-left: 1px solid rgb(255, 205, 5);
            border-bottom: 1px solid rgb(255, 205, 5);
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            cursor: pointer;
        }
        #dashboard ul li span, #dashboard ul li span span {
            font-size: 25px;
            color: rgb(255, 205, 0);
        }
        #dashboard ul .dash-menu {
            position: relative;
            min-height: 50px;
        }
        #dashboard ul li span {
            min-width: 50px;
            text-align: center;
            padding: 10px;
        }
        #dashboard ul li span:nth-child(2) {
            font-size: 20px;
        }
        #dashboard ul .dash-menu span:nth-child(1) span {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
        }
        #dashboard ul .dash-menu span:nth-child(1) span:nth-child(2) {
            display: none;
        }
        #dashboard ul .dash-scroll {
            opacity: 0.6;
            display: none;
        }
        @media screen and (max-width: 768px) {
            #dashboard ul li {
                width: auto;
            }
            #dashboard ul li span:nth-child(2) {
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
    constructor (public ts: TranslatorService,
                 private rs: ResizeService) {
        this.dashOn = false;
    }
    ngOnInit () {
        this.resize = this.rs.onResize$.subscribe(data => this.setDash(data));
        this.load = this.rs.onLoad$.subscribe(data => this.setDash(data));
        this.scroll = this.rs.onScroll$.subscribe(data => this.setScroll(data));
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
        const domOns = document.querySelectorAll('#dashboard .dash-on'),
            domMenu = document.querySelector('#dashboard .dash-menu');
        if (this.open) {
            $(domMenu).fadeIn();
            if (this.dashOn) {
                $(domOns).fadeIn();
            }
        } else {
            $(domMenu).hide();
            if (!this.dashOn) {
                $(domOns).hide();
                this.menuOn = false;
            }
        }
    }
    setDash (data) {
        const domDashOn = document.querySelectorAll('#dashboard .dash-on');
        this.menuOn = false;
        if (data.width < data.height && data.width < 480) {
            $(domDashOn).hide();
            this.dashOn = false;
        } else {
            $(domDashOn).show();
            this.dashOn = true;
        }
    }
    showDash() {
        const domDashOn = document.querySelectorAll('#dashboard .dash-on'),
            dashMenuIcon = document.querySelectorAll('#dashboard .dash-menu span span'); console.dir(dashMenuIcon);
        if (!this.dashOn && this.menuOn) {
            $(domDashOn).hide();
            $(dashMenuIcon[0]).fadeIn();
            $(dashMenuIcon[1]).fadeOut();
        } else {
            $(domDashOn).fadeIn();
            $(dashMenuIcon[1]).fadeIn();
            $(dashMenuIcon[0]).fadeOut();
        }
        this.menuOn = !this.menuOn;
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
}
