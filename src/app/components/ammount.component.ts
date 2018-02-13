import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import * as Big from '../../../node_modules/big.js';

@Component({
    selector: 'app-ammount',
    template: '<p>{{ammountString}}</p>'
})
export class AmmountComponent implements OnInit, OnChanges {
    public ammountString: string;
    @Input() ammount: any;
    @Input() resize: boolean;
    @Input() big: number;
    @Input() small: number;
    constructor () {
    }
    ngOnInit () {
        this.setAmmount(Big(this.ammount));
    }
    ngOnChanges (changes: {[chopen: string]: SimpleChange}) {
        this.setAmmount(Big(this.ammount));
    }
    setAmmount (data: any) {
        if (data.gte(1e6) && this.resize) {
            this.ammountString = data.div(1e6).toFixed(this.big) + 'M';
        }
        if (data.lt(1e6) && data.gte(1e3) && this.resize) {
            this.ammountString = data.div(1e3).toFixed(this.big) + 'K';
        }
        if (data.lt(1e3) && this.resize) {
            this.ammountString = data.toFixed(this.small);
        }
        if (data.lt(1e3) && !this.resize) {
            this.ammountString = data.toFixed(this.small).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
        if (data.gte(1e3) && !this.resize) {
            this.ammountString = data.toFixed(this.big).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
    }
}
