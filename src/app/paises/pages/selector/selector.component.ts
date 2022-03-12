import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: []
})
export class SelectorComponent implements OnInit {

  miformulario: FormGroup = this.fb.group({
    region:['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  guardar(){
    console.log(this.miformulario.value);
    
  }

}
