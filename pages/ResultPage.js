import Component from "../core/Component.js";
// import ColorImage from "../components/ColorImage.js";

export default class ResultPage extends Component {
  // 추후 결과값을 불러오는 코드 추가 예정
  setup() {
    this.$props = {
      pokemonName: history.state.pokemonName,
    };
  }

  template() {
    const props =this.$props.pokemonName;
    return `
      <div class="result">
        <div class="img-compelete">
          <img id="colorImage" src="../data/testB/0007.jpg">
          <h1 id="pokemonName">${props}</h1>
        </div>
      </div>  
    `;
  }

  mounted() {
    // 이부분은 아직은 필요없을 것 같습니다.
    // const $colorImage = this.$target.querySelector("#colorImage");
    //new ColorImage($colorImage, this.$props);
  }
}
