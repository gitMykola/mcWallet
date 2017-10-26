import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as RandomString from 'randombytes';
import * as Pair from 'keypair';
import { Buffer } from 'buffer/';
import * as crypto from 'crypto-browserify';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Component({
    selector: 'app-tform',
    templateUrl: './tForm.component.html',
})
export class TFormComponent implements OnInit {
    public userName: string;
    public userPass: string;
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
            // myUpload: [this.userImages, [Validators.required]]
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
        const keys = Pair();
        localStorage.setItem('keyAES', RandomString(32)); // AES key
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
        this.tokenAuth = localStorage.getItem('accessToken');
        const header = new Headers({'x-access-token': this.tokenAuth});
        header.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: header });
        this.cryptoAESKey = crypto.publicEncrypt(localStorage
            .getItem('serverPublicKey'), Buffer
                .from('Fuck sheat')) ;
        this.http.post('http://localhost:3000/api/v3.0/encrypt', // send CPbK
            {en: this.cryptoAESKey}, options)
            .subscribe((resp: Response) => {
                console.dir(resp);
            });
    }
    CryptoAES() {}
    CryptoData(data: string) {}
}
