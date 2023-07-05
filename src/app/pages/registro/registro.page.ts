import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class RegistroPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena:string = '';
  mdl_nombre: string = '';
  mdl_apellido:string = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
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

  async registrar(){
    let that = this;
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if(that.mdl_correo==''){
      this.mensaje('Dejo el correo sin completar.')
    }else if(that.mdl_contrasena==''){
      this.mensaje('Dejo la contraseña sin completar.')
    }else if(!emailRegex.test(this.mdl_correo)){
      this.mensaje('Ingrese un correo válido')
    }else if (that.mdl_contrasena.length < 8) {
      this.mensaje('La contraseña debe tener al menos 8 caracteres.');
    }else{
      const data:any = await that.api.usuarioAlmacenar(that.mdl_correo,that.mdl_contrasena,that.mdl_nombre,that.mdl_apellido)
      console.log(data)
      if(data.result == 'OK'){
        that.mensaje('Usuario registrado con éxito.')
        that.router.navigate(['login'])
      }else if(data.result == 'NOK'){
        this.mensaje('Usuario ya registrado.')
      }
    }
  }

  salir(){
    this.router.navigateByUrl('/login');
  }

}
