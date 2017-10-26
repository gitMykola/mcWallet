import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as RandomString from 'randombytes';
import * as Pair from 'keypair';
import { Buffer } from 'buffer/';
import * as crypto from 'crypto-browserify';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import * as cp from 'crypto-js';

@Component({
    selector: 'app-tform',
    templateUrl: './tForm.component.html',
})
export class TFormComponent implements OnInit {
    public userName: string;
    public userPass: string;
    public userData: string;
    public tVisible: Boolean = true;
    public myForm: FormGroup;
    private tokenAuth: string;
    createAES: Boolean = false;
    createRSA: Boolean = false;
    sendCryptoAES: Boolean = false;
    sendCryptoData: Boolean = false;
    keyAES: string;
    privateKey: string;
    publicKey: string;
    serverPublicKey: string;
    cryptoAESKey: string;
    constructor(private fb: FormBuilder, private http: Http) { }
    ngOnInit() {
        this.myForm = this.fb.group({
            uName: [this.userName, [Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50)]],
            uPass: [this.userPass, [Validators.required,
                Validators.minLength(4),
                Validators.maxLength(50)]],
            uData: [this.userData, [Validators.required,
                Validators.minLength(1),
                Validators.maxLength(250)]],
        });
    }
    login() {
        this.tVisible = !this.tVisible;
        // this.initCrypto();
         const header = new Headers({'Authorization': 'Bearer ' + btoa(
        this.myForm.getRawValue().uName + ':' + this.myForm.getRawValue().uPass
    )});
        const options = new RequestOptions({ headers: header });
        this.http.post('http://localhost:3000/api/v3.0/auth', '', options)
            .subscribe((res: Response) => {
                this.tokenAuth = res.headers.get('WWW-Authenticate');
                localStorage.setItem('accessToken', this.tokenAuth);
                console.dir(this.tokenAuth);
            });
    }
    generate() {
        window.crypto.subtle.generateKey(
            {
                name: 'AES-CBC',
                length: 256,
            },
                true,
            ['encrypt', 'decrypt']
        )
            .then(key => {
                window.crypto.subtle.exportKey(
                    'jwk', key
                )
                    .then(keyData => localStorage
                        .setItem('keyAES', JSON.stringify(keyData)));
            });
        const keys = Pair();
        // localStorage.setItem('keyAES', RandomString(32)); // AES key
        localStorage.setItem('privateKey', keys.private); // RSA private key
        localStorage.setItem('publicKey', keys.public); // RSA public key
    }
    initCrypto() {
        this.keyAES = localStorage.getItem('keyAES');
        this.privateKey = localStorage.getItem('privateKey');
        this.publicKey = localStorage.getItem('publicKey');
    }
    sendCryptoAS() {
        this.tokenAuth = localStorage.getItem('accessToken');
        this.keyAES = localStorage.getItem('keyAES');
        const header = new Headers({'x-access-token': this.tokenAuth});
        header.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: header });
        this.http.post('http://localhost:3000/api/v3.0/cryptoinit', // send CPbK
            {as: btoa(this.publicKey)}, options)
            .subscribe((res: Response) => {
                this.serverPublicKey = atob(res.headers.get('res-spk'));
                localStorage.setItem('serverPublicKey', this.serverPublicKey);
                console.log('SPK - ' + this.serverPublicKey);
                console.dir(res.json());
                this.cryptoAESKey = crypto.publicEncrypt(localStorage
                    .getItem('serverPublicKey'), Buffer
                    .from(this.keyAES)) ;
                this.http.post('http://localhost:3000/api/v3.0/receiveAS', // send CPbK
                    {ae: this.cryptoAESKey}, options)
                    .subscribe((resp: Response) => {
                        console.dir(resp);
                    });
            });
    }
    sendCryptData() {
        window.crypto.subtle.importKey(
            'jwk',
            JSON.parse(localStorage.getItem('keyAES')),
            {name: 'AES-CBC'},
            true,
            ['encrypt', 'decrypt']
        ).then(key => {
            const initVector = window.crypto.getRandomValues(new Uint8Array(16));
            window.crypto.subtle.encrypt(
                {
                    name: 'AES-CBC',
                    iv: initVector
                },
                key,
                Buffer.from(this.myForm.getRawValue().uData)
            )
                .then(encData => {
                    console.dir(key);
                    this.tokenAuth = localStorage.getItem('accessToken');
                    const header = new Headers({'x-access-token': this.tokenAuth});
                    header.append('Content-Type', 'application/json');
                    const options = new RequestOptions({ headers: header });
                    this.http.post('http://localhost:3000/api/v3.0/encryptDA', // send CPbK
                        {dt: Buffer.from(encData), vr: Buffer.from(initVector)}, options)
                        .subscribe((resp: Response) => {
                            console.dir(resp);
                        });
                    window.crypto.subtle.decrypt(
                        {
                            name: 'AES-CBC',
                            iv: initVector
                        },
                        key,
                        encData
                    ).then(dcd => console.dir(Buffer.from(dcd).toString()));
                    const decipher = crypto.createDecipheriv('aes-256-cbc',
                        key,
                        initVector);
                    let dt = decipher.update(Buffer.from(encData));
                    dt = decipher.final();
                    console.log(dt);
                });
        });
    }
    CryptoAES() {}
    CryptoData(data: string) {}
}
