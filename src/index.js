import Pokedex from './classes/Pokedex';
import Converter from './classes/Converter';
import Renderer from "./classes/Renderer";

const converter = new Converter();
const dex = new Pokedex();
const renderer = new Renderer();

async function searchPoke(query){
    const promise = await dex.getPokemon(query);
    const apiData = await promise.json();
    return await converter.toPokemon(apiData);
}

document.getElementById("run").addEventListener("click", function (){
    renderer.resetDiv();
    searchPoke(document.getElementById("search").value).then(pokemon => {
        dex.currentPokemon = pokemon;
        renderer.renderPokemon(dex.currentPokemon);
        for(let i = 0; i < dex.currentPokemon.evolutions.length; i++){
            searchPoke(dex.currentPokemon.evolutions[i]).then(evo => {
                renderer.renderPokemon(evo);
            });
        }
        console.log(dex.currentPokemon);
    });
});