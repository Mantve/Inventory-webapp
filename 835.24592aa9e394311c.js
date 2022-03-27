"use strict";(self.webpackChunkInventory_webapp=self.webpackChunkInventory_webapp||[]).push([[835],{835:(J,h,l)=>{l.r(h),l.d(h,{AuthenticationModule:()=>E});var d=l(9808),o=l(2382);function _(e,n){return s=>{const a=s.controls[n];a.errors&&!a.errors.mustMatch||a.setErrors(s.controls[e].value!==a.value?{mustMatch:!0}:null)}}var r=l(1223),Z=l(9356),g=l(7979),v=l(2290);function A(e,n){if(1&e&&(r.TgZ(0,"div",16),r._uU(1),r.qZA()),2&e){const s=r.oxw();r.xp6(1),r.hij(" ",s.errorMessage," ")}}function T(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Password is required"),r.qZA())}function q(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Passwords do not match"),r.qZA())}function w(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Password is required"),r.qZA())}let U=(()=>{class e{constructor(s,t,a,c,p){this.formBuilder=s,this._authService=t,this._router=a,this._route=c,this._toastr=p,this.errorMessage="",this.validateControl=i=>this.registerForm.controls[i].invalid&&this.registerForm.controls[i].touched,this.hasError=(i,u)=>this.registerForm.controls[i].hasError(u),this.registerUser=i=>{this.showError=!1;const u=Object.assign({},i);this._authService.registerUser("api/register",{username:u.username,password:u.password}).subscribe(m=>{201===m.status&&(this._toastr.success("Registered successfully","Success"),this._router.navigate(["/authentication/login"]))},m=>{this._toastr.error("Error creating account","Error"),this.errorMessage="An error has occured",this.showError=!0})}}ngOnInit(){this._returnUrl=this._route.snapshot.queryParams.returnUrl||"/",this.registerForm=this.formBuilder.group({username:new o.NI("",[o.kI.required,o.kI.maxLength(15),o.kI.pattern("^[a-zA-Z ]*$")]),password:new o.NI("",[o.kI.required]),confirm:new o.NI("",[o.kI.required])},{validator:_("password","confirm")})}}return e.\u0275fac=function(s){return new(s||e)(r.Y36(o.qu),r.Y36(Z.$),r.Y36(g.F0),r.Y36(g.gz),r.Y36(v._W))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-register"]],decls:31,vars:6,consts:[[1,"card"],[1,"card-body"],[1,"card-title"],["class","alert alert-danger","role","alert",4,"ngIf"],["autocomplete","off","novalidate","",3,"formGroup","ngSubmit"],[1,"form-group","row"],["for","username",1,"col-form-label"],[1,"col-md-5"],["type","text","id","username","formControlName","username",1,"form-control"],["for","password",1,"col-form-label"],["type","password","id","password","formControlName","password",1,"form-control"],[4,"ngIf"],["for","confirm",1,"col-form-label"],["type","password","id","confirm","formControlName","confirm",1,"form-control"],[1,"col-md-1"],["type","submit",1,"btn","btn-info",3,"disabled"],["role","alert",1,"alert","alert-danger"]],template:function(s,t){1&s&&(r.TgZ(0,"div",0),r.TgZ(1,"div",1),r.TgZ(2,"h1",2),r._uU(3,"Register"),r.qZA(),r.YNc(4,A,2,1,"div",3),r.TgZ(5,"form",4),r.NdJ("ngSubmit",function(){return t.registerUser(t.registerForm.value)}),r.TgZ(6,"div",5),r.TgZ(7,"label",6),r._uU(8,"Username:"),r.qZA(),r.TgZ(9,"div",7),r._UZ(10,"input",8),r.qZA(),r.qZA(),r.TgZ(11,"div",5),r.TgZ(12,"label",9),r._uU(13,"Password:"),r.qZA(),r.TgZ(14,"div",7),r._UZ(15,"input",10),r.qZA(),r.TgZ(16,"div",7),r.YNc(17,T,2,0,"em",11),r.qZA(),r.qZA(),r.TgZ(18,"div",5),r.TgZ(19,"label",12),r._uU(20,"Confirm Password:"),r.qZA(),r.TgZ(21,"div",7),r._UZ(22,"input",13),r.qZA(),r.TgZ(23,"div",7),r.YNc(24,q,2,0,"em",11),r.YNc(25,w,2,0,"em",11),r.qZA(),r.qZA(),r._UZ(26,"br"),r.TgZ(27,"div",5),r.TgZ(28,"div",14),r.TgZ(29,"button",15),r._uU(30,"Register"),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&s&&(r.xp6(4),r.Q6J("ngIf",t.showError),r.xp6(1),r.Q6J("formGroup",t.registerForm),r.xp6(12),r.Q6J("ngIf",t.validateControl("password")&&t.hasError("password","required")),r.xp6(7),r.Q6J("ngIf",t.validateControl("confirm")&&t.hasError("confirm","mustMatch")),r.xp6(1),r.Q6J("ngIf",t.validateControl("confirm")&&t.hasError("confirm","required")),r.xp6(4),r.Q6J("disabled",!t.registerForm.valid))},directives:[d.O5,o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u],styles:[""]}),e})();var b=l(2333);function C(e,n){if(1&e&&(r.TgZ(0,"div",14),r._uU(1),r.qZA()),2&e){const s=r.oxw();r.xp6(1),r.hij(" ",s.errorMessage," ")}}function I(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Username is required"),r.qZA())}function y(e,n){1&e&&(r.TgZ(0,"em"),r._uU(1,"Password is required"),r.qZA())}let F=(()=>{class e{constructor(s,t,a,c,p){this._authService=s,this._router=t,this._route=a,this._toastr=c,this._roomService=p,this.errorMessage="",this.validateControl=i=>this.loginForm.controls[i].invalid&&this.loginForm.controls[i].touched,this.hasError=(i,u)=>this.loginForm.controls[i].hasError(u),this.loginUser=i=>{this.showError=!1;const u=Object.assign({},i);this._authService.loginUser("api/login",{username:u.username,password:u.password}).subscribe(m=>{this._authService.sendAuthStateChangeNotification(200===m.status),200===m.status&&(localStorage.setItem("user",JSON.stringify(m.body)),sessionStorage.setItem("loggedAt",Date.now().toString()),this._roomService.sendRoomUpdateNotification(),this._toastr.success("Logged in successfully","Success")),this._router.navigate([this._returnUrl])},m=>{this.errorMessage="An error has occured",this._toastr.error("Error Logging in","Error"),this.showError=!0})}}ngOnInit(){this.loginForm=new o.cw({username:new o.NI("",[o.kI.required]),password:new o.NI("",[o.kI.required])}),this._returnUrl=this._route.snapshot.queryParams.returnUrl||"/"}}return e.\u0275fac=function(s){return new(s||e)(r.Y36(Z.$),r.Y36(g.F0),r.Y36(g.gz),r.Y36(v._W),r.Y36(b.X))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-login"]],decls:25,vars:5,consts:[[1,"card"],[1,"card-body"],[1,"card-title"],["class","alert alert-danger","role","alert",4,"ngIf"],["autocomplete","off","novalidate","",3,"formGroup","ngSubmit"],[1,"form-group","row"],["for","username",1,"col-form-label"],[1,"col-md-5"],["type","text","id","username","formControlName","username",1,"form-control"],[4,"ngIf"],["for","password",1,"col-form-label"],["type","password","id","password","formControlName","password",1,"form-control"],[1,"col-md-1"],["type","submit",1,"btn","btn-info",3,"disabled"],["role","alert",1,"alert","alert-danger"]],template:function(s,t){1&s&&(r.TgZ(0,"div",0),r.TgZ(1,"div",1),r.TgZ(2,"h1",2),r._uU(3,"Login"),r.qZA(),r.YNc(4,C,2,1,"div",3),r.TgZ(5,"form",4),r.NdJ("ngSubmit",function(){return t.loginUser(t.loginForm.value)}),r.TgZ(6,"div",5),r.TgZ(7,"label",6),r._uU(8,"Username:"),r.qZA(),r.TgZ(9,"div",7),r._UZ(10,"input",8),r.qZA(),r.TgZ(11,"div",7),r.YNc(12,I,2,0,"em",9),r.qZA(),r.qZA(),r.TgZ(13,"div",5),r.TgZ(14,"label",10),r._uU(15,"Password:"),r.qZA(),r.TgZ(16,"div",7),r._UZ(17,"input",11),r.qZA(),r.TgZ(18,"div",7),r.YNc(19,y,2,0,"em",9),r.qZA(),r.qZA(),r._UZ(20,"br"),r.TgZ(21,"div",5),r.TgZ(22,"div",12),r.TgZ(23,"button",13),r._uU(24,"Login"),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&s&&(r.xp6(4),r.Q6J("ngIf",t.showError),r.xp6(1),r.Q6J("formGroup",t.loginForm),r.xp6(7),r.Q6J("ngIf",t.validateControl("username")&&t.hasError("username","required")),r.xp6(7),r.Q6J("ngIf",t.validateControl("password")&&t.hasError("password","required")),r.xp6(4),r.Q6J("disabled",!t.loginForm.valid))},directives:[d.O5,o._Y,o.JL,o.sg,o.Fj,o.JJ,o.u],styles:[""]}),e})(),E=(()=>{class e{}return e.\u0275fac=function(s){return new(s||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[d.ez,o.UX,g.Bz.forChild([{path:"register",component:U},{path:"login",component:F}])]]}),e})()}}]);