import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FavoritosPage implements OnInit {

  value: any ='';
  params = {} as any;

  favorito = null as any;
  nombreSocial: string = '';
  temporada: string = '';
  origen: string = '';
  categoria: string = '';
  duracion: string = '';



  constructor(
    private db: DbService,
    private router: Router,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    
    this.getFavorito();
    const productos = this.favorito;
    console.log('productos???', productos);
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

  async homeProductos(){
    await this.closeMenu();
    this.router.navigateByUrl('/productos');
  }

  async verPerfil(){
    await this.closeMenu();
    this.router.navigateByUrl('/delete');
  }

  async delete(){
    await this.closeMenu();
    this.router.navigateByUrl('/delete');
  }

  async cambiarContrasena(){
    await this.closeMenu();
    this.router.navigateByUrl('/cambiar-contrasena');
  }
  
  irFavoritos(){
    this.router.navigateByUrl('/favoritos');
  }

  ionViewWillEnter() {
    this.getFavorito()
  }
  
  async getFavorito(){
    const fav = await this.db.getAllFavoritos();
    this.favorito = fav;
    console.log('FAV1',fav);
    console.log('FAV 2',this.favorito);

    for (let i = 0; i < fav.length; i++) {
      const elemento = fav[i];
      // Realizar operaciones con el elemento actual
      console.log(elemento.nombreSocial);
      console.log(elemento.temporada);
      // ...
    }
  }

  async allFavoritos(){
    const allFavoritos = await this.db.getAllFavoritos();
    console.log(allFavoritos);
  }

  navigateToDestinationPage(param: string) {
    console.log('ANTES DE IR A FAVORITO ', param);
    this.router.navigate(['/producto-detail'], { queryParams: { myParam: param } });
  }
  
  async eliminarFavorito(nombreSocial: string){
    await this.db.eliminarFavorito(nombreSocial)
  }

  async cerrarSesion(){
    await this.db.limpiarFavoritos();
    await this.db.limpiarUsuario();
    this.router.navigateByUrl('/intro');
  }

}
