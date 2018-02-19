import {async, inject, TestBed} from '@angular/core/testing';
import {InfoMonitor} from '../_services/info.monitor';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
// let iM = null;
beforeEach(async(() => {
    TestBed.resetTestEnvironment();
    TestBed
        .initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
        .configureTestingModule({
        providers: [ InfoMonitor ]
    });
}));

describe('InfoMonitor', () => {
    xit('add', async(() => {
        const iM = TestBed.get(InfoMonitor);
        let msg = 'Test message';
        iM.add(msg, 0);
        msg = 'Test message 2';
        iM.add(msg, 2);
        const r = iM.getAll();
        console.log(r[1].message + r.length);
        expect(r[1].message).toEqual(msg);
    }));
    xit('filter', async(() => {
        const iM = TestBed.get(InfoMonitor);
        const msg1 = 'Test message';
        iM.add(msg1, 0);
        const msg2 = 'Test message 2';
        iM.add(msg2, 2);
        const r = iM.get({
            time: [
                (new Date()).getTime(),
                (new Date()).getTime() - 1000
            ],
            message: 'Test',
        });
        expect(r[0].message).toEqual(msg1);
        expect(r.length).toEqual(2);
    }));
});

