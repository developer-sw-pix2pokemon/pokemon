import Component from "../core/Component.js";
import ColorImage from "../components/ColorImage.js";
import PokemonName from "../components/PokemonName.js";

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
          <img id="colorImage" src="">
          <h1 id="pokemonName"></h1>
        </div>
      </div>  
    `;
  }
  mounted() {
    const $colorImage = this.$target.querySelector("#colorImage");
    new ColorImage($colorImage, this.$props);
    const $pokemonName = this.$target.querySelector("#pokemonName");
    new PokemonName($pokemonName, this.$props);
  }
}
