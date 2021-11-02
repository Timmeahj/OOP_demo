import Pokemon from "./Pokemon";

export default class Converter {
    baseUrl = "https://pokeapi.co/api/v2/";
    speciesQuery = "pokemon-species/";
    pokeQuery = "pokemon/";

    constructor() {}

    async toPokemon(apiData){
        const name = apiData.name;
        let moves = [];
        if(apiData.moves.length){
            moves = this.pickMoves(apiData.moves);
        }
        const sprite = apiData.sprites.front_default;
        const id = apiData.id;
        let types = [];
        if(apiData.types.length){
            types = this.fixTypes(apiData.types);
        }
        let evolutions = await this.fixEvolutions(apiData.id);
        return new Pokemon(name, moves, sprite, id, types, evolutions);
    }

    async getSpecies(id){
        return await fetch(this.baseUrl + this.speciesQuery + id);
    }

    async getEvolutions(id){
        const speciesPromise = await this.getSpecies(id);
        const speciesData = await speciesPromise.json();
        const chain = await fetch(speciesData.evolution_chain.url);
        return chain;
    }

    fixTypes(types){
        let finalTypes = [];
        for (let i = 0; i < types.length; i++){
            finalTypes.push(types[i].type.name);
        }
        return finalTypes;
    }

    async fixEvolutions(id){
        let evolutions = [];
        const data = await this.getEvolutions(id);
        const chain = await data.json();
        evolutions.push(chain.chain.species.name);
        if(chain.chain.evolves_to.length){
            for(let i = 0; i < chain.chain.evolves_to.length; i++){
                evolutions.push(chain.chain.evolves_to[i].species.name);
                if(chain.chain.evolves_to[i].evolves_to.length){
                    for(let j = 0; j < chain.chain.evolves_to[i].evolves_to.length; j++){
                        evolutions.push(chain.chain.evolves_to[i].evolves_to[j].species.name);
                    }
                }
            }
        }
        return evolutions;
    }

    async getPokemon(query){
        return await fetch(this.baseUrl + this.pokeQuery + query);
    }

    pickMoves(moves){
        // pick 4 random moves
        this.shuffle(moves);
        const movesArr = moves.slice(0, 4);
        let finalMoves = [];
        for (let i = 0; i < movesArr.length; i++){
            finalMoves.push(movesArr[i].move.name);
        }
        return finalMoves;
    }

    shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
}

//module.exports = Converter
//export {Converter};