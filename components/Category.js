import Component from "../core/Component.js";

export default class Category extends Component {
  setup() {
    this.$state = {
      selectedCategory: null,
    };
  }

  template() {
    const categories = [
      "불",
      "물",
      "풀",
      "독",
      "벌레",
      "비행",
      "드래곤",
      "악",
      "전기",
      "얼음",
      "땅",
      "강철",
      "페어리",
      "격투",
      "바위",
      "에스퍼",
      "고스트",
      "노말",
    ];

    const buttons = categories.map((category, index) => {
      const button = `<button id="btn${index + 1}">${category}</button>`;
      const lineBreak = (index + 1) % 5 === 0 ? "<br />" : "";
      return button + lineBreak;
    });

    return `
    <p>Category</p>
    <div class="att-button">
      ${buttons.join("")}
    </div>
  `;
  }

  setEvent() {
    this.addEvent("click", ".att-button > button", ({ target }) => {
      const category = target.textContent;
      this.$state.selectedCategory = category;
      this.notify();
    });
  }

  getSelectedCategory() {
    return this.$state.selectedCategory;
  }

  notify() {
    const notifyEvent = new Event("notify");
    this.$target.dispatchEvent(notifyEvent);
  }
}
