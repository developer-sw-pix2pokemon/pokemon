import Component from "../core/Component.js";
import WriteName from "../components/WriteName.js";
import Image from "../components/Image.js";
import ColorText from "../components/ColorText.js";

export default class CreatePage extends Component {
  template() {
    return `
      <div class="create">
        <div class="createPageHeader">
          <h1>Coloring your pokemon</h1>
        </div>
        <div class="container">
          <div class="content">
            <div id="writeName"></div>
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
    const $writeName = this.$target.querySelector("#writeName");
    const writeNameComponent = new WriteName($writeName);

    this.$props = {
      imageId: history.state.data.id,
      // inputName: writeNameComponent.$state.inputName,
    };

    const $image = this.$target.querySelector("#image");
    new Image($image, this.$props);
    const $colorText = this.$target.querySelector("#colorText");
    new ColorText($colorText, this.$props);
  }
}
