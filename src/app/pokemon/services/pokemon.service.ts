import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemones, Pokemon } from '../interfaces/pokemon.interfaces';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private utl: string = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) { }


  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemones>(`${this.utl}/pokemon?limit=1500`).pipe(
      map(this.transformPokemones)
    )
  }

  private transformPokemones(resp: Pokemones): Pokemon[] {
    const pokemonList: Pokemon[] = resp.results.map(poke => {
      const urlArr = poke.url.split('/');
      const id = urlArr[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      return {
        id,
        pic,
        name: poke.name,

      }
    })
    return pokemonList
  }


}
