import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-testdb',
  templateUrl: './testdb.page.html',
  styleUrls: ['./testdb.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TestdbPage implements OnInit {

  value: any ='';
  ciudad: any ='';

  nombreFavorito: any = '';
  tempFavorito: any = '';
  origenFavorito: any = '';
  categFavorito: any = '';
  duracionFavorito: any = '';

  constructor(
    private db: DbService,
    ) { }

  ngOnInit() {
  }

  // async setFavorito1(){
  //   await this.db.addFavoritos('Pera', 'Octubre - Noviembre', 'Nacional', 'Fruta', 'Duracion', 'HTTP')
  // }

  // async setFavorito2(){
  //   await this.db.addFavoritos('Manzana', 'Enero - Ferbero', 'Nacional', 'Fruta','Duracion','HTTP')
  // }

  async limpiar(){
    await this.db.limpiarFavoritos()
  }
  async allFavoritos(){
    const allFavoritos = await this.db.getAllFavoritos();
    console.log(allFavoritos);
  }

  async setValue(){
    await this.db.set('country', 'chile');
    await this.db.set('ciudad', 'santiago');
  }

  async setValue2(){
    await this.db.set('country', 'colombia');
    await this.db.set('ciudad', 'bogota');
  }

  async getValue(){
    this.value = await this.db.get('country');
    this.ciudad = await this.db.get('ciudad');
  }

  async removeValue(){
    await this.db.remove('country');
  }

  async clearStorage(){
    await this.db.clear();
  }
}
