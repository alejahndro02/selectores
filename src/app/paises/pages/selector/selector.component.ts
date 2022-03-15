import { Component, 
         OnInit               } from '@angular/core';
import { FormBuilder, 
         FormGroup, 
         Validators           } from '@angular/forms';
import { switchMap, 
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
  fronteras   : string       []  = []

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
            }),
          switchMap(region => this.paisesService.getPaisesPorRegion(region) )
        )
        .subscribe(paises => {
          this.paises = paises
        })

    // Cuando selecciona el pais imrpimra en sonsola el codio de su pais
    this.miformulario.get('pais')?.valueChanges
      .pipe(
        tap( (_)=> {
          this.miformulario.get('frontera')?.reset('')
        }),
        switchMap(codigo => this.paisesService.getPaisPorCodigo(codigo))//esto regresa un pais 
      )
      .subscribe(pais => {
        // Url V3
        console.log('das',pais[0]?.borders);
        this.fronteras= pais[0]?.borders || [];

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
