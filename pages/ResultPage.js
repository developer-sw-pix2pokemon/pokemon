import Component from "../core/Component.js";
// import ColorImage from "../components/ColorImage.js";
// import PokemonName from "../components/PokemonName.js";

export default class ResultPage extends Component {
  // 추후 결과값을 불러오는 코드 추가 예정
  setup() {
    this.$props = {
      props: history.state.data,
    };
  }

  template() {
    return `
      <div class="result">
        <div class="img-compelete">
          <img id="colorImage" src="../data/testB/0007.jpg">
          <h1 id="pokemonName">AAA</h1>
        </div>
      </div>  
    `;
  }
  mounted() {
    // 이부분은 아직은 필요없을 것 같습니다.
    // const $colorImage = this.$target.querySelector("#colorImage");
    //new ColorImage($colorImage, this.$props);
    // 이부분은 create page에서 입력한 name을 가져와주세요!
    // const $pokemonName = this.$target.querySelector("#pokemonName");
    // new PokemonName($pokemonName, this.$props);
  }
}
