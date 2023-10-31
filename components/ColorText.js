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
    // input받은 내용 prompt에 저장
    const promptBox = document.getElementById("prompt");
    promptBox.addEventListener("blur", (event) => {
      this.$state.prompt = event.target.value; // 입력이 완료될 때 상태 업데이트
      //console.log(this.$state.prompt); // 상태 확인을 위한 콘솔 출력
    });

    const pokeballElement = this.$target.querySelector("#pokeball");
    const id = this.$props.imageId;
    // 추후 프롬프트를 백으로 보내는 코드로 수정
    pokeballElement.addEventListener("click", () => {
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
    });
  }
}
