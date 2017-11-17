import { Component, OnInit } from '@angular/core';
import * as Items from './items';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
})
export class AuthorComponent implements OnInit {
    items = {};
    ngOnInit() {
        this.items = Items;
    }
}
