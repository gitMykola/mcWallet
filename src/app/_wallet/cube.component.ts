import {Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';
import {ResizeService} from '../_services/resize';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-cube',
    templateUrl: './cube.component.html',
    styleUrls: ['./cube.css']
})
export class CubeComponent implements OnInit, OnDestroy, AfterViewInit {
    resize: Subscription;
    @Input() walls: any;
    @Output() onSelect = new EventEmitter<string>();
    constructor (private rs: ResizeService) {}
    ngOnInit () {
        this.resize = this.rs.onResize$.subscribe(data => this.setCube(data));
    }
    ngOnDestroy() {
        if (this.resize) {
            this.rs.onResize$.unsubscribe();
        }
    }
    ngAfterViewInit () {
        this.setCube({width: window.innerWidth});
    }
    select (wall: string) {
        this.onSelect.emit(wall);
    }
    setCube (data) {
        const poli = document.querySelectorAll('#cube .poli'),
            cubeWalls = document.querySelectorAll('#cube .poli .poligon .wall');
        $(poli.item(0)).css({
            left: data.width / 2 - 200 + 'px'
        });
        $(cubeWalls[0])
            .css({
            transform: 'translateX(0px) translateY(0px)' +
            ' translateZ(200px)'
        });
        $(cubeWalls[1])
            .css({
            transform: 'translateX(-200px) translateY(0px)' +
            ' rotateY(-90deg)'
            });
        $(cubeWalls[5])
            .css({
                transform: 'translateX(0px) translateY(0px)' +
                ' translateZ(-200px) rotateY(-180deg)'
            });
        $(cubeWalls[2])
            .css({
                transform: 'translateX(200px) translateY(0px)' +
                ' rotateY(90deg)'
            });
        $(cubeWalls[3])
            .css({
                transform: 'translateX(0px) translateY(-200px)' +
                ' rotateX(90deg)'
            });
        $(cubeWalls[4])
            .css({
                transform: 'translateX(0px) translateY(200px)' +
                ' rotateX(-90deg)'
            });
    }
    setTabs () {
        const poligon = document.querySelectorAll('#cube .poli .poligon'),
            cubeWalls = document.querySelectorAll('#cube .poli .poligon .wall');
        $(cubeWalls[0])
            .css({
                transform: 'translateX(-400px) translateY(0px)' +
                ' translateZ(0px)'
            });
    }
}
