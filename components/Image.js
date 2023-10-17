import Component from "../core/Component.js";

export default class Image extends Component {
  template() {
    return `
        <img id="image" src="">
      `;
  }

  setEvent() {
    const imageID = this.$props.imageId;
    const imageUrl = `../data/testA/${imageID}.jpg`;
    const image = document.getElementById("image");
    image.src = imageUrl;
  }
}
