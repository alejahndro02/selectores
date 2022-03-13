import { Component, 
         OnInit               } from '@angular/core';
import { FormBuilder, 
         FormGroup, 
         Validators           } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisesSmall          } from '../../interface/paises';
import { PaisesServiceService } from '../../service/paises-service.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: []
})
export class SelectorComponent implements OnInit {

  miformulario: FormGroup = this.fb.group({
    region:['', Validators.required],
    pais  :['', Validators.required]
  })
// llenar los selectores
  regiones:string[] = []
  paises:PaisesSmall[]=[]

  constructor(  private fb: FormBuilder, 
                private paisesService: PaisesServiceService ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones

    // Cuando cambie la reion 
    // Este codio es rempalzado con los operadores rxjs
    /*this.miformulario.get('region')?.valueChanges
        .subscribe(region => {
          console.log(region);
          this.paisesService.getPaisesPorRegion(region)
              .subscribe(paises => {
                console.log(paises);
                this.paises = paises
              })
        }
      )*/
    this.miformulario.get('region')?.valueChanges
        .pipe(
          //Con (_) es una nomenctura para indicar que no me interesa lo que viene por ese valor  
          tap( (_) => {
            this.miformulario.get('pais')?.reset('');
          }),
          switchMap(region => this.paisesService.getPaisesPorRegion(region) )
        )
        .subscribe(paises => {
          console.log(paises);
          this.paises = paises
        })
  }

  guardar(){
    console.log('click', this.miformulario.value);
  }

}
