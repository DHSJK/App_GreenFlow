import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  getCharacters(params: any){
    return this.http.get(environment.baseUrl + environment.character, { params })
  }

  getProductos(params: any){
    return this.http.get(environment.rutaBase + '?nombreFuncion=ObtenerFrutasyVerduras')
  }

  getCharacterById(id: string){
    return this.http.get(environment.baseUrl + environment.character + id)
  }

  getProductoById(id: string){
    return this.http.get(environment.rutaBase + '?nombreFuncion=ObtenerUnaFrutaoVerduraPorId&id=' + id)
  }

  getProductoByNombre(nombre: string){
    return this.http.get(environment.rutaBase + '?nombreFuncion=ObtenerUnaFrutaoVerdura&nombresocial=' + nombre)
  }

  getByUrl(url: string){
    return this.http.get(url)
  }

  usuarioLogin(correo: string, contrasena: string) {
    return lastValueFrom(this.http.post(environment.rutaBase, {
      nombreFuncion: 'UsuarioLogin',
      parametros: [correo, contrasena]
    }));
  }

  usuarioAlmacenar(correo: string, contrasena: string, nombre: string, apellido: string) {
    let that = this;
    return lastValueFrom(that.http.post(environment.rutaBase, {
        nombreFuncion: 'UsuarioAlmacenar',
        parametros:  [correo, contrasena, nombre, apellido]
      }));
  }

  eliminarUsuario(correo: string, contrasena: string){
    let that = this;
    let url = `${environment.rutaBase}?nombreFuncion=EliminarUsuario&correo=${correo}&contrasena=${contrasena}`
    return lastValueFrom(that.http.delete(url))
  }
  
  modificarContrasena(correo: string, contrasenaActual: string, contrasenaNueva: string){
    let that = this;
    return lastValueFrom(that.http.put(environment.rutaBase, {
      nombreFuncion: 'CambiarContrasena',
      parametros: [correo, contrasenaActual, contrasenaNueva]
    }));
  }


}
