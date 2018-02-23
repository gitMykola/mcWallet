import {AfterViewChecked, AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {config} from '../config';
import * as $ from 'jquery';
import {Subscription} from 'rxjs/Subscription';
import {ResizeService} from '../_services/resize';
import {TranslatorService} from '../_services/translator.service';
import {InfoMonitor} from '../_services/info.monitor';
import {LocalStorageService} from '../_services/localStorage.service';

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
    nopass: boolean;
    restore: boolean;
    start: boolean;
    styles: any;
    step: number;
    startForm: any;
    wallet: Element;
    modal: Element;
    cube: Element;
    nav: Element;
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
        this.open = this.local = this.nopass = this.restore = this.advanced = this.start = false;
        this.styles = {
            mainColor: 'rgb(255,205,0)',
            errorColor: 'rgb(255,0,0)',
            warningColor: 'rgb(255,155,155)'
        };
    }
    ngOnInit () {
        this.resize = this.rs.onResize$.subscribe(data => this.setDom(data));
        this.currencies.forEach(c => c.ammount = 23541236.48978);
        this.wallet = document.querySelector('#mc-wallet');
        this.modal = this.wallet.querySelector('.mc-modal');
        this.startForm = this.wallet.querySelector('#start-form');
        this.cube = this.wallet.querySelector('#cube');
        this.nav = this.wallet.querySelector('#mc-nav-bottom');
    }
    ngOnDestroy() {
        if (this.resize) {
            this.rs.onResize$.unsubscribe();
        }
    }
    ngAfterViewInit () {
        this.setDom({height: window.innerHeight});
        this.setLocal();
    }
    select(curr) {
        this.selectedCurrency.currency = curr;
    }
    setDom(data) {
        $(this.wallet).css('min-height', data.height < 600 ? 600 : data.height);
        this.checkDom();
    }
    checkDom() {
        setTimeout(() => {
            const walletHeight = this.wallet.clientHeight,
                delta = this.startForm.clientHeight + 250 - walletHeight,
                minHeight = window.innerHeight;
            // console.log(walletHeight + '\n' + delta + '\n' + this.modal.clientHeight);
            if (delta > 0) {
                $(this.wallet).animate({height: walletHeight + delta + 50}, 300);
            } else {
                $(this.wallet).animate({height: minHeight > walletHeight + delta ?
                        minHeight : walletHeight + delta + 50}, 300);
            }
            // console.log(walletHeight + '\n' + delta + '\n' + this.modal.clientHeight);
        } , 100);
    }
    openWallet (e) {
        const mcNav = document.querySelector('#mc-nav-bottom button'),
            modal = document.querySelector('#mc-wallet .mc-modal'),
            cube = document.querySelector('#mc-wallet #cube');
        this.toStep(1);
        if (e) {
            $(mcNav).fadeOut();
        } else {
            $(mcNav).fadeIn();
        }
        this.open = e;
        this.onExit.emit(!this.open);
        this.setBackground();
        this.resetStartForm();
        $(modal).fadeOut();
        $(cube).animate({opacity: 1}, 300);
    }
    setBackground () {
        if (this.open) { // TODO check set open backg...
            $(this.wallet).removeClass('background-img-light')
                .addClass('background-img-dark');
        } else {
            $(this.wallet).removeClass('background-img-dark')
                .addClass('background-img-light');
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
        this.checkDom();
    }
    setLocal () {
        const sLocal = this.startForm.querySelectorAll('span[data-name="local"]'),
              noLocal = this.startForm.querySelector('span[data-name="nolocal"]');
        if (this.local) {
            $(sLocal).fadeIn(100);
            $(noLocal).fadeOut(100);
            $(noLocal.querySelectorAll('input')).attr('disabled', true);
        } else {
            $(sLocal).fadeOut(100);
            $(noLocal).fadeIn(100);
            $(noLocal.querySelectorAll('input')).attr('disabled', false);
        }
        setTimeout(() => this.checkDom(), 810);
    }
    selectLocal () {
        this.local = !this.local;
        this.setLocal();
    }
    startProcess() {
        this.checkDom();
        if (!this.step) { this.toStep(1); }
        if (this.step === 1) {
            if (!this.ls.getState()) {
                this.im.add(this.trans.translate('info.no_local_storage'), 2);
                return;
            } else {
                if (this.ls.getCipherState() === 0) {
                    this.local = true;
                    this.ls.set('remote', 'false')
                        .then(() => {
                            this.openWallet(true);
                            return;
                        })
                        .catch(e => {this.im.add(this.trans
                            .translate('err.open_error'), 2);
                            this.toStep(2);
                            return;
                        });
                } else if (this.ls.getCipherState() === 1) {
                    this.toStep(3);
                    return;
                } else {
                    this.toStep(2);
                    return;
                }
            }
        }
        if (this.step === 2) {
            if (this.nopass) {
                this.ls.setGuard('')
                    .then(() => {
                        return this.ls.set('remote', 'false');
                    })
                    .then(() => {
                        this.openWallet(true);
                        return;
                    })
                    .catch(e => {
                        this.im.add(this.trans.translate('err.open_error'), 2);
                        this.cancelProcess();
                        return;
                    });
            } else {
                this.formValidate(this.startForm)
                    .then(() => {
                        const pass = this.startForm.querySelector('input[name="passphrase"]').value;
                        return this.ls.setGuard(pass);
                    })
                    .then(() => {
                        return this.ls.set('remote', this.local ? 'false' : 'true');
                    })
                    .then(() => {
                        if (this.local) {
                            this.openWallet(true);
                            return;
                        } else {
                            // TODO send to server user data, receive response and ...
                        }
                    })
                    .catch(e => {
                        const err = e.title ? this.trans.translate('err.wrong_field')
                            + ' ' + e.title : this.trans.translate('err.open_error');
                        this.im.add(err, 2);
                        return;
                    });
            }
        }
        if (this.step === 3) {
            this.formValidate(this.startForm)
                .then(() => {
                    return this.ls
                        .auth(this
                            .startForm
                            .querySelector('input[name="passphrase"]').value);
                })
                .then(() => {
                    return this.ls.get('remote');
                })
                .then(remote => {
                    if (remote === 'false') {
                        this.cancelProcess();
                        this.openWallet(true);
                        return;
                    } else {
                        // TODO send to server...
                        return;
                    }
                })
                .catch(e => {
                    let err = e.title ? this.trans.translate('err.wrong_field')
                        + ' ' + e.title : this.trans.translate('err.open_error');
                    if (e === 13) { err = this.trans
                        .translate('err.wrong_passphrase'); }
                    this.im.add(err, 2);
                    return;
                });
        }
    }
    cancelProcess() {
        this.resetStartForm();
        this.open = this.start = false;
        const form = document.querySelector('#mc-wallet .mc-modal'),
            cube = document.querySelector('#mc-wallet #cube');
        $(form).hide();
        $(cube).animate({opacity: 1}, 300);  // .fadeIn();
        this.setLocal();
    }
    resetStartForm () {
        const formFields: any = document.querySelectorAll('#mc-wallet #start-form input');
        for (let i = 0; i < formFields.length; i++) {
            formFields.item(i).value = null;
            $(formFields.item(i).previousElementSibling).css({color: this.styles.mainColor});
        }
        this.local = this.nopass = this.restore = this.advanced = false;
        const advBlock = document.querySelector('#start-form #advanced-block');
        $(advBlock).hide();
        this.toStep(1);
    }
    showValidateFieldError (target: any, showError: boolean = false) {
        if (!this.validateField(target)) {
            $(target.previousElementSibling).css({color: this.styles.errorColor});
            if (showError) {
                this.im.add(this.trans.translate('err.' + target.name), 2);
            }
        } else {
            $(target.previousElementSibling).css({color: this.styles.mainColor});
        }
    }
    validateField (target) {
        const valid = {
            email: function (value) {
                return (typeof(value) === 'string'
                    && value.match
(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/));
            },
            phone: function (value) {
                return (typeof(value) === 'string'
                    && value.match
(/^\(*\+*[1-9]{0,3}\)*-*[1-9]{0,3}[-. /]*\(*[2-9]\d{2}\)*[-. /]*\d{3}[-. /]*\d{4} *e*x*t*\.* *\d{0,4}$/)
                    && value.length === 13);
            },
            passphrase: function (value) {
                return (typeof(value) === 'string'
                && value.length >= 8
                && value.length < 256);
            },
            cpassphrase: function (value) {
                return (typeof(value) === 'string'
                    && value.length >= 8
                    && value.length < 256);
            }
        };
        return valid[target.name] ? valid[target.name](target.value) : false;
    }
    formValidate (form) {
        return new Promise( (resolve, reject) => {
            const fields = form.getElementsByTagName('input');
            let ps, cps;
            for (let i = 0; i < fields.length; i++) {
                if (!fields.item(i).disabled && !this.validateField(fields.item(i))) {
                    reject(fields.item(i));
                }
                if (fields.item(i).name === 'passphrase') {
                    ps = fields.item(i);
                }
                if (fields.item(i).name === 'cpassphrase') {
                    cps = fields.item(i);
                }
            }
            if (cps && ps.value !== cps.value) {
                reject(cps);
            }
            resolve();
        });
    }
    toStep (step: number) {
        if (step === 1) {
            this.nav.querySelector('button').innerHTML = this.trans.translate('buttons.start');
            this.step = 1;
        }
        if (step === 2) {
            this.showModal();
            this.nav.querySelector('button').innerHTML = this.trans.translate('buttons.create_wallet');
            this.step = 2;
        }
        if (step === 3) {
            this.showModal();
            this.nav.querySelector('button').innerHTML = this.trans.translate('buttons.open');
            this.step = 3;
        }
        this.checkDom();
    }
    showModal () {
        $(this.modal).fadeIn();
        $(this.cube).animate({opacity: 0.1}, 300); // .fadeOut();
    }
}
