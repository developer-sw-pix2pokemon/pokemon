import Component from "../core/Component.js";
import PokemonItem from "./PokemonItem.js";

export default class Search extends Component {
  constructor($target, pokemon) {
    super($target, pokemon);
  }
  template() {
    return `
    <input
      type="text"
      class="searchBox"
      placeholder="포켓몬 이름을 입력해줘.🐣"
    />
    <img
      src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"
    />
    <button id="reset">reset</button>
    <p>Ex) 피카츄, 꼬부기, 이브이, ..</p>      
    `;
  }

  setEvent() {
    // reset 버튼을 눌렀을 때
    this.addEvent("click", "button", () => {
      location.reload(); // 페이지 새로고침
    });
    // 검색 버튼을 눌렀을 때
    this.addEvent("click", "img", (e) => {
      this.filter(); // 검색 함수 호출
    });

    // 엔터 키를 눌렀을 때
    this.addEvent("keydown", "input", (e) => {
      const code = e.code;
      if (code === "Enter") {
        this.filter(); // 검색 함수 호출
      }
    });
  }

  filter() {
    const search = this.$target.querySelector("input").value.toLowerCase();
    const list = document.getElementsByClassName("PokemonItem");

    const matchedData = this.$props.find((pokemon) =>
      pokemon.name.toLowerCase().includes(search)
    );

    if (matchedData) {
      const $pokemonItem = document.getElementById("pokemonItem");
      const newPokemonItem = new PokemonItem($pokemonItem, [matchedData]);
    }
  }
}
