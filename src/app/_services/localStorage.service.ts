import {Injectable, OnInit} from '@angular/core';
import * as crypto from 'crypto-browserify';
import {Buffer} from 'buffer';
import {reject} from 'q';

@Injectable()
export class LocalStorageService {
    private _state: boolean;
    private _password: string;
    private _guard: string;
    constructor () {
        this._testLocalStorage()
            .then(() => {
                this._state = true;
                this._password = localStorage.getItem('password');
            })
            .catch(e => { console.log(e);
                this._state = false;
            });
    }
    getState (): boolean { // console.log(this._state);
        return this._state;
    }
    getCipherState (): number { // console.log(this._password === 'cipher');
        return this._password === 'cipher' ?
            1 : this._password === 'noCipher' ? 0 : 2;
    }
    setGuard (password: string) {
        return new Promise((resolve, reject) => {
            if (this._state && typeof(password) === 'string') {
                if (password.length) {
                    this._password = 'cipher';
                    localStorage.setItem('password', this._password);
                    this._guard = password;
                    this.set('_guard', password)
                        .catch(e => reject(e))
                        .then(() => resolve());
                } else {
                    this._password = 'noCipher';
                    localStorage.setItem('password', this._password);
                    resolve();
                }
            } else {
                reject();
            }
        });
    }
    set (key: string, value: string) {
        return new Promise((resolve, reject) => {
            try {
                if (!this._state || !this._password
                    || (this._password === 'cipher' && !this._guard)) {
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
            } catch (e) {
                reject(e.message);
            }
        });
    }
    get (key: string) {
        return new Promise((resolve, reject) => {
            try {
                if (!this._state || !this._password
                    || (this._password === 'cipher' && !this._guard)) {
                    reject();
                } else if (this._password === 'noCipher') {
                    const enc = localStorage.getItem(key);
                    resolve(enc);
                } else {
                    const value = localStorage.getItem(key);
                    this._decrypt(value)
                        .then(dec => {
                            resolve(dec);
                        })
                        .catch(err => reject(err));
                }
            } catch (e) {
                reject(e.message);
            }
        });
    }
    auth (password: string) {
        return new Promise( (resolve, reject) => {
            this._decrypt(localStorage.getItem('_guard'), password)
                .then( guard => {
                    if (password === guard) {
                        return this.setGuard(guard.toString());
                    } else {
                        reject(13);
                    }
                })
                .then(() => {
                    resolve();
                })
                .catch(e => reject(13));
        });
    }
    _encrypt (value: string, pass: string = null) {
        return new Promise((resolve, reject) => {
            try {
                const cipher = crypto
                    .createCipher('aes128', pass ? pass : this._guard);
                let cipherText = cipher.update(Buffer.from(value),
                    'utf8', 'hex');
                cipherText += cipher.final('hex');
                resolve(cipherText);
            } catch (e) {
                reject(e.message);
            }
        });
    }
    _decrypt (value: string, pass: string = null) {
        return new Promise((resolve, reject) => {
            try {
                const decipher = crypto
                    .createDecipher('aes128', pass ? pass : this._guard);
                let text = decipher.update(value,
                    'hex', 'utf8');
                text += decipher.final('utf8');
                resolve(text);
            } catch (e) {console.log('Get reject ' + e.message);
                reject(e.message);
            }
        });
    }
    _testLocalStorage () {
        return new Promise ((resolve, reject) =>  {
            try {
                const test = 'test';
                localStorage.setItem('test', 'test');
                if (test === localStorage.getItem('test')) {
                    resolve();
                } else {
                    reject('wrong read/write test process.');
                }
            } catch (e) {
                reject(e.message);
            }
        });
    }
}
