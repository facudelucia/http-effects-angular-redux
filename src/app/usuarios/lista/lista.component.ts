import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuarios } from 'src/app/store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {
  usuarios: Usuario[] = []
  loading: boolean = false
  error!: any
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('usuarios')
      .subscribe(({ users, loading, error }) => {
        if (loading === false && users.length === 0) {
          this.error = true
          return
        }
        this.error = false
        this.usuarios = users
        this.loading = loading

      })
    this.store.dispatch(cargarUsuarios())
  }

}
