import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class CambiarContrasenaPage implements OnInit {

  
  mdl_correo: string = '';
  mdl_newcontra: string = '';
  mdl_oldcontra: string = '';


  constructor(
    private alertController: AlertController,
    private router:Router,
    private loadingCtrl:LoadingController,
    private toastController: ToastController,
    private api:ApiService, 
    private db: DbService,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
  }

  openMenu() {
    this.menuCtrl.open();
  }

  homeProductos(){
    this.router.navigate(['/productos'], { replaceUrl: true });;
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

  async modificar(){
    let that = this;

      if(that.mdl_newcontra.length < 8){
        this.mostrarMensaje('La contraseña debe tener al menos 8 caracteres.');
      }else{
        const data:any = await that.api.modificarContrasena(that.mdl_correo, that.mdl_oldcontra, that.mdl_newcontra);
        console.log(that.mdl_correo, that.mdl_newcontra, that.mdl_oldcontra);
        console.log('MODIFICAR:', JSON.stringify(data))
        
        if(data.result == 'Contraseña cambiada correctamente') {
          that.mostrarMensajeOk('Contraseña Modificada Correctamente.');
          that.db.limpiarUsuario();
          that.limpiar();
          that.router.navigate(['login']);
        }else if (data.result == 'La contraseña actual no es válida') {
          that.mostrarMensaje('Contraseña actual erronea');
        }else {
          that.mostrarMensajeError('Error al Cambiar la contraseña');
        }
      }      
  }

  async mostrarMensajeError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });

    await toast.present();
  }

  async mostrarMensajeOk(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: 'warning'
    });

    await toast.present();
  }



  limpiar() {
    this.mdl_correo='';
    this.mdl_newcontra='';
    this.mdl_oldcontra='';
  }

  async mensaje(msg: any) {
    const alert = await this.alertController.create({
      header: 'Info',
      //subHeader: 'Important message',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
