import Component from "../core/Component.js";

export default class ResultPage extends Component {
  setup() {}

  template() {
    const name = sessionStorage.getItem("name")
      ? sessionStorage.getItem("name")
      : "";
    const id = sessionStorage.getItem("id");

    return `
      <div class="result">
        <div class="img-compelete">
          <img id="colorImage" src="../result/result_{id}.jpg">
          <h1 id="pokemonName">${name}</h1>
          <button id="homBtn">Home</button>
        </div>
      </div>  
    `;
  }

  mounted() {
    //img download
    const colorImage = document.querySelector("#colorImage");

    colorImage.addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = colorImage.src;
      a.download = "image.jpg";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });

    // go back home
    const backHome = document.querySelector("#homBtn");
    backHome.addEventListener("click", () => {
      window.location.href = "#collect";
      sessionStorage.clear();
    });
  }
}