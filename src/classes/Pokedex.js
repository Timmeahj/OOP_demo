export default class Pokedex {
    baseUrl = "https://pokeapi.co/api/v2/";
    pokeQuery = "pokemon/";
    currentPokemon;

    constructor() {
    }

    async getPokemon(query){
        return await fetch(this.baseUrl + this.pokeQuery + query);
    }
}

//module.exports = Pokedex

//export {Pokedex};
