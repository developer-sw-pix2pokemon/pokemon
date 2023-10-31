import pokemons from '../data/pokemons.js';
import Component from "../core/Component.js";

export default class Pagination extends Component {
  setup() {
    this.$state = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: pokemons?.length // 총 아이템 수를 관리
    };
  }

  template() {
    return `
      <button class="pagination-button" id="prev-button" aria-label="Previous page" title="Previous page">&lt;</button>
      <div id="pagination-numbers"></div>
      <button class="pagination-button" id="next-button" aria-label="Next page" title="Next page">&gt;</button>
    `;
  }
  mounted() {
    const paginationNumbers = this.$target.querySelector("#pagination-numbers");
    const prevButton = this.$target.querySelector("#prev-button");
    const nextButton = this.$target.querySelector("#next-button");

    prevButton.addEventListener("click", () => {
      const newPage = this.$state.currentPage - 1;
      if (newPage >= 1) {
        this.changePage(newPage);
      }
    });

    nextButton.addEventListener("click", () => {
      const pageCount = this.calculatePageCount();
      const newPage = this.$state.currentPage + 1;
      if (newPage <= pageCount) {
        this.changePage(newPage);
      }
    });

    paginationNumbers.addEventListener("click", (e) => {
      if (e.target.classList.contains("pagination-number")) {
        const pageNumber = parseInt(e.target.textContent, 10);
        console.log('cc',pageNumber); // 디버깅용 로그
        this.changePage(pageNumber);
      }
    });
  }

  updatePaginationNumbers() {
    const paginationNumbers = this.$target.querySelector("#pagination-numbers");
    paginationNumbers.innerHTML = "";

    const pageCount = this.calculatePageCount();
    for (let i = 1; i <= pageCount; i++) {
      const pageNumber = document.createElement("button");
      pageNumber.className = "pagination-number";
      paginationNumbers.appendChild(pageNumber);
      if (i === this.$state.currentPage) {
        // 이미지 추가
        const pokemonBallImage = document.createElement("img");
        pokemonBallImage.src = "../img/pokeball.png";
        pokemonBallImage.alt = `Page ${i}`;
        pokemonBallImage.width = 30; // 이미지 너비를 80px로 설정
        pokemonBallImage.height = 30; // 이미지 높이를 80px로 설정
        pageNumber.appendChild(pokemonBallImage);
      }else{
        pageNumber.textContent = i;
      }
    }

    this.updatePageButtons();
  }

  calculatePageCount() {
    const { itemsPerPage, totalItems } = this.$state;
    return Math.ceil(totalItems / itemsPerPage);
  }


  changePage(newPage) {
    const pageCount = this.calculatePageCount();
    console.log('newPager',newPage,'pageCount',pageCount)

    if (newPage < 1) {
      newPage = 1;
    } else if (newPage > pageCount) {
      newPage = pageCount;
    }

    this.$state.currentPage = newPage;
    this.updatePageButtons();
    this.updatePaginationNumbers();
  }

  updatePageButtons() {
    const prevButton = this.$target.querySelector("#prev-button");
    const nextButton = this.$target.querySelector("#next-button");
    const { currentPage } = this.$state;

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === this.calculatePageCount();
  }

  // 외부에서 현재 페이지 값을 가져올 수 있는 메소드
  getCurrentPage() {
    return this.$state.currentPage;
  }

  // 외부에서 총 아이템 수와 현재 페이지를 설정할 수 있는 메소드
  setTotalItemsAndPage(totalItems, currentPage = 1) {
    this.$state.totalItems = totalItems;
    this.$state.currentPage = currentPage;
    this.updatePaginationNumbers();
  }
}