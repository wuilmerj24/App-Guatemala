import { Component,OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingController, AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import {ApiService} from "../api.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private platform:Platform,
    private iab: InAppBrowser,
    private loadingController: LoadingController,
    private alertCtrl:AlertController, 
    private navCtrl:NavController,
    private router:Router,
    private apiService: ApiService,
    private storage:Storage,
  ) {}

  ngOnInit(){
    
  }

  async login() {
    const loading=await this.loadingController.create({
      animated:true,
      backdropDismiss:false,
      message:"Espere...",
      translucent:true,
      cssClass:"loading",
      showBackdrop:true,
    });
    await loading.present();
    this.platform.ready().then(async() => {
      this.facebookLogin().then(async(success) => {
        await loading.dismiss();
        // alert(success.code);
        const loadingb = await this.loadingController.create({
          animated: true,
          backdropDismiss: false,
          message: "Iniciando sesion",
          translucent: true,
          cssClass: "loading",
          showBackdrop: true,
          duration:2500
        });
        await loadingb.present();
        this.apiService.login(success.code).subscribe(async(result)=>{
          if(result['code_error']==0){
            this.storage.set("token",result['token']);
            await loadingb.onDidDismiss().then((v)=>{
              this.navCtrl.navigateRoot("/lista");
            })
          }else{
            const alerta = await this.alertCtrl.create({
              animated: true,
              backdropDismiss: true,
              cssClass: "dark",
              translucent: true,
              message: "Error al iniciar sesión",
              buttons: ["Cerrar"]
            });
            await alerta.present();
          }
        },async (error)=>{
          console.log(JSON.stringify(error))
          const alerta = await this.alertCtrl.create({
            animated: true,
            backdropDismiss: true,
            cssClass: "dark",
            translucent: true,
            message: "Error al iniciar sesión",
            buttons: ["Cerrar"]
          });
          await alerta.present();
        })
        
      }, async(error) => {
        await loading.dismiss();
        if(error===1){
          const alerta = await this.alertCtrl.create({
            animated: true,
            backdropDismiss: true,
            cssClass: "dark",
            translucent: true,
            message: "Error al iniciar sesión",
            buttons: ["Cerrar"]
          });
          await alerta.present();
        }
      });
    });
  }

  public facebookLogin(): Promise<any>{
    const that=this;
    return new Promise(function (resolve, reject) {
      var browserRef = that.iab.create(
        //"https://accounts.google.com/o/oauth2/v2/auth?client_id=784319917269-6811tfseavf33tueugmplf61isf55fvq.apps.googleusercontent.com&response_type=token&redirect_uri=http://localhost/callback&scope=https://mail.google.com/&disallowed_useragent",
        "https://github.com/login/oauth/authorize?client_id=0004872c1bd0dd5286ba&redirect_uri=http://localhost/callback",
        "",
        {
          clearcache:"yes",
          clearsessioncache:"yes",
          fullscreen:"no",
          hidenavigationbuttons:"yes",
          hideurlbar:"yes",
          location:"no",
          toolbar:"no",
          zoom:"no",
        }
      );
      browserRef.on("loadstart").subscribe((event)=>{ 
        //if ((event.url).indexOf("http://localhost/callback#access_token")===0){
        if ((event.url).indexOf("http://localhost/callback?code=")===0){
          browserRef.close();
          var responseParameters = (event.url).split("?")[1].split("=")[1]
          var parsedResponse = {};
          parsedResponse["code"] = responseParameters;
          if (parsedResponse["code"] !== undefined && parsedResponse["code"] !== null) {
            resolve(parsedResponse);
          } else {
            reject(1);
          }
        }
      });
      browserRef.on("exit").subscribe((event)=>{
        console.log(JSON.stringify(event));
        reject(0);
      });
    });
  }

}
