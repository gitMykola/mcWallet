import {
    Component, OnInit, Input, OnChanges,
    SimpleChange
} from '@angular/core';
import {
    animate, animateChild, group, query, stagger, state, style, transition,
    trigger, useAnimation
} from '@angular/animations';
import {anim} from '../../components/animations';

@Component({
    selector: 'app-start-text',
    template: `
        <div class="start-text" [@startText]="open">
            <p>{{text_1}}<span>{{text_2}}</span><span></span></p>
            <p>
                <span>
                    <span>{{text_4}}</span>
                    <span>{{text_5}}</span>
                </span>
                <span>{{text_3}}</span>
            </p>
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
            line-height: 1;
        }
        .start-text p:nth-child(1) {
            top: 25px;
            left: 30px;
            font-size: 30px;
            color: rgb(255,205,0);
        }
        .start-text p:nth-child(1) span {
            font-family: mcFontBold;
            font-size: 17px;
            font-weight: 800;
            color: rgb(255,255,255);
            padding-left: 5px;
        }
        .start-text p:nth-child(1) span:nth-child(2) {
            display: block;
            position: absolute;
            bottom: 2px;
            left: 0;
            width: 100%;
            border-bottom: 2px solid rgb(255,205,0);
        }
        .start-text p:nth-child(2) {
            top: 30px;
            right: 50px;
            font-size: 27px;
            font-family: mcFontBold;
            line-height: 1;
        }
        .start-text p:nth-child(2) span:nth-child(1) {
            display: inline-block;
            width: 80px;
            font-size: 12px;
            color: rgb(255,205,0);
            //letter-spacing: 8px;
            border-right: 2px solid rgb(255,205,0);
        }
        .start-text p:nth-child(2) span:nth-child(1) span:nth-child(2) {
            letter-spacing: 5.8px;
            margin: 0;
        }
        .start-text p:nth-child(2) span:nth-child(2) {
            margin-left: -10px;
            letter-spacing: -2px;
            word-spacing: -10px;
        }
        @media screen and (max-width: 640px) {
            .start-text p:nth-child(1) {
                top: 10px;
                left: 10px;
            }
            .start-text p:nth-child(2) {
                top: 45px;
                right: 10px;
            }
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
    @Input() text_5: string;
    state: boolean;
    constructor () {
    }
    ngOnInit () {
        setTimeout(() => this.state = true, 1);
    }
    ngOnChanges (changes: {[chopen: string]: SimpleChange}) {
        this.state = !this.open;
    } // TODO Fix animation states with big delays
}
