import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { DbService } from 'src/app/services/db.service';

register();

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
  
})
export class ProductosPage implements OnInit {
  
  productos: any[] = [];
  params = {} as any;
  searchTerm: string = '';
  productosFiltrados: any[] = [];

  showSwiper = true;
  showNotFound = false;
  
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(
    private api: ApiService,
    private menuCtrl: MenuController,
    private router: Router,
    private alertController: AlertController,
    private db: DbService
  ) { }

  ngOnInit() {
    this.params.page = 0;
    this.getProductos();
    this.searchTerm = '';
    this.searchProducto(); 
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  async openMenu() {
    if (await this.menuCtrl.isEnabled()) {
      await this.menuCtrl.toggle();
    } else {
      await this.menuCtrl.enable(true);
      await this.menuCtrl.toggle();
    }
  }
  
  async closeMenu() {
    if (await this.menuCtrl.isEnabled()) {
      await this.menuCtrl.toggle();
    }
  }

  resetMenuState() {
    this.menuCtrl.enable(true);
  }

  async delete(){
    await this.closeMenu();
    this.router.navigateByUrl('/delete');
  }

  async cambiarContrasena(){
    await this.closeMenu();
    this.router.navigateByUrl('/cambiar-contrasena');
  }

  async irFavoritos(){
    await this.closeMenu();
    this.router.navigateByUrl('/favoritos');
  }

  getProductos(event?: any){
    this.params.page += 1;
    this.showSwiper = true;

    this.api.getProductos(this.params).subscribe({
      next: (res: any) => {
        this.productos.push(...res.result)
        this.productosFiltrados = this.productos
        console.log(this.productos);

        if(event) event.target.complete();
      },
      error: (error: any) => {
        if(event) event.target.complete();
      }
    })
  }

  navigateToDestinationPage(param: string) {
    this.router.navigate(['/producto-detail'], { queryParams: { myParam: param } });
  }

  searchProducto() {
    if (this.searchTerm.trim() !== '') {
      this.showSwiper = false;
      this.showNotFound = false;
      this.productosFiltrados = this.productos.filter((p: any) =>
        p.NOMBRE_SOCIAL.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      // Verificar si se encontró algún producto
    if (this.productosFiltrados.length <= 0) {
      this.showNotFound = true;
    }
    } else {
      this.productosFiltrados = this.productos;
      this.showSwiper = true;
      this.showNotFound = false;
    }
    console.log('filtrados', this.productosFiltrados);
    console.log('params', this.params);
    console.log('productos', this.productos);
  }

  async cerrarSesion(){
    await this.db.limpiarFavoritos();
    await this.db.limpiarUsuario();
    this.router.navigateByUrl('/login');
  }

  // swiperSliderChanged(e:any){
  //   console.log('changed: ',e);
  // }

  // swiperReady(){
  //   this.swiper = this.swiperRef?.nativeElement.swiper;
  // }

  // goNext(){
  //   this.swiper?.slideNext();
  // }

  // goPrev(){
  //   this.swiper?.slidePrev();
  // }

}




