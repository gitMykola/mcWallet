import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {config} from '../config';
import * as $ from 'jquery';
import {Subscription} from 'rxjs/Subscription';
import {ResizeService} from '../_services/resize';
import {TranslatorService} from '../_services/translator.service';
import {InfoMonitor} from '../_services/info.monitor';
import {LocalStorageService} from "../_services/localStorage.service";

@Component({
    selector: 'app-wallet',
    moduleId: module.id,
    templateUrl: './wallet.component.html'
})
export class WalletComponent implements OnInit, OnDestroy, AfterViewInit {
    currencies: any;
    selectedCurrency: any;
    resize: Subscription;
    open: boolean;
    advanced: boolean;
    local: boolean;
    restore: boolean;
    start: boolean;
    @Output() onExit = new EventEmitter<boolean>();
    constructor (private rs: ResizeService,
                 public trans: TranslatorService,
                 public im: InfoMonitor,
                 private ls: LocalStorageService) {
        this.currencies = config().currencies;
        this.selectedCurrency = {
            currency: '',
            network: ''
        };
        this.open = this.local = this.restore = this.advanced = this.start = false;
    }
    ngOnInit () {
        this.resize = this.rs.onResize$.subscribe(data => this.setDom(data));
        this.currencies.forEach(c => c.ammount = 23541236.48978);
    }
    ngOnDestroy() {
        if (this.resize) {
            this.rs.onResize$.unsubscribe();
        }
    }
    ngAfterViewInit () {
        this.setDom({height: window.innerHeight});
    }
    select(curr) {
        this.selectedCurrency.currency = curr;
    }
    setDom(data) {
        $('#mc-wallet').css('min-height', data.height);
    }
    openWallet (e) {
        const mcNav = document.querySelector('#mc-nav-bottom button');
        if (e) {
            $(mcNav).fadeOut();
        } else {
            $(mcNav).fadeIn();
        }
        this.open = e;
        this.onExit.emit(!this.open);
        this.setBackground();
    }
    setBackground () {
        if (this.open) {
            $('#mc-wallet').css({
                'background': 'linear-gradient(rgba(0,0,0,0.7),' +
                ' rgba(0,0,0,0.9)),' +
                ' url("./assets/images/bitcoin.jpg")',
                'background-size': 'cover',
                'background-attachment': 'fixed'
            });
        } else {
            $('#mc-wallet').css({
                'background': 'linear-gradient(rgba(0,0,0,0.5),' +
                ' rgba(0,0,0,0.9)),' +
                ' url("./assets/images/bitcoin.jpg")',
                'background-size': 'cover',
                'background-attachment': 'fixed'
            });
        }
    }
    setAdvanced() {
        this.advanced = !this.advanced;
        const advBlock = document.querySelector('#start-form #advanced-block');
        if (this.advanced) {
            $(advBlock).fadeIn();
        } else {
            $(advBlock).hide();
        }
    }
    startProcess() {
        if (this.start) {
            // this.openWallet(true);
        } else {
            this.start = true;
            const form = document.querySelector('#mc-wallet .mc-modal'),
                cube = document.querySelector('#mc-wallet #cube');
            $(form).fadeIn();
            $(cube).fadeOut();
        }
    }
    cancelProcess() {
        this.open = this.local = this.restore = this.advanced = this.start = false;
        const form = document.querySelector('#mc-wallet .mc-modal'),
            cube = document.querySelector('#mc-wallet #cube');
        $(form).fadeOut();
        $(cube).fadeIn();
    }
}
