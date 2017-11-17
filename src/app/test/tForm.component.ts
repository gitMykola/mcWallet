import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as RandomString from 'randombytes';
import * as Pair from 'keypair';
import { Buffer } from 'buffer';
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
        this.http.post('http://localhost:3000/api/v3.0/auth', '.', options)
            .subscribe((res: Response) => {
                this.tokenAuth = res.headers.get('WWW-Authenticate');
                localStorage.setItem('accessToken', this.tokenAuth);
                console.dir(this.tokenAuth);
            });
    }
    generate() {
        const key = cp.SHA256(crypto.randomBytes(32)).toString();
        localStorage.setItem('keyAES256',
            key.slice(0, 32));
        const keys = Pair();
        // localStorage.setItem('keyAES', RandomString(32)); // AES key
        localStorage.setItem('privateKey', keys.private); // RSA private key
        localStorage.setItem('publicKey', keys.public); // RSA public key
    }
    initCrypto() {
        this.keyAES = localStorage.getItem('keyAES256');
        this.privateKey = localStorage.getItem('privateKey');
        this.publicKey = localStorage.getItem('publicKey');
    }
    sendCryptoAS() {
        this.tokenAuth = localStorage.getItem('accessToken');
        this.keyAES = localStorage.getItem('keyAES256');
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
        const initVector = crypto.randomBytes(16);
        const key = localStorage.getItem('keyAES256');
        const cipher = crypto.createCipheriv('aes-256-cbc',
            key,
            initVector);
        let encData = cipher.update(Buffer.from(this.myForm.getRawValue().uData),
            'utf8', 'hex');
        encData += cipher.final('hex');
                    console.dir(encData);
                    this.tokenAuth = localStorage.getItem('accessToken');
                    const header = new Headers({'x-access-token': this.tokenAuth});
                    header.append('Content-Type', 'application/json');
                    const options = new RequestOptions({ headers: header });
                    this.http.post('http://localhost:3000/api/v3.0/encryptDA', // send CPbK
                        {dt: encData, vr: initVector}, options)
                        .subscribe((resp: Response) => {
                            console.dir(resp);
                        });
                    const decipher = crypto.createDecipheriv('aes-256-cbc',
                        key,
                        initVector);
                    let dt = decipher.update(encData, 'hex', 'utf8');
                    dt += decipher.final('utf8');
                    console.log(dt);
    }
    CryptoAES() {}
    CryptoData(data: string) {}
}
