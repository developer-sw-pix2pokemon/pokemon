import Component from "../core/Component.js";
import Image from "../components/Image.js";
import ColorText from "../components/ColorText.js";

export default class CreatePage extends Component {
  setup() {
    this.$props = {
      imageId: history.state.data.id,
      pokemonName: "",
    };
  }

  template() {
    return `
      <div class="create">
        <div class="createPageHeader">
          <h1>Coloring your pokemon</h1>
        </div>
        <div class="create-container">
          <div class="content">
            <div id="writeName">
              <label for="name">Name : <br/></label>
              <input type="text" id="name" name="name" placeholder="나의 포켓몬 이름"/>
            </div>
            <div class="drawing">
              <img id="image" src="">
              <div id="colorText"></div>
            </div>
          </div>
        </div>
      </div>  
    `;
  }

  mounted() {
    const nameBox = document.getElementById("name");
    nameBox.addEventListener("blur", (event) => {
      this.$props.pokemonName = event.target.value;
      sessionStorage.setItem("name", this.$props.pokemonName);
    });

    sessionStorage.setItem("id", this.$props.imageId);

    const $image = this.$target.querySelector("#image");
    new Image($image, this.$props);
    const $colorText = this.$target.querySelector("#colorText");
    new ColorText($colorText, this.$props);
  }
}
