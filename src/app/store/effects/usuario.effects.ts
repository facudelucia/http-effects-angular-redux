import * as usuarioActions from '../actions';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) { }

    cargarUsuario$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(usuarioActions.cargarUsuario),
            mergeMap((action) =>
                this.usuariosService.getUserById(action.id).pipe(
                    map((user: any) =>
                        usuarioActions.cargarUsuarioSuccess({ usuario: user }),
                        catchError((error: Error) => {
                            return of(usuarioActions.cargarUsuarioError({ payload: error }));
                        })
                    )
                )
            )
        )
    )
}