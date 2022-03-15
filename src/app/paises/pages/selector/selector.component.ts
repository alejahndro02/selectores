import { Component, 
         OnInit               } from '@angular/core';
import { FormBuilder, 
         FormGroup, 
         Validators           } from '@angular/forms';
import { Observable, of, switchMap, 
         tap                  } from 'rxjs';

import { Pais, 
         PaisesSmall          } from '../../interface/paises';
import { PaisesServiceService } from '../../service/paises-service.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: []
})
export class SelectorComponent implements OnInit {

  miformulario: FormGroup = this.fb.group({
    region  : ['', Validators.required],
    pais    : ['', Validators.required],
    frontera: ['', Validators.required]
  })
// llenar los selectores
  regiones    : string       []  = []
  paises      : PaisesSmall  []  = []
  // fronteras   : string       []  = []//Se sustituye 
  fronteras   : PaisesSmall  []  = []

  // UI
  cargando:boolean = false

  constructor(  private fb: FormBuilder, 
                private paisesService: PaisesServiceService ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones

    // Cuando cambie la reion 
    // Este codio es rempalzado con los operadores rxjs
    /*this.miformulario.get('region')?.valueChanges
        .subscribe(region => {
          console.log('esta',region);
          this.paisesService.getPaisesPorRegion(region)
              .subscribe(paises => {
                console.log(paises);
                this.paises = paises
              })
        }
      )*/

    this.miformulario.get('region')?.valueChanges
        .pipe(
          //Con (_) es una nomenctura para indicar que no me interesa lo que viene por ese valor  es lo mismo que dejar unicamente ()
          tap( (_) => {
            this.miformulario.get('pais')?.reset('');
            this.cargando=true

            // this.miformulario.get('frontera')?.disable()//este es un ejemeplo de como desabilotdar campos 
            }),
          switchMap(region => this.paisesService.getPaisesPorRegion(region) )
        )
        .subscribe(paises => {
          this.paises = paises
          this.cargando=false

        })

    // Cuando selecciona el pais imrpimra en sonsola el codio de su pais
    this.miformulario.get('pais')?.valueChanges
      .pipe(
        tap( (_)=> {
          this.miformulario.get('frontera')?.reset('')
          this.cargando=true
          // this.miformulario.get('frontera')?.enable()//este es un ejemeplo de como desabilotdar campos 
        }),
        // Se recibe el codigo pasando por el servico inyectando codigo y recibe los datos de un pais 
        switchMap(codigo => this.paisesService.getPaisPorCodigo(codigo)),//esto regresa un pais 
        switchMap(pais => this.paisesService.getPaisesPorCodigo(pais[0]?.borders))
      )
      .subscribe(paises => {
        // console.log(paises[0]?.borders)
        console.log(paises);
        this.fronteras = paises
        
        // Url V3
        // this.fronteras= pais[0]?.borders || [];
        this.cargando=false
        // Url V2
        /*console.log(pais?.borders);
        this.fronteras= pais?.borders || [];*/
      }
    )
  }


  guardar(){
    console.log('click', this.miformulario.value);
  }

}
