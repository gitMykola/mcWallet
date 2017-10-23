import { Component, OnInit } from '@angular/core';
// import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    constructor(private router: Router,
              //  private authenticationService: AuthenticationService
    ) {}
    ngOnInit() {}
    Register() {}
}
