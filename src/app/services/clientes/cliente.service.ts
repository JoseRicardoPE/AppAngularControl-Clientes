import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Cliente } from 'src/app/modelo/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDocumento: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection('clientes', referencia => referencia.orderBy('nombre', 'asc'));
  }

  // * Regresar los detalles del cliente
  getClientes(): Observable<Cliente[]> {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map( accion => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      }));
      return this.clientes;
  }
}
