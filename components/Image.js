import Component from "../core/Component.js";

export default class Image extends Component {
  setEvent() {
    const imageID = this.$props.imageId;
    const imageUrl = `../image/testA/${imageID}.jpg`;
    const image = document.getElementById("image");
    image.src = imageUrl;
  }
}
