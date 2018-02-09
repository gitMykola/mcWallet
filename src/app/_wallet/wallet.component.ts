import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {config} from '../config';
import * as $ from 'jquery';
import {Subscription} from 'rxjs/Subscription';
import {ResizeService} from '../_services/resize';

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
    constructor (private rs: ResizeService) {
        this.currencies = config().currencies;
        this.selectedCurrency = {
            currency: '',
            network: ''
        };
        this.open = false;
    }
    ngOnInit () {
        this.resize = this.rs.onResize$.subscribe(data => this.setDom(data));
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
        $('#mc-wallet').css('height', data.height);
    }
    openWallet (event) {
        $(event.target).fadeOut();
        this.open = true;
    }
}
