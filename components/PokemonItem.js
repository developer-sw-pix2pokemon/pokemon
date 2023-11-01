import Component from "../core/Component.js";

export default class PokemonItem extends Component {
  constructor($target, pokemon) {
    super($target, pokemon);
  }

  template() {
    const pokemonItems = this.$props.map(({ id, name, att }) => {
      return `
        <div class="PokemonItem" data-id="${id}">
          <a href="">
            <img src="../data/testB/${id}.jpg" />
            <img src="../data/testA/${id}.jpg" />
            <p class="pokemon-name">이름 : ${name}</p>
            <p class="pokemon-att"> 속성 : ${att}</p>
          </a>
        </div>
      `;
    });

    return pokemonItems.join("");
  }

  mounted() {
    // 스크롤 내려감 방지
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }

    this.$target.querySelectorAll(".PokemonItem").forEach((item, index) => {
      const id = this.$props[index].id;
      item.addEventListener("click", (e) => {
        e.preventDefault();
        history.pushState(
          {
            data: this.$props[index],
          },
          null,
          `/#create/${id}`
        );
        history.go(0);
      });
    });
  }
}
