import Component from "../core/Component.js";

export default class PokemonItem extends Component {
  constructor($target, pokemon) {
    super($target, pokemon);
  }

  template() {
    const pokemonItems = this.$props.map(({ id, name, att }) => {
      return `
        <div class="PokemonItem" data-id="${id}">
          <a href="/#create/${id}">
            <img src="../data/testB/${id}.jpg" />
            <img src="../data/testA/${id}.jpg" />
            <p class="pokemon-name">이름 : ${name}</p>
            <p class="pokemon-att"> 속성 : ${att}</p>
          </a>
        </div>
      `;
    });

    return pokemonItems.join(""); // 배열을 문자열로 변환
  }

  mounted() {
    this.$target.querySelectorAll(".PokemonItem").forEach((item, index) => {
      const id = this.$props[index].id;
      item.addEventListener("click", (e) => {
        e.preventDefault(); // 기본 링크 동작을 중지
        history.pushState(
          {
            data: this.$props[index],
          },
          null,
          `/#create/${id}` // 변경된 부분: history.pushState 경로 설정
        );
        history.go(0);
      });
    });
  }
}
