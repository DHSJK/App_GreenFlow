import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class DeletePage implements OnInit {

  correo: string = '';
  password: string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private alertController: AlertController,
    private db: DbService
  ) { }

  ngOnInit() {
  }

  async eliminarUsuario(){
    let that = this;
    try {
      const response:any = await that.api.eliminarUsuario(this.correo, this.password);
      if(response.result == 'Usuario borrado' ){
        console.log('PYD: BORRADO');

        that.db.limpiarUsuario();
        that.db.limpiarFavoritos();
        that.mensaje('Usuario Eliminado');
        that.router.navigateByUrl('/login');
              
        that.correo = "";
        that.password = "";
      }else if(response.result == 'Correo o contraseña incorrectos' ){
        that.mensaje('Hay un problema con el usuario o contraseña');
        console.log('FYD: PROBLEMAS DE LOGIN');
      }
      console.log(response);
    } catch (error) {
      // Aquí puedes manejar el error
      console.error(error);
    }
  }

  salir(){
    this.router.navigateByUrl('/principal');
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
