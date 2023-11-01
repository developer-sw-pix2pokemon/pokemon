import Component from "../core/Component.js";

export default class Category extends Component {
  setup() {
    this.$state = {
      selectedCategory: null, // 추가: 선택된 카테고리를 저장하는 상태 변수
    };

  }
  template() {
    return `
    <p>Category</p>
    <div class="att-button">
      <button id="btn1">불</button>
      <button id="btn2">물</button>
      <button id="btn3">풀</button>
      <button id="btn4">독</button>
      <button id="btn5">벌레</button><br />
      <button id="btn6">비행</button>
      <button id="btn7">드래곤</button>
      <button id="btn8">악</button>
      <button id="btn9">전기</button>
      <button id="btn10">얼음</button><br />
      <button id="btn11">땅</button>
      <button id="btn12">강철</button>
      <button id="btn13">페어리</button>
      <button id="btn14">격투</button>
      <button id="btn15">바위</button><br />
      <button id="btn16">에스퍼</button>
      <button id="btn17">고스트</button>
      <button id="btn18">노말</button>
    </div> 
    `;
  }
  setEvent() {
    this.addEvent('click', '.att-button > button', ({ target }) => {
      const category = target.textContent;
      this.$state.selectedCategory = category;
      this.notify(); // 상태 변경을 알림
    });
  }

  getSelectedCategory() {
    return this.$state.selectedCategory;
  }

  notify() {
    const notifyEvent = new Event('notify'); // 새 이벤트 생성
    this.$target.dispatchEvent(notifyEvent); // 이벤트 발생
  }
}
