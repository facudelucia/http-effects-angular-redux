import * as usuariosActions from '../actions';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) { }

    cargarUsuarios$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(() =>
                this.usuariosService.getUser().pipe(
                    map((users: any) =>
                        usuariosActions.cargarUsuariosSuccess({ usuarios: users }),
                        catchError((error: Error) => {
                            return of(usuariosActions.cargarUsuariosError({ payload: error }));
                        })
                    )
                )
            )
        )
    )
}