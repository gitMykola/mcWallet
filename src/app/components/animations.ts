import {animate, animation, keyframes, style} from '@angular/animations';

export const anim = {
    poligonActive: animation([
            style({
                transform: '*'
            }),
            animate('{{ time }}ms',
                style({
                    transform: 'perspective({{ per }}px) rotateX({{ dX }}deg) rotateY({{ dY }}deg)'
                }))
        ],
        {params: {time: 20000, per: 1200, dX: '360', dY: '360'}}),
    wallActive: animation([
            animate('{{ time }}ms cubic-bezier(0, 1, 0, 1)', keyframes([
                style({
                    top: '*',
                    left: '*',
                    width: '*',
                    height: '*',
                    transform: '*',
                    offset: 0}),
                style({
                    top: '{{ mTop }}px',
                    left: '{{ mLeft }}%',
                    width: '{{ w }}px',
                    height: '{{ h }}px',
                    transform: 'translateX({{ tX }}px)' +
                    ' translateY({{ tY }}px)' +
                    ' translateZ({{ tZ }}px)' +
                    ' rotateY({{ dY }}deg)' +
                    ' rotateX({{ dX }}deg)', offset: 1}),
            ]))
        ],
        {params: {
                mTop: 240,
                mLeft: 50,
                w: 200,
                h: 200,
                tX: -100,
                tY: -100,
                tZ: +100,
                dY: 0,
                dX: 0,
                time: 2000
            }}),
    fadeIn: animation([
        animate('{{ time }}ms cubic-bezier(0, 1, 0, 1)', keyframes([
            style({
                opacity: 0,
                offset: 0}),
            style({
                opacity: 1,
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }}),
    poligonInactive: animation([
            style({
                transform: '*'
            }),
            animate('{{ time }}ms',
                style({
                    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
                }))
        ],
        {params: {time: 1000}}),
    wallInactive: animation([
            animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
                style({
                    top: '{{ mTop }}px',
                    left: '{{ mLeft }}%',
                    width: '{{ w }}px',
                    height: '{{ h }}px',
                    transform: 'translateX({{ tX }}px)' +
                    ' translateY({{ tY }}px)' +
                    ' translateZ({{ tZ }}px)' +
                    ' rotateY({{ dY }}deg)' +
                    ' rotateX({{ dX }}deg)',
                    offset: 0}),
                style({
                    top: '*',
                    left: '*',
                    width: '*',
                    height: '*',
                    transform: '*',
                    offset: 1
                }),
            ]))
        ],
        {params: {
                mTop: 240,
                mLeft: 50,
                w: 200,
                h: 200,
                tX: -100,
                tY: -100,
                tZ: +100,
                dY: 0,
                dX: 0,
                time: 2000
            }}),
    fadeOut: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                opacity: 1,
                offset: 0}),
            style({
                opacity: 0,
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }}),
    fontIn: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                fontSize: 0,
                display: 'none',
                offset: 0}),
            style({
                display: '*',
                offset: 0.1}),
            style({
                fontSize: '*',
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }}),
    fontOut: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                fontSize: '*',
                offset: 0}),
            style({
                fontSize: 0,
                offset: 0.99}),
            style({
                display: 'none',
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }}),
    wallCoinIn: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                height: '*',
                width: '*',
                marginLeft: '*',
                offset: 0}),
            style({
                height: '120px',
                width: '120px',
                marginLeft: '35px',
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }}),
    wallCoinOut: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                height: '120px',
                width: '120px',
                marginLeft: '35px',
                offset: 1}),
            style({
                height: '*',
                width: '*',
                marginLeft: '*',
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }}),
    wallUpIn: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                height: '*',
                width: '*',
                marginLeft: '*',
                offset: 0}),
            style({
                height: '80px',
                width: '80px',
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }}),
    wallUpOut: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                height: '80px',
                width: '80px',
                offset: 1}),
            style({
                height: '*',
                width: '*',
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }}),
    wallDownIn: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                fontSize: '*',
                offset: 0}),
            style({
                fontSize: '23px',
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }}),
    wallDownOut: animation([
        animate('{{ time }}ms cubic-bezier(0.2, 1, 0.2, 1)', keyframes([
            style({
                fontSize: '23px',
                offset: 1}),
            style({
                fontSize: '*',
                offset: 1}),
        ]))
    ], {params: {
            time: 300
        }})
};
