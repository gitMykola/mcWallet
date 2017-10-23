import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-tform',
    templateUrl: './tForm.component.html'
})
export class TFormComponent implements OnInit {
    public userName: string;
    public tVisible: Boolean = true;
    public myForm: FormGroup;

    constructor(private fb: FormBuilder) { }
    ngOnInit() {
        this.myForm = this.fb.group({
            uName: [this.userName, [Validators.required, Validators.minLength(4)]],
            // myUpload: [this.userImages, [Validators.required]]
        });
    }
}
