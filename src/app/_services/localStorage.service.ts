import {Injectable, OnInit} from '@angular/core';
import {reject} from 'q';

@Injectable()
export class LocalStorageService implements OnInit {
    private _state: boolean;
    private _password: string;
    private _guard: string;
    constructor () {}
    ngOnInit () {
        this._testLocalStorage()
            .then(() => {
                this._state = true;
                this._password = localStorage.getItem('password');
            })
            .catch(() => {
                this._state = false;
            });
    }
    setGuard (password: string) {
        return new Promise(resolve => {
            if (this._state) {
                this._guard = password;
                resolve();
            } else {
                reject();
            }
        });
    }
    set (key: string, value: string) {
        return new Promise(resolve => {
            if (!this._state || !this._password || (this._password && !this._guard)) {
                reject();
            } else if (this._password === 'noCipher') {
                localStorage.setItem(key, value);
                resolve();
            } else {
                this._encrypt(value)
                    .then(enc => {
                        localStorage.setItem(key, enc.toString());
                        resolve();
                    })
                    .catch(err => reject(err));
            }
        });
    }
    get (key: string) {
        return new Promise(resolve => {
            if (!this._state || !this._password || (this._password && !this._guard)) {
                reject();
            } else if (this._password === 'noCipher') {
                const enc = localStorage.getItem(key);
                resolve(enc);
            } else {
                this._decrypt(key)
                    .then(dec => {
                        const value = localStorage.getItem(key);
                        resolve(value);
                    })
                    .catch(err => reject(err));
            }
        });
    }
    _encrypt (value: string) {
        return new Promise(resolve => {
            resolve(value);
        });
    }
    _decrypt (value: string) {
        return new Promise(resolve => {
            resolve(value);
        });
    }
    _testLocalStorage () {
        return new Promise (resolve =>  {
            try {
                const test = 'test';
                localStorage.setItem('test', 'test');
                if (test === localStorage.getItem('test')) {
                    resolve();
                } else {
                    reject();
                }
            } catch (e) {
                reject(e);
            }
        });
    }
}
