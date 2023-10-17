import Component from "../core/Component.js";

export default class Search extends Component {
  setup() {
    this.$state = {};
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
    <p>Ex) 피카츄, 꼬부기, 이브이, ..</p>      
    `;
  }

  setEvent() {
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

    for (let i = 0; i < list.length; i++) {
      const pokemonName = list[i].getElementsByClassName("pokemon-name")[0];
      const nameText = pokemonName.textContent.toLowerCase();

      if (nameText.includes(search)) {
        list[i].style.display = "block";
      } else {
        list[i].style.display = "none";
      }
    }
  }
}