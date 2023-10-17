import Component from "../core/Component.js";

export default class PokemonName extends Component {
    constructor($target, props) {
        super($target, props);
    }

    template() {
        return `
            <h1 id="pokemonName"></h1>
        `;
    }

    setEvent() {
        const pokemonName = this.$props.inputName;
        const pokemonNameElement = document.getElementById("pokemonName");
        pokemonNameElement.innerText = pokemonName;
    }

}