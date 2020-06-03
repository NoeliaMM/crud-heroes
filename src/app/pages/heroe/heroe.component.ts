import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe:HeroeModel;

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) {

    this.heroe=new HeroeModel();
   }

  ngOnInit(): void {

    const id= this.route.snapshot.paramMap.get('id');

    if(id!=='nuevo'){
        this.heroesService.getHeroe(id).subscribe((resp:HeroeModel)=>{
          this.heroe=resp;
          this.heroe.id=id;
        })
    }
  }

  guardar(form:NgForm){

    if (form.invalid){
    console.log("Form  no valido")
    }

    Swal.fire({
      title: 'Espere',
      text:'Guardando informacion',
      icon:'info',
      allowOutsideClick:false
    })

    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id){
      peticion=this.heroesService.actualizarHeroe(this.heroe);
    }else{
      peticion=this.heroesService.crearHeroe(this.heroe);
    }
    
    peticion.subscribe(resp=>{

      Swal.fire({
        title:this.heroe.nombre,
        text:'Se ha guardado correctamente',
        icon:'success'
      })

    })
  }

}
