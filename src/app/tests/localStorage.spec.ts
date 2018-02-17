import {LocalStorageService} from '../_services/localStorage.service';
import {async, TestBed} from '@angular/core/testing';
let ls = null;
beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [ LocalStorageService ]
    });
    ls = TestBed.get(LocalStorageService);
});

describe('LocalStorage', () => {
    xit('LocalStorage.setGuard noCipher', async(() => {
        ls.ngOnInit();
        setTimeout(() => {
            const key = 'test',
                  val = 'try';
            ls.setGuard('')
                .then(() => {
                    return ls.set(key, val);
                }).then(() => {
                    return ls.get(key);
                })
                .then(value => {
                    expect(value).toEqual(val);
                })
                .catch((err) => {
                    console.dir(err);
                    expect(false).toBe(true);
                });
        }, 500);
    }));
    xit('LocalStorage.setGuard cipher', async(() => {
        ls.ngOnInit();
        setTimeout(() => {
            const key = 'test',
                val = 'try';
            ls.setGuard('somePass12')
                .then(() => {
                    return ls.set(key, val);
                })
                .then(() => {
                    return ls.get(key);
                })
                .then(value => {
                    expect(value).toEqual(val);
                })
                .catch((err) => {
                    expect(false).toBe(true);
                });
        }, 500);
    }));
});
