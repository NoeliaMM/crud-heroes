import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[]=[]
  cargando=false;

  constructor(private heroesService:HeroesService) { }

  ngOnInit(){
    this.cargando=true;
    this.heroesService.getHeroes()
        .subscribe(resp=>{         
          this.heroes=resp;
          this.cargando=false;})
 
  }


  borrarHeroe(heroe:HeroeModel, i:number){

    
    Swal.fire({
      title:'¿Está seguro?',
      text:`Se va a eliminar el héroe ${heroe.nombre} `,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp=>{
      if(resp.value){

        this.heroes.splice(i,1);
        this.heroesService.borrarHeroe(heroe.id).subscribe(resp=>{
    
          Swal.fire({
            title:heroe.nombre,
            text:'Ha sido eliminado',
            icon:'success'
          })
        })
      }
    })


  }
  

}
