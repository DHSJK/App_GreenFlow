import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {



  private _storage: Storage | null = null;
  private favoritos: { [key: string]: {id: string, nombreSocial: string, temporada: string, origen: string, categoria: string, imagen: string, duracion: string} } = {};
  private usuario: { [key: string]: {correo: string, contrasena: string}} = {};

  constructor(
    private storage: Storage,
    private alertController: AlertController
    ) {
    this.init() }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavoritos();
    this.loadUser();
  }

  /* CARGAR ARREGLO USUARIO */
  private async loadUser(){
    const storedUsuario = await this._storage?.get('usuario');
    if (storedUsuario){
      this.usuario = storedUsuario
    }
  }
  /* GUARDAR USUARIO */
  private async saveUsuario(){
    await this._storage?.set('usuario', this.usuario);
  }
  
  /* AGREGAR USUARIO A USUARIO */
  public async addUsuario(correo: string, contrasena: string){
    if (!this.usuario[correo]){
      this.usuario[correo] = { correo, contrasena};
      await this.saveUsuario();
      console.log(`Usuario ${correo} agregado a BD local con éxito`);
    } else {
      console.log(`El usuario ${correo} ya existe.`);
    }
  }

  /* LIMPIAR TABLA USUARIO */
  public async limpiarUsuario() {
    this.usuario = {}; // Vacía el objeto de favoritos
    await this.saveUsuario(); // Guarda la tabla de favoritos vacía en el almacenamiento
    console.log('La tabla de usuario se ha limpiado.');
  }

  /* OBTENER DATOS ARREGLOUSUARIO */
  public async getUsuario(){
    return Object.values(this.usuario);
  }

  /* CARGAR ARREGLO FAVORITOS*/
  private async loadFavoritos(){
    const storedFavorites = await this._storage?.get('favoritos');
    if (storedFavorites){
      this.favoritos = storedFavorites
    }
  }

  /* GUARDAR FAVORITOS */
  private async saveFavoritos(){
    await this._storage?.set('favoritos', this.favoritos);
  }
  /* AGREGAR PRODUCTO A FAVORITOS */
  public async addFavoritos(id: string, nombreSocial: string, temporada: string, origen: string, categoria: string, imagen: string, duracion: string){
    if (!this.favoritos[nombreSocial]){
      this.favoritos[nombreSocial] = { id, nombreSocial, temporada, origen, categoria, imagen, duracion};
      await this.saveFavoritos();
      console.log(`Favorito ${nombreSocial} agregado con éxito`);
      this.mensaje('Se agrego el producto a favoritos.');
    } else {
      console.log(`El favorito ${nombreSocial} ya existe.`);
      this.mensaje('El producto ya existe en favoritos.');
    }
  }

  /* LIMPIAR TABLA FAVORITOS */
  public async limpiarFavoritos() {
    this.favoritos = {}; // Vacía el objeto de favoritos
    await this.saveFavoritos(); // Guarda la tabla de favoritos vacía en el almacenamiento
    console.log('La tabla de favoritos se ha limpiado.');
  }

  /* ELIMINAR PRODUCTO DE FAVORITO */
  public async eliminarFavorito(nombreSocial: string) {
    if (this.favoritos[nombreSocial]) {
      delete this.favoritos[nombreSocial]; // Elimina el producto del objeto de favoritos
      await this.saveFavoritos(); // Guarda la tabla de favoritos actualizada en el almacenamiento
      console.log(`Producto ${nombreSocial} eliminado de favoritos.`);
      this.mensaje('Producto eliminado de favoritos.');
    } else {
      console.log(`El producto ${nombreSocial} no existe en favoritos.`);
      this.mensaje('No existe el producto en favoritos.');
    }
  }

  /* OBTENER FAVORITO POR NOMBRE */
  public async getFavorito(nombreSocial: string){
    return this.favoritos[nombreSocial];
  }

  /* ELIMINAR PRODUCTO DE FAVORITO */
  public async removeFavorito(nombreSocial: string){
    if (this.favoritos[nombreSocial]){
      delete this.favoritos[nombreSocial];
      await this.saveFavoritos();
      console.log(`Favorito ${nombreSocial} eliminado correctamente.`)
    } else {
      console.log(`El favorito ${nombreSocial} no existe.`)
    }
  }

  /* OBTENER TODOS LOS FAVORITOS */
  public async getAllFavoritos(){
    return Object.values(this.favoritos);
  }

  public async set(key: string, value: any){
    let result=await this._storage?.set(key, value);
    console.log(result)
  }

  public async get(key: string){
    let value= await this._storage?.get(key);
    console.log(value)
    return value
  }

  public async remove(key: string){
    let value = await this._storage?.remove(key);
  }

  public async clear(){
    let value = await this._storage?.clear();
  }

  public async keys(key: string){
    let value = await this._storage?.keys();
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
