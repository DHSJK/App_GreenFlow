import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class HomePage implements OnInit {

  characters: any[] = [];
  params = {} as any;

  correo: string = '';
  password: string = '';

  constructor(
    private api: ApiService,
    private menuCtrl: MenuController,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  changePass(){
    this.router.navigateByUrl('/cambiar-contrasena')
  }

  delete(){
    this.router.navigateByUrl('/delete');
  }

  getCharacters(event?: any){
    this.params.page += 1;

    this.api.getCharacters(this.params).subscribe({

      next: (res: any) => {
        this.characters.push(...res.results)
        console.log(this.characters);

        if(event) event.target.complete();

      },
      error: (error: any) => {

        if(event) event.target.complete();
      }
    })

  }

  searchCharacters(){
    this.params.page = 1;

    this.api.getCharacters(this.params).subscribe({

      next: (res: any) => {
        this.characters = res.results
      },
      error: (error: any) => {
      }
      
    })
    console.log(this.params);
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
