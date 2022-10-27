import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0,
    // id: ""
  }

  constructor(
    private clientesServicio: ClienteService,
  ) {}

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe( clientes => this.clientes = clientes);
  }

  getSaldoTotal() {
    let saldoTotal:number = 0;
    if (this.clientes) {
      this.clientes.forEach( cliente => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }

  agregarCliente({value, valid}: {value: Cliente, valid: boolean}) {
    if (!valid) {
      Swal.fire({
        icon: "error",
        text: "¡Debe diligenciar todos los campos antes de continuar!"
      })
    } else {

    }
  }
}
