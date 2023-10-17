import Component from "../core/Component.js";

export default class ColorText extends Component {
  setup() {
    this.$state = {
      prompt: "",
    };
  }
  constructor($target, props, prompt) {
    super($target, props);
  }

  template() {
    return `
      <div class="colorText">
        <h4 style="font-weight:bold">당신의 포켓몬을<br/> <span style="color: #91EAE4";>text</span>로 만들어주세요!🎨🪄</h4>
        <p>
            Ex) Paint the character's body blue. ,<br/>
            Paint the character's eyes green. ,<br/>
            Paint the character's belly yellow. , ...
        </p>
        <label for="prompt">Prompt :</label>
        <input type="text" id="prompt" name="prompt" value="Paint the character's" placeholder="Paint the character's" size=70"/>
        <a id="pokeball">
            <img id="submit-img" src="../img/pokeball.png">
        </a>
      </div>
        `;
  }

  setEvent() {
    // input받은 내용 prompt에 저장
    this.addEvent("input", "input", (event) => {
      const prompt = event.target.value;
      this.setState({ prompt });
    });
  }

  mounted() {
    const pokeballElement = this.$target.querySelector("#pokeball");
    const id = this.$props.imageId;
    // 추후 프롬프트를 백으로 보내는 코드로 수정
    pokeballElement.addEventListener("click", () => {
      history.pushState(
        {
          data: this.$props,
          prompt: this.$state.prompt,
        },
        null,
        window.location.href.replace(`create/${id}`, "result")
      );
      history.go(0);
    });
  }
}
