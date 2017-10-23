import { Component, OnInit } from '@angular/core';
import { TFormComponent } from '../test/index';

@Component({
    moduleId: module.id,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    title = '';
    constructor() {}
    ngOnInit() {
        this.title = 'mcWallet Home';
    }
}