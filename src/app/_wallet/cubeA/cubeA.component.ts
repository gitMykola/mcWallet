import {
    Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterViewInit, OnChanges,
    SimpleChange,
} from '@angular/core';
import * as $ from 'jquery';
import {ResizeService} from '../../_services/resize';
import {Subscription} from 'rxjs/Subscription';
import {TranslatorService} from '../../_services/translator.service';
import {group, query, transition, trigger, useAnimation} from '@angular/animations';
import {anim} from '../../components/animations';

@Component({
    selector: 'app-cube-a',
    templateUrl: './cubeA.component.html',
    styleUrls: ['./cubeA.css'],
    animations: [
        trigger('poligon', [
            transition('close => inactive', [
                group([
                    query('.poligon', [
                        useAnimation(anim.poligonActive)
                    ]),
                    query('button', [
                        useAnimation(anim.fadeIn,
                            {params: {
                                    time: 2000
                                }})
                    ]),
                    query('.wall:nth-child(1) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -100,
                                tY: -100,
                                tZ: +100,
                                dY: 0,
                                dX: 0,
                                time: 5000
                            }
                        })
                    ]),
                    query('.wall:nth-child(2) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -200,
                                tY: -100 - 80,
                                tZ: 0,
                                dY: 90,
                                dX: 0,
                                time: 5000
                            }
                        })
                    ]),
                    query('.wall:nth-child(3) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -100,
                                tY: -100 - 80 * 2,
                                tZ: -100,
                                dY: 180,
                                dX: 0,
                                time: 5000
                            }
                        })
                    ]),
                    query('.wall:nth-child(4) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: 0,
                                tY: -100 - 80 * 3,
                                tZ: 0,
                                dY: -90,
                                dX: 0,
                                time: 5000
                            }
                        })
                    ]),
                    query('.wall:nth-child(5) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -100,
                                tY: - 80 * 4,
                                tZ: 0,
                                dY: 0,
                                dX: 90,
                                time: 5000
                            }
                        })
                    ]),
                    query('.wall:nth-child(6) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -100,
                                tY: -200 - 80 * 5,
                                tZ: 0,
                                dY: 0,
                                dX: -90,
                                time: 5000
                            }
                        })
                    ]),
                    query('.wall-background', [
                        useAnimation(anim.fadeIn, {params: { time: 1}})
                    ]),
                    query('.wall-name, .wall-ammount', [
                        useAnimation(anim.fontOut, {params: { time: 1}})
                    ]),
                    query('.wall-coin', [
                        useAnimation(anim.wallCoinIn, {params: { time: 1}})
                    ]),
                    query('.wall-up', [
                        useAnimation(anim.wallUpIn, {params: { time: 1}})
                    ]),
                    query('.wall-down', [
                        useAnimation(anim.wallDownIn, {params: { time: 1}})
                    ])
                ])
            ]),
            transition('active => inactive', [
                group([
                    query('.poligon', [
                        useAnimation(anim.poligonActive)
                    ]),
                    query('.wall:nth-child(1) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -100,
                                tY: -100,
                                tZ: +100,
                                dY: 0,
                                dX: 0
                            }
                        })
                    ]),
                    query('.wall:nth-child(2) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -200,
                                tY: -100 - 80,
                                tZ: 0,
                                dY: 90,
                                dX: 0
                            }
                        })
                    ]),
                    query('.wall:nth-child(3) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -100,
                                tY: -100 - 80 * 2,
                                tZ: -100,
                                dY: 180,
                                dX: 0
                            }
                        })
                    ]),
                    query('.wall:nth-child(4) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: 0,
                                tY: -100 - 80 * 3,
                                tZ: 0,
                                dY: -90,
                                dX: 0
                            }
                        })
                    ]),
                    query('.wall:nth-child(5) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -100,
                                tY: - 80 * 4,
                                tZ: 0,
                                dY: 0,
                                dX: 90
                            }
                        })
                    ]),
                    query('.wall:nth-child(6) button', [
                        // style('*'),
                        useAnimation(anim.wallActive, {
                            params: {
                                tX: -100,
                                tY: -200 - 80 * 5,
                                tZ: 0,
                                dY: 0,
                                dX: -90
                            }
                        })
                    ]),
                    query('.wall-background', [
                        useAnimation(anim.fadeIn, {params: { time: 2000}})
                    ]),
                    query('.wall-name, .wall-ammount', [
                        useAnimation(anim.fontOut, {params: { time: 2000}})
                    ]),
                    query('.wall-coin', [
                        useAnimation(anim.wallCoinIn, {params: { time: 2000}})
                    ]),
                    query('.wall-up', [
                        useAnimation(anim.wallUpIn, {params: { time: 2000}})
                    ]),
                    query('.wall-down', [
                        useAnimation(anim.wallDownIn, {params: { time: 2000}})
                    ])
                ])
            ]),
            transition('inactive => active', [
                group([
                    query('.poligon', [
                        useAnimation(anim.poligonInactive)
                    ]),
                    query('.wall:nth-child(1) button', [
                        // style('*'),
                        useAnimation(anim.wallInactive, {
                            params: {
                                tX: -100,
                                tY: -100,
                                tZ: +100,
                                dY: 0,
                                dX: 0
                            }
                        })
                    ]),
                    query('.wall:nth-child(2) button', [
                        // style('*'),
                        useAnimation(anim.wallInactive, {
                            params: {
                                tX: -200,
                                tY: -100 - 80,
                                tZ: 0,
                                dY: 90,
                                dX: 0
                            }
                        })
                    ]),
                    query('.wall:nth-child(3) button', [
                        // style('*'),
                        useAnimation(anim.wallInactive, {
                            params: {
                                tX: -100,
                                tY: -100 - 80 * 2,
                                tZ: -100,
                                dY: 180,
                                dX: 0
                            }
                        })
                    ]),
                    query('.wall:nth-child(4) button', [
                        // style('*'),
                        useAnimation(anim.wallInactive, {
                            params: {
                                tX: 0,
                                tY: -100 - 80 * 3,
                                tZ: 0,
                                dY: -90,
                                dX: 0
                            }
                        })
                    ]),
                    query('.wall:nth-child(5) button', [
                        // style('*'),
                        useAnimation(anim.wallInactive, {
                            params: {
                                tX: -100,
                                tY: - 80 * 4,
                                tZ: 0,
                                dY: 0,
                                dX: 90
                            }
                        })
                    ]),
                    query('.wall:nth-child(6) button', [
                        // style('*'),
                        useAnimation(anim.wallInactive, {
                            params: {
                                tX: -100,
                                tY: -200 - 80 * 5,
                                tZ: 0,
                                dY: 0,
                                dX: -90
                            }
                        })
                    ]),
                    query('.wall-background', [
                        useAnimation(anim.fadeOut, {params: {time: 2000}})
                    ]),
                    query('.wall-name, .wall-ammount', [
                        useAnimation(anim.fontIn, {params: { time: 2000}})
                    ]),
                    query('.wall-coin', [
                        useAnimation(anim.wallCoinOut, {params: { time: 2000}})
                    ]),
                    query('.wall-up', [
                        useAnimation(anim.wallUpOut, {params: { time: 2000}})
                    ]),
                    query('.wall-down', [
                        useAnimation(anim.wallDownOut, {params: { time: 2000}})
                    ])
                ])
            ])
        ])
    ]
})
export class CubeAComponent implements OnInit, OnDestroy, OnChanges {
    resize: Subscription;
    load: Subscription;
    state: string;
    resizeAmmounts: boolean;
    @Input() walls: any;
    @Output() onSelect = new EventEmitter<string>();
    @Input() open: boolean;
    constructor (
        private rs: ResizeService,
        public trans: TranslatorService) {
        this.state = 'close';
    }
    ngOnInit () {
        setTimeout(() => this.state = 'inactive', 1);
        this.resizeAmmounts = false;
        this.resize = this.rs.onResize$.subscribe(data => this.set(data));
        this.load = this.rs.onLoad$.subscribe(data => this.set(data));
    }
    ngOnDestroy() {
        if (this.resize) {
            this.rs.onResize$.unsubscribe();
        }
        if (this.load) {
            this.rs.onLoad$.unsubscribe();
        }
    }
    select (wall: string) {
        this.onSelect.emit(wall);
    }
    ngOnChanges (changes: {[chopen: string]: SimpleChange}) {
        this.stateCubeChange ();
    }
    set (data) {
        this.resizeAmmounts = data.width < 580;
    }
    stateCubeChange () {
        console.log(this.state);
        if (this.state !== 'close') {
            this.state = this.open ? 'active' : 'inactive';
        } else {
            this.state = this.open ? 'active' : this.state;
        }
        console.log(this.state);
    }
}
