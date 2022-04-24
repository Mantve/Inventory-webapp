"use strict";(self.webpackChunkInventory_webapp=self.webpackChunkInventory_webapp||[]).push([[911],{1911:(W,_,s)=>{s.r(_),s.d(_,{AuthenticationModule:()=>$});var u=s(9808),o=s(2382),x=s(5556),h=s(795),e=s(4893),v=s(7053),c=s(7917),Z=s(2290);function T(r,n){if(1&r&&(e.TgZ(0,"div",17),e._uU(1),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.hij(" ",t.errorMessage," ")}}function U(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Email is required"),e.qZA())}function I(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Email is not valid"),e.qZA())}function q(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Email cannot be longer than 50 characters"),e.qZA())}function A(r,n){if(1&r&&(e.TgZ(0,"div",18),e.YNc(1,U,2,0,"em",19),e.YNc(2,I,2,0,"em",19),e.YNc(3,q,2,0,"em",19),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.hasError("email","required")),e.xp6(1),e.Q6J("ngIf",t.hasError("email","email")),e.xp6(1),e.Q6J("ngIf",t.hasError("email","maxlength"))}}function w(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Username is required"),e.qZA())}function C(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Username can not contain symbols"),e.qZA())}function b(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Username cannot be longer than 15 characters"),e.qZA())}function N(r,n){if(1&r&&(e.TgZ(0,"div",18),e.YNc(1,w,2,0,"em",19),e.YNc(2,C,2,0,"em",19),e.YNc(3,b,2,0,"em",19),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.hasError("username","required")),e.xp6(1),e.Q6J("ngIf",t.hasError("username","pattern")),e.xp6(1),e.Q6J("ngIf",t.hasError("username","maxlength"))}}function J(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Password is required"),e.qZA())}function Y(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Password cannot be longer than 100 characters"),e.qZA())}function E(r,n){if(1&r&&(e.TgZ(0,"div",18),e.YNc(1,J,2,0,"em",19),e.YNc(2,Y,2,0,"em",19),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.hasError("password","required")),e.xp6(1),e.Q6J("ngIf",t.hasError("password","maxlength"))}}function y(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Passwords do not match"),e.qZA())}function Q(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Password is required"),e.qZA())}function L(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Password cannot be longer than 100 characters"),e.qZA())}function R(r,n){if(1&r&&(e.TgZ(0,"div",18),e.YNc(1,y,2,0,"em",19),e.YNc(2,Q,2,0,"em",19),e.YNc(3,L,2,0,"em",19),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.hasError("confirm","mustMatch")),e.xp6(1),e.Q6J("ngIf",t.hasError("confirm","required")),e.xp6(1),e.Q6J("ngIf",t.hasError("confirm","maxlength"))}}let S=(()=>{class r extends h.O{constructor(t,i,l,g,d){super(),this.formBuilder=t,this._authService=i,this._router=l,this._route=g,this._toastr=d,this.errorMessage="",this.registerUser=f=>{this.showError=!1;const m=Object.assign({},f);this._authService.registerUser("api/register",{username:m.username,password:m.password,email:m.email}).subscribe(a=>{201===a.status&&(this._toastr.success("Registered successfully","Success"),this._router.navigate(["/authentication/login"]))},a=>{this._toastr.error("Error creating account","Error"),this.errorMessage="An error has occured",this.showError=!0})}}ngOnInit(){this._returnUrl=this._route.snapshot.queryParams.returnUrl||"/",this.form=this.formBuilder.group({email:["",[o.kI.required,o.kI.email,o.kI.maxLength(50)]],username:new o.NI("",[o.kI.required,o.kI.maxLength(15),o.kI.pattern("^[a-zA-Z0-9]+$")]),password:new o.NI("",[o.kI.required,o.kI.maxLength(100)]),confirm:new o.NI("",[o.kI.required,o.kI.maxLength(100)])},{validator:(0,x.Y)("password","confirm")})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(o.qu),e.Y36(v.$),e.Y36(c.F0),e.Y36(c.gz),e.Y36(Z._W))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-register"]],features:[e.qOj],decls:30,vars:7,consts:[[1,"card"],[1,"card-body"],[1,"card-title"],["class","alert alert-danger","role","alert",4,"ngIf"],["autocomplete","off","novalidate","",3,"formGroup","ngSubmit"],["for","email",1,"col-form-label"],[1,"col-md-5"],["type","text","id","email","formControlName","email",1,"form-control"],["class","col-md-5 text-danger",4,"ngIf"],["for","username",1,"col-form-label"],["type","text","id","username","formControlName","username",1,"form-control"],["for","password",1,"col-form-label"],["type","password","id","password","formControlName","password",1,"form-control"],["for","confirm",1,"col-form-label"],["type","password","id","confirm","formControlName","confirm",1,"form-control"],[1,"col-md-1"],["type","submit",1,"btn","btn-info",3,"disabled"],["role","alert",1,"alert","alert-danger"],[1,"col-md-5","text-danger"],[4,"ngIf"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),e._uU(3,"Register"),e.qZA(),e.YNc(4,T,2,1,"div",3),e.TgZ(5,"form",4),e.NdJ("ngSubmit",function(){return i.registerUser(i.form.value)}),e.TgZ(6,"label",5),e._uU(7,"Email:"),e.qZA(),e.TgZ(8,"div",6),e._UZ(9,"input",7),e.qZA(),e.YNc(10,A,4,3,"div",8),e.TgZ(11,"label",9),e._uU(12,"Username:"),e.qZA(),e.TgZ(13,"div",6),e._UZ(14,"input",10),e.qZA(),e.YNc(15,N,4,3,"div",8),e.TgZ(16,"label",11),e._uU(17,"Password:"),e.qZA(),e.TgZ(18,"div",6),e._UZ(19,"input",12),e.qZA(),e.YNc(20,E,3,2,"div",8),e.TgZ(21,"label",13),e._uU(22,"Confirm Password:"),e.qZA(),e.TgZ(23,"div",6),e._UZ(24,"input",14),e.qZA(),e.YNc(25,R,4,3,"div",8),e._UZ(26,"br"),e.TgZ(27,"div",15)(28,"button",16),e._uU(29,"Register"),e.qZA()()()()()),2&t&&(e.xp6(4),e.Q6J("ngIf",i.showError),e.xp6(1),e.Q6J("formGroup",i.form),e.xp6(5),e.Q6J("ngIf",i.validateControl("email")),e.xp6(5),e.Q6J("ngIf",i.validateControl("username")),e.xp6(5),e.Q6J("ngIf",i.validateControl("password")),e.xp6(5),e.Q6J("ngIf",i.validateControl("confirm")),e.xp6(3),e.Q6J("disabled",!i.form.valid))},directives:[u.O5,o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u],styles:[""]}),r})();var P=s(1037);function M(r,n){if(1&r&&(e.TgZ(0,"div",13),e._uU(1),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.hij(" ",t.errorMessage," ")}}function O(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Username is required"),e.qZA())}function j(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Username can not contain symbols"),e.qZA())}function k(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Username cannot be longer than 15 characters"),e.qZA())}function F(r,n){if(1&r&&(e.TgZ(0,"div",14),e.YNc(1,O,2,0,"em",15),e.YNc(2,j,2,0,"em",15),e.YNc(3,k,2,0,"em",15),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.hasError("username","required")),e.xp6(1),e.Q6J("ngIf",t.hasError("username","pattern")),e.xp6(1),e.Q6J("ngIf",t.hasError("username","maxlength"))}}function z(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Password is required"),e.qZA())}function B(r,n){1&r&&(e.TgZ(0,"em"),e._uU(1,"Password cannot be longer than 100 characters"),e.qZA())}function G(r,n){if(1&r&&(e.TgZ(0,"div",14),e.YNc(1,z,2,0,"em",15),e.YNc(2,B,2,0,"em",15),e.qZA()),2&r){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.hasError("password","required")),e.xp6(1),e.Q6J("ngIf",t.hasError("password","maxlength"))}}let X=(()=>{class r extends h.O{constructor(t,i,l,g,d){super(),this._authService=t,this._router=i,this._route=l,this._toastr=g,this._roomService=d,this.errorMessage="",this.loginUser=f=>{this.showError=!1;const m=Object.assign({},f);this._authService.loginUser("api/login",{username:m.username,password:m.password}).subscribe(a=>{this._authService.sendAuthStateChangeNotification(200===a.status),200===a.status&&(localStorage.setItem("user",JSON.stringify(a.body)),localStorage.setItem("loggedAt",Date.now().toString()),this._roomService.sendRoomUpdateNotification(),this._toastr.success("Logged in successfully","Success")),this._router.navigate([this._returnUrl])},a=>{this.errorMessage="An error has occured",this._toastr.error("Error Logging in","Error"),this.showError=!0})}}ngOnInit(){this.form=new o.cw({username:new o.NI("",[o.kI.required,o.kI.maxLength(15),o.kI.pattern("^[a-zA-Z0-9]+$")]),password:new o.NI("",[o.kI.required,o.kI.maxLength(100)])}),this._returnUrl=this._route.snapshot.queryParams.returnUrl||"/"}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(v.$),e.Y36(c.F0),e.Y36(c.gz),e.Y36(Z._W),e.Y36(P.X))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-login"]],features:[e.qOj],decls:20,vars:5,consts:[[1,"card"],[1,"card-body"],[1,"card-title"],["class","alert alert-danger","role","alert",4,"ngIf"],["autocomplete","off","novalidate","",3,"formGroup","ngSubmit"],["for","username",1,"col-form-label"],[1,"col-md-5"],["type","text","id","username","formControlName","username",1,"form-control"],["class","col-md-5 text-danger",4,"ngIf"],["for","password",1,"col-form-label"],["type","password","id","password","formControlName","password",1,"form-control"],[1,"col-md-1"],["type","submit",1,"btn","btn-info",3,"disabled"],["role","alert",1,"alert","alert-danger"],[1,"col-md-5","text-danger"],[4,"ngIf"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),e._uU(3,"Login"),e.qZA(),e.YNc(4,M,2,1,"div",3),e.TgZ(5,"form",4),e.NdJ("ngSubmit",function(){return i.loginUser(i.form.value)}),e.TgZ(6,"label",5),e._uU(7,"Username:"),e.qZA(),e.TgZ(8,"div",6),e._UZ(9,"input",7),e.qZA(),e.YNc(10,F,4,3,"div",8),e.TgZ(11,"label",9),e._uU(12,"Password:"),e.qZA(),e.TgZ(13,"div",6),e._UZ(14,"input",10),e.qZA(),e.YNc(15,G,3,2,"div",8),e._UZ(16,"br"),e.TgZ(17,"div",11)(18,"button",12),e._uU(19,"Login"),e.qZA()()()()()),2&t&&(e.xp6(4),e.Q6J("ngIf",i.showError),e.xp6(1),e.Q6J("formGroup",i.form),e.xp6(5),e.Q6J("ngIf",i.validateControl("username")),e.xp6(5),e.Q6J("ngIf",i.validateControl("password")),e.xp6(3),e.Q6J("disabled",!i.form.valid))},directives:[u.O5,o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u],styles:[""]}),r})(),$=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[[u.ez,o.UX,c.Bz.forChild([{path:"register",component:S},{path:"login",component:X}])]]}),r})()}}]);