"use strict";(self.webpackChunkInventory_webapp=self.webpackChunkInventory_webapp||[]).push([[929],{2929:(J,h,l)=>{l.r(h),l.d(h,{AuthenticationModule:()=>E});var d=l(9808),o=l(2382);function _(e,n){return s=>{const a=s.controls[n];a.errors&&!a.errors.mustMatch||a.setErrors(s.controls[e].value!==a.value?{mustMatch:!0}:null)}}var r=l(4893),v=l(7053),c=l(7917),Z=l(2290);function w(e,n){if(1&e&&(r.TgZ(0,"div",15),r._uU(1),r.qZA()),2&e){const s=r.oxw();r.xp6(1),r.hij(" ",s.errorMessage," ")}}function U(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Password is required"),r.qZA())}function T(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Passwords do not match"),r.qZA())}function A(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Password is required"),r.qZA())}let b=(()=>{class e{constructor(s,t,a,g,p){this.formBuilder=s,this._authService=t,this._router=a,this._route=g,this._toastr=p,this.errorMessage="",this.validateControl=i=>this.registerForm.controls[i].invalid&&this.registerForm.controls[i].touched,this.hasError=(i,u)=>this.registerForm.controls[i].hasError(u),this.registerUser=i=>{this.showError=!1;const u=Object.assign({},i);this._authService.registerUser("api/register",{username:u.username,password:u.password}).subscribe(m=>{201===m.status&&(this._toastr.success("Registered successfully","Success"),this._router.navigate(["/authentication/login"]))},m=>{this._toastr.error("Error creating account","Error"),this.errorMessage="An error has occured",this.showError=!0})}}ngOnInit(){this._returnUrl=this._route.snapshot.queryParams.returnUrl||"/",this.registerForm=this.formBuilder.group({username:new o.NI("",[o.kI.required,o.kI.maxLength(15),o.kI.pattern("^[a-zA-Z ]*$")]),password:new o.NI("",[o.kI.required]),confirm:new o.NI("",[o.kI.required])},{validator:_("password","confirm")})}}return e.\u0275fac=function(s){return new(s||e)(r.Y36(o.qu),r.Y36(v.$),r.Y36(c.F0),r.Y36(c.gz),r.Y36(Z._W))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-register"]],decls:27,vars:6,consts:[[1,"card"],[1,"card-body"],[1,"card-title"],["class","alert alert-danger","role","alert",4,"ngIf"],["autocomplete","off","novalidate","",3,"formGroup","ngSubmit"],["for","username",1,"col-form-label"],[1,"col-md-5"],["type","text","id","username","formControlName","username",1,"form-control"],["for","password",1,"col-form-label"],["type","password","id","password","formControlName","password",1,"form-control"],[4,"ngIf"],["for","confirm",1,"col-form-label"],["type","password","id","confirm","formControlName","confirm",1,"form-control"],[1,"col-md-1"],["type","submit",1,"btn","btn-info",3,"disabled"],["role","alert",1,"alert","alert-danger"]],template:function(s,t){1&s&&(r.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),r._uU(3,"Register"),r.qZA(),r.YNc(4,w,2,1,"div",3),r.TgZ(5,"form",4),r.NdJ("ngSubmit",function(){return t.registerUser(t.registerForm.value)}),r.TgZ(6,"label",5),r._uU(7,"Username:"),r.qZA(),r.TgZ(8,"div",6),r._UZ(9,"input",7),r.qZA(),r.TgZ(10,"label",8),r._uU(11,"Password:"),r.qZA(),r.TgZ(12,"div",6),r._UZ(13,"input",9),r.qZA(),r.TgZ(14,"div",6),r.YNc(15,U,2,0,"em",10),r.qZA(),r.TgZ(16,"label",11),r._uU(17,"Confirm Password:"),r.qZA(),r.TgZ(18,"div",6),r._UZ(19,"input",12),r.qZA(),r.TgZ(20,"div",6),r.YNc(21,T,2,0,"em",10),r.YNc(22,A,2,0,"em",10),r.qZA(),r._UZ(23,"br"),r.TgZ(24,"div",13)(25,"button",14),r._uU(26,"Register"),r.qZA()()()()()),2&s&&(r.xp6(4),r.Q6J("ngIf",t.showError),r.xp6(1),r.Q6J("formGroup",t.registerForm),r.xp6(10),r.Q6J("ngIf",t.validateControl("password")&&t.hasError("password","required")),r.xp6(6),r.Q6J("ngIf",t.validateControl("confirm")&&t.hasError("confirm","mustMatch")),r.xp6(1),r.Q6J("ngIf",t.validateControl("confirm")&&t.hasError("confirm","required")),r.xp6(3),r.Q6J("disabled",!t.registerForm.valid))},directives:[d.O5,o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u],styles:[""]}),e})();var C=l(1037);function q(e,n){if(1&e&&(r.TgZ(0,"div",13),r._uU(1),r.qZA()),2&e){const s=r.oxw();r.xp6(1),r.hij(" ",s.errorMessage," ")}}function I(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Username is required"),r.qZA())}function y(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Password is required"),r.qZA())}let F=(()=>{class e{constructor(s,t,a,g,p){this._authService=s,this._router=t,this._route=a,this._toastr=g,this._roomService=p,this.errorMessage="",this.validateControl=i=>this.loginForm.controls[i].invalid&&this.loginForm.controls[i].touched,this.hasError=(i,u)=>this.loginForm.controls[i].hasError(u),this.loginUser=i=>{this.showError=!1;const u=Object.assign({},i);this._authService.loginUser("api/login",{username:u.username,password:u.password}).subscribe(m=>{this._authService.sendAuthStateChangeNotification(200===m.status),200===m.status&&(localStorage.setItem("user",JSON.stringify(m.body)),sessionStorage.setItem("loggedAt",Date.now().toString()),this._roomService.sendRoomUpdateNotification(),this._toastr.success("Logged in successfully","Success")),this._router.navigate([this._returnUrl])},m=>{this.errorMessage="An error has occured",this._toastr.error("Error Logging in","Error"),this.showError=!0})}}ngOnInit(){this.loginForm=new o.cw({username:new o.NI("",[o.kI.required]),password:new o.NI("",[o.kI.required])}),this._returnUrl=this._route.snapshot.queryParams.returnUrl||"/"}}return e.\u0275fac=function(s){return new(s||e)(r.Y36(v.$),r.Y36(c.F0),r.Y36(c.gz),r.Y36(Z._W),r.Y36(C.X))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-login"]],decls:22,vars:5,consts:[[1,"card"],[1,"card-body"],[1,"card-title"],["class","alert alert-danger","role","alert",4,"ngIf"],["autocomplete","off","novalidate","",3,"formGroup","ngSubmit"],["for","username",1,"col-form-label"],[1,"col-md-5"],["type","text","id","username","formControlName","username",1,"form-control"],[4,"ngIf"],["for","password",1,"col-form-label"],["type","password","id","password","formControlName","password",1,"form-control"],[1,"col-md-1"],["type","submit",1,"btn","btn-info",3,"disabled"],["role","alert",1,"alert","alert-danger"]],template:function(s,t){1&s&&(r.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),r._uU(3,"Login"),r.qZA(),r.YNc(4,q,2,1,"div",3),r.TgZ(5,"form",4),r.NdJ("ngSubmit",function(){return t.loginUser(t.loginForm.value)}),r.TgZ(6,"label",5),r._uU(7,"Username:"),r.qZA(),r.TgZ(8,"div",6),r._UZ(9,"input",7),r.qZA(),r.TgZ(10,"div",6),r.YNc(11,I,2,0,"em",8),r.qZA(),r.TgZ(12,"label",9),r._uU(13,"Password:"),r.qZA(),r.TgZ(14,"div",6),r._UZ(15,"input",10),r.qZA(),r.TgZ(16,"div",6),r.YNc(17,y,2,0,"em",8),r.qZA(),r._UZ(18,"br"),r.TgZ(19,"div",11)(20,"button",12),r._uU(21,"Login"),r.qZA()()()()()),2&s&&(r.xp6(4),r.Q6J("ngIf",t.showError),r.xp6(1),r.Q6J("formGroup",t.loginForm),r.xp6(6),r.Q6J("ngIf",t.validateControl("username")&&t.hasError("username","required")),r.xp6(6),r.Q6J("ngIf",t.validateControl("password")&&t.hasError("password","required")),r.xp6(3),r.Q6J("disabled",!t.loginForm.valid))},directives:[d.O5,o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u],styles:[""]}),e})(),E=(()=>{class e{}return e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[d.ez,o.UX,c.Bz.forChild([{path:"register",component:b},{path:"login",component:F}])]]}),e})()}}]);