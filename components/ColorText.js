import Component from "../core/Component.js";

export default class ColorText extends Component {
  constructor($target, props) {
    super($target, props);
  }

  setup() {
    this.$state = {
      prompt: "",
    };
  }

  template() {
    return `
        <h4 style="font-weight:bold">당신의 포켓몬을<br/> <span style="color: #91EAE4";>text</span>로 만들어주세요!🎨🪄</h4>
        <p>
            Ex) Turn it into blue for the character's head and body.<br/>
            Turn it into green for the character's eyes and body.
        </p>
        <div id="context">
          <label for="prompt">Prompt :</label>
          <input type="text" id="prompt" name="prompt" value="Turn it into"/>
          <a id="pokeball">
              <img id="submit-img" src="../img/pokeball.png">
          </a>
        </div>
        `;
  }

  mounted() {
    const promptBox = document.getElementById("prompt");
    promptBox.addEventListener("blur", (event) => {
      this.$state.prompt = event.target.value;
    });

    const pokeballElement = this.$target.querySelector("#pokeball");
    const id = this.$props.imageId;

    // POST 요청
    pokeballElement.addEventListener("click", async () => {
      try {
        const response = await fetch("/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pokemonId: this.$props.imageId,
            prompt: this.$state.prompt,
          }),
        });

        const data = await response.json();
        console.log(data);

        history.pushState(
          {
            pokemonId: this.$props.imageId,
            pokemonName: this.$props.pokemonName,
            prompt: this.$state.prompt,
          },
          null,
          window.location.href.replace(`create/${id}`, "loading")
        );
        history.go(0);
      } catch (error) {
        console.log("Error: ", error);
      }
    });
  }
}
