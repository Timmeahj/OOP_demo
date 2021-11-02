import Pokemon from "./Pokemon";

export default class Renderer {
    target = document.getElementById('target');

    constructor() {}

    resetDiv(){
        this.target.innerHTML = '';
    }

    renderPokemon(pokemon){
        this.wrapText(pokemon.name);
        this.wrapText(pokemon.id);
        this.generateImg(pokemon.sprite);
        for(let i = 0; i<pokemon.moves.length; i++){
            this.wrapText(pokemon.moves[i]);
        }
        for(let i = 0; i<pokemon.types.length; i++){
            this.wrapText(pokemon.types[i]);
        }
    }

    wrapText(text){
        const div = document.createElement('div');
        div.innerText = text;
        this.target.appendChild(div);
    }

    generateImg(url){
        const img = document.createElement('img');
        img.src = url;
        this.target.appendChild(img);
    }
}
