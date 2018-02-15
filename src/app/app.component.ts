import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TranslatorService} from './_services/translator.service';
import * as $ from 'jquery';
import {ResizeService} from './_services/resize';
import {Subscription} from "rxjs/Subscription";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    load: Subscription;
    constructor (
        public trans: TranslatorService,
        public rs: ResizeService
    ) {}
    ngOnInit () {
        this.load = this.rs.onLoad$.subscribe(data => this.setElementsStyles());
        this.trans.set('RU');
    }
    ngOnDestroy () {
        if (this.load) {
            this.load.unsubscribe();
        }
    }
    setElementsStyles () {
        const buttons = document.getElementsByClassName('mc-btn-trans-bottom');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].appendChild(document.createElement('div'));
            $(buttons[i]).hover((e) => {
                const t: any = e;
                $(t.target.children[0]).animate({top: '-100%'}, 900);
            }, (e) => {
                const t: any = e;
                $(t.target.children[0]).css({top: '100%'});
            });
        }
    }
}
