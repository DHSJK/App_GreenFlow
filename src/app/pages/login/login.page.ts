import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class LoginPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena: string = '';
  usuarioLogueado = null as any;

  constructor(
    private api: ApiService,
    private router: Router,
    private alertController: AlertController,
    private db: DbService
    ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
      this.traerUsuario()
    }

  async traerUsuario() {
    try {
      let that = this;
      const usu = await this.db.getUsuario();
      that.usuarioLogueado = usu;
      console.log('aqui?', usu);
      console.log(that.usuarioLogueado);
      if (Object.keys(that.usuarioLogueado).length !== 0) {
        console.log('Tiene datos');
        that.router.navigateByUrl('/productos');
      } else {
        console.log('NO tiene datos');
        that.router.navigateByUrl('/login');
      }
    } catch (error) {
      console.error('Ocurrió un error al traer el usuario:', error);
      // Realiza alguna acción en caso de error, como mostrar un mensaje al usuario o redirigir a una página de error
    }
  }

  async login() {
    let that = this;
    try {
      const response:any = await this.api.usuarioLogin(this.mdl_correo, this.mdl_contrasena);
      if(response.result == 'LOGIN OK' ){
        console.log('PYD: LOGUEADO');
        that.almacenarUsuario(that.mdl_correo, that.mdl_contrasena);
  
        that.router.navigateByUrl('/productos');
        //that.router.navigate(['principal']);        
        that.mdl_correo = "";
        that.mdl_contrasena = "";
      }else if(response.result == 'LOGIN NOK' ){
        that.mensaje('Hay un problema con el usuario o contraseña');
        console.log('FYD: PROBLEMAS DE LOGIN');
      }
      console.log(response);
    } catch (error) {
      // Aquí puedes manejar el error
      console.error(error);
    }
  }

  addUsuario(){
    this.usuario(this.mdl_correo, this.mdl_contrasena)
  }

  async usuario(correo: string, contrasena: string){

      await this.db.addUsuario(correo, contrasena)
  }

  registro(){
    this.router.navigateByUrl('/registro')
  }

  async mensaje(msg: any) {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  //Para almacenar usuario y mantener sesión iniciada
  almacenarUsuario(correo: string, contrasena: string) {
    this.db.addUsuario(correo, contrasena);
  }
   
}
