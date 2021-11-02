export default class Pokemon {
    name;
    moves = [];
    sprite;
    id;
    types = [];
    evolutions = [];

    constructor(name, moves, sprite, id, types, evolutions) {
        this.name = name;
        this.moves = moves;
        this.sprite = sprite;
        this.id = id;
        this.types = types;
        this.evolutions = evolutions;
    }
}

//export {Pokemon};
