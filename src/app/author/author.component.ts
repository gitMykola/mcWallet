import { Component, OnInit } from '@angular/core';
import * as Skills from './skills';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
})
export class AuthorComponent implements OnInit {
    areas = [];
    applications = [];
    frontend = [];
    backend = [];
    databases = [];
    scv = [];
    tests = [];
    ide = [];
    os = [];
    ngOnInit() {
        const fskills = (obj) => {
            const arr = [];
            for ( const key in obj ) {
                if (obj.hasOwnProperty(key)) {
                    arr.push({name: key, rate: obj[key]});
                }
            }
            return arr;
        };
        this.areas = fskills(Skills.areas);
        this.applications = fskills(Skills.categories.applications);
        this.frontend = fskills(Skills.skills.frontend);
        this.backend = fskills(Skills.skills.backend);
        this.databases = fskills(Skills.skills.databases);
        this.scv = fskills(Skills.skills.scv);
        this.tests = fskills(Skills.skills.tests);
        this.os = fskills(Skills.skills.os);
        console.log('OK');
        document.querySelector('.skill-areas').setAttribute(
            'style', 'top:200px;' +
            '        left:400px;' +
            '        height:150px;' +
            '        width:150px;'// +
            // '        transform: translateZ(-800px);'
        );
        document.querySelector('.skill-applications').setAttribute(
            'style', 'top:300px;' +
            '        left:400px;' +
            '        height:150px;' +
            '        width:150px;'// +
            // '       perspective:0px'// +
            // '       transform:translateZ(0px)'
        );
    }
}
