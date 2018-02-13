import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {config} from '../config';
import * as $ from 'jquery';
import {Subscription} from 'rxjs/Subscription';
import {ResizeService} from '../_services/resize';
import {TranslatorService} from '../_services/translator.service';

@Component({
    selector: 'app-wallet',
    moduleId: module.id,
    templateUrl: './wallet.component.html'
})
export class WalletComponent implements OnInit, OnDestroy, AfterViewInit {
    currencies: any;
    selectedCurrency: any;
    resize: Subscription;
    open: Boolean;
    constructor (private rs: ResizeService,
                public trans: TranslatorService) {
        this.currencies = config().currencies;
        this.selectedCurrency = {
            currency: '',
            network: ''
        };
        this.open = false;
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
    openWallet (event) {
        // $(event.target).fadeOut();
        this.open = !this.open;
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
}
