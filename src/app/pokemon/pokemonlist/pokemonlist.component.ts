import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interfaces/pokemon.interfaces';

@Component({
  selector: 'app-pokemonlist',
  templateUrl: './pokemonlist.component.html',
  styleUrls: ['./pokemonlist.component.css']
})
export class PokemonlistComponent implements OnInit {
  pokemons: Pokemon[] = [];
  page: number = 0;
  search: string = '';
  constructor(private pokemon: PokemonService) { }

  ngOnInit(): void {

    this.pokemon.getPokemons()
      .subscribe(resp =>
        this.pokemons = resp);
  }

  nextPage() {

    this.page += 5;

  }

  prevPage() {
    if (this.page > 0) {
      this.page -= 5
    }
  }

  onSearchPokemon(search: string) {
    this.page = 0;
    this.search = search
  }
}
