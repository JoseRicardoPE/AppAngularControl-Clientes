import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = {
    nombre: '', 
    apellido: '',
    email: '', 
    saldo: 0
  }

  id: string;

  constructor(
    private clienteServicio: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteServicio.getCliente(this.id)
      .subscribe( (data: Cliente) => this.cliente = data);
  }
  guardar({value, valid}: {value: Cliente, valid: boolean}) {
    if (!valid) {
      Swal.fire({
        icon: "error",
        text: "¡Debe diligenciar todos los campos antes de guardar!"
      }) ;
    } else {
      value.id = this.id;
      this.clienteServicio.modificarCliente(value);
      this.router.navigate(["/"]);
    }
  }
  eliminar() {
    let mensaje = confirm("¿Seguro que desea eliminar el cliente?");
    if (mensaje) {
      this.clienteServicio.eliminarCliente(this.cliente);
      this.router.navigate(["/"]);
    }
  }
}
