import Component from "../core/Component.js";

export default class LoadingPage extends Component {
  setup() {
    this.$props = {
      loading: true,
    };
  }

  template() {
    return `
      <div class="loading">
        <h2>포켓몬 생성중 ...</h2>
        <img src="../img/pokeball.png" />
      </div>  
    `;
  }

  mounted() {}
}
