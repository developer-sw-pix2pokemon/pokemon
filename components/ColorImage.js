import Component from "../core/Component.js";

export default class ColorImage extends Component {
    constructor($target, props) {
        super($target, props);
    }

    template() {
        return `
            <img id="colorImage" src="">
        `;
    }

    setEvent() {
        const imageID = this.$props.imageId;

        if (imageID && /^\d{4}$/.test(imageID)) {
            const imageUrl = `./data/testA/${imageID}.jpg`;
            const colorImage = document.getElementById("colorImage");
            colorImage.src = imageUrl;
          }
    }
}
