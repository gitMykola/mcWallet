import {
    Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit, OnChanges,
    SimpleChange
} from '@angular/core';
import * as $ from 'jquery';
import {ResizeService} from '../../_services/resize';
import {Subscription} from 'rxjs/Subscription';
import {TranslatorService} from '../../_services/translator.service';
import {
    animate, animateChild, group, query, stagger, state, style, transition,
    trigger
} from '@angular/animations';

@Component({
    selector: 'app-start-text',
    templateUrl: './starttext.component.html',
    styleUrls: ['./starttext.css']
})
export class StartTextComponent implements OnInit, OnDestroy, OnChanges {
    resize: Subscription;
    @Input() open: boolean;
    constructor (
        private rs: ResizeService,
        public trans: TranslatorService) {
    }
    ngOnInit () {
        this.resize = this.rs.onResize$.subscribe(data => this.setText(data));
    }
    ngOnDestroy() {
        if (this.resize) {
            this.rs.onResize$.unsubscribe();
        }
    }
    ngOnChanges (changes: {[chopen: string]: SimpleChange}) {
        this.setText(changes.open.currentValue);
    }
    setText (s) {
    }
}
