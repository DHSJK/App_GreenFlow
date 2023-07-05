import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class CharacterDetailPage implements OnInit {

  characterId: string = '';
  character = null as any;
  episodes: any[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private api: ApiService
  ) { 
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string
    console.log(this.characterId);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCharacter()
  }

  getCharacter(){
    
    this.api.getCharacterById(this.characterId).subscribe({

      next: (res: any) => {

        
        this.character = res;
        this.getEpisodes()
      },
      error: (error: any) => {

      }
    })

  }

  getEpisodes(){

    for(let url of this.character.episode){
    
      this.api.getByUrl(url).subscribe({

        next: (res: any) => {

          console.log(res);
          this.episodes.push(res)
        },
        error: (error: any) => {

        }
      })
    }  

  }
}
