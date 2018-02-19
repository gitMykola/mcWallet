import { Component, OnInit } from '@angular/core';
import {config} from '../config';

@Component({
    moduleId: module.id,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title: string;
    exit: boolean;
    constructor() {
        this.title = config().app.name_full;
        this.exit = true;
    }
    ngOnInit() {
    }
    onExit(e) {
        this.exit = e;
    }
}
