import {
    Component, OnInit, Input, OnChanges,
    SimpleChange
} from '@angular/core';
import {
    animate, animateChild, group, query, stagger, state, style, transition,
    trigger, useAnimation
} from '@angular/animations';
import {anim} from '../../components/animations';
import set = Reflect.set;

@Component({
    selector: 'app-start-text',
    template: `
        <div class="start-text" [@startText]="open">
            <p>{{text_1}}<span>{{text_2}}</span><span></span></p>
            <p>{{text_3}}<span>{{text_4}}</span></p>
            <i></i>
        </div>
    `,
    styles: [`
        .start-text {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        }
        .start-text p {
            display: block;
            position: absolute;
            margin: 0;
            padding: 3px;
            color: rgb(255,255,255);
        }
        .start-text p:nth-child(1) {
            top: 30px;
            left: 30px;
            font-size: 30px;
            color: rgb(255,205,0);
        }
        .start-text p:nth-child(1) span {
            font-size: 17px;
            font-weight: 800;
            color: rgb(255,255,255);
            padding-left: 5px;
        }
        .start-text p:nth-child(1) span:nth-child(2) {
            display: block;
            position: absolute;
            bottom: 5px;
            left: 0;
            width: 100%;
            border-bottom: 2px solid rgb(255,205,0);
        }
        .start-text p:nth-child(2) {
            top: 30px;
            right: 50px;
            font-size: 40px;
        }
        .start-text p:nth-child(2) span {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-size: 10px;
            color: rgb(255,205,0);
            padding-left: 6px;
            text-align: justify;
            letter-spacing: 8px;
        }
    `],
    animations: [
        trigger('startText', [
            transition('false => true', [
                group([
                    query('p', [
                        useAnimation(anim.fadeOut, {params: {time: 800}})
                    ]),
                    query('i', [
                        animate('40000000ms', style({
                            fontSize: '*'
                        }))
                    ])
                ])
            ]),
            transition('true => false, * => false', [
                group([
                    query('p', [
                        useAnimation(anim.fadeIn, {params: {time: 3000}})
                    ]),
                    query('p:nth-child(1) span:nth-child(1)', style({
                        filter: 'blur(8px)'
                    })),
                    query('p:nth-child(1) span:nth-child(1)', [
                        animate('3000ms', style({
                            filter: 'blur(0px)'
                        }))
                    ]),
                    query('p:nth-child(1) span:nth-child(2)', style({
                        left: '-100%',
                        opacity: 0
                    })),
                    query('p:nth-child(1) span:nth-child(2)', [
                        animate('3000ms cubic-bezier(0.2, 1, 0.2, 1)', style({
                            left: 0,
                            opacity: 1
                        }))
                    ]),
                    query('i', [
                        animate('40000000ms', style({
                            fontSize: '*'
                        }))
                    ])
                ])
            ])
        ])
    ]
})
export class StartTextComponent implements OnInit, OnChanges {
    @Input() open: boolean;
    @Input() text_1: string;
    @Input() text_2: string;
    @Input() text_3: string;
    @Input() text_4: string;
    state: boolean;
    constructor () {
    }
    ngOnInit () {
        setTimeout(() => this.state = true, 1);
    }
    ngOnChanges (changes: {[chopen: string]: SimpleChange}) {
        this.state = !this.open;
    }
}
