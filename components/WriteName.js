import Component from "../core/Component.js";

export default class WriteName extends Component {
  setup() {
    this.$state = {
      inputName: "",
    };
  }

  template() {
    return `
      <label for="name">Name : <br/></label>
      <input type="text" id="name" name="name" placeholder="나의 포켓몬 이름"/>
      `;
  }

  setEvent() {
    // 입력시 inputName 업데이트
    this.addEvent("input", "input", (event) => {
      event.preventDefault();
      const inputName = event.target.value;
      this.setState({ inputName });
    });
  }
}
