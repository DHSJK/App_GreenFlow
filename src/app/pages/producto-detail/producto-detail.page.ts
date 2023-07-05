import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController , MenuController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.page.html',
  styleUrls: ['./producto-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class ProductoDetailPage implements OnInit {

  productoId: string = '';
  producto = null as any;
  nombreSocial: string = '';
  temporada: string = '';
  origen: string = '';
  categoria: string = '';
  imagen: string = '';
  duracion: string = '';
  id: string = '';
  zona: string = '';
  tamano: string = '';
  nombreCientifico: string = '';

  constructor(
    private actRoute: ActivatedRoute,
    private api: ApiService,
    private db: DbService,
    private router: Router,
    private alertController: AlertController,
    private menuCtrl: MenuController,
  ) { 
    this.actRoute.queryParams.subscribe(params => {
      const myParam = params['myParam'];
      this.productoId = myParam;
      console.log('ID ENTREGADO: ',myParam);
      console.log(this.productoId);
  });
  }

  ngOnInit() {
    
}

openMenu() {
  this.menuCtrl.open();
}
homeProductos(){
  this.router.navigateByUrl('/productos');
}

verPerfil(){
  this.router.navigateByUrl('/delete');
}

delete(){
  this.router.navigateByUrl('/delete');
}

cambiarContrasena(){
  this.router.navigateByUrl('/cambiar-contrasena');
}

irFavoritos(){
  this.router.navigateByUrl('/favoritos');
}


  ionViewWillEnter() {
    this.getProducto()
  }

  getProducto(){
    
    this.api.getProductoById(this.productoId).subscribe({

      next: (res: any) => {
        
        
        this.producto = res.result[0];
        this.id = res.result[0].ID;
        this.nombreSocial = res.result[0].NOMBRE_SOCIAL;
        this.temporada = res.result[0].TEMPORADA;
        this.origen = res.result[0].ORIGEN;
        this.categoria = res.result[0].CATEGORIA;
        this.imagen = res.result[0].IMAGEN;
        this.duracion = res.result[0].DURACION;
        this.zona = res.result[0].ZONA;
        this.tamano = res.result[0].TAMANO;
        this.nombreCientifico = res.result[0].NOMBRE_CIENTIFICO;        
        
        console.log('ID', this.id);
        console.log('Producto', this.producto);
        console.log('NOMBRE SOCIAL', this.nombreSocial);
        console.log('TEMPORADA', this.temporada);
        console.log('ORIGEN', this.origen);
        console.log('CATEGORIA', this.categoria);
        console.log('IMAGEN', this.imagen);
        console.log('DURACION', this.duracion);
        
      },
      error: (error: any) => {

      }
    })
  }

  addFavorito(){
    this.Favorito(this.id, this.nombreSocial,this.temporada, this.origen, this.categoria, this.imagen, this.duracion)
    this.router.navigateByUrl('/favoritos');
  }

  async Favorito(id: string, nombreSocial: string, temporada: string, origen: string, categoria: string, imagen: string, duracion: string){

      await this.db.addFavoritos(id, nombreSocial, temporada, origen, categoria, imagen, duracion)
  }

  async eliminarFavorito(nombreSocial: string){
    await this.db.eliminarFavorito(nombreSocial)
    this.router.navigateByUrl('/favoritos');

  }

  async mensaje(msg: any) {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  
}
