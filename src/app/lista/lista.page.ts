import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from "../api.service";
import { Storage } from '@ionic/storage';
import {Promociones} from "../promociones.model";
import { ModalController } from '@ionic/angular';
import {DetallePromocionPage} from "../detalle-promocion/detalle-promocion.page";

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  private promociones:Array<any>=[];
  constructor(
    private platform: Platform,
    private iab: InAppBrowser,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private router: Router,
    private apiService: ApiService,
    private storage: Storage,
    private modalCtrl:ModalController,
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    const token=this.storage.get("token").then(async(token)=>{
      this.apiService.listAll(token).subscribe(async(result)=>{
        if(result['code_error']==0){
          const data=result['data'];
          for(let i:number=0;i<data.length;i++){
            this.promociones.push({
              id:i.toString(), 
              title:data[i].title, 
              price:data[i].price, 
              address:data[i].address, 
              latitude:data[i].latitude, 
              longitude:data[i].longitude, 
              created_at:data[i].created_at,
              updated_at:data[i].updated_at
            });
          }
        }
      },async(error)=>{
        alert(JSON.stringify(error));
      })
    })
  }

  async detalles(item:Promociones){
    const modal = await this.modalCtrl.create({
      component: DetallePromocionPage,
      cssClass: 'detalles-page',
      animated:true,
      backdropDismiss:true,
      componentProps:item,
      swipeToClose:true,
    });
    return await modal.present();
  }
}
