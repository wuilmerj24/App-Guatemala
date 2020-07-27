import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-promocion',
  templateUrl: './detalle-promocion.page.html',
  styleUrls: ['./detalle-promocion.page.scss'],
})
export class DetallePromocionPage implements OnInit {
  @Input() id: string;
  @Input() title: string;
  @Input() price: string;
  @Input() address: string;
  @Input() latitude: string;
  @Input() longitude: string;
  @Input() created_at: string;
  @Input() update_at: string;
  constructor(
    private modalCtrl:ModalController,
  ) { }

  ngOnInit() {
  }

  back(){
    this.modalCtrl.dismiss();
  }

}
