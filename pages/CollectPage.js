import Component from "../core/Component.js";
import pokemons from "../data/pokemons.js";
import Search from "../components/Search.js";
import Category from "../components/Category.js";
import PokemonItem from "../components/PokemonItem.js";
import Pagination from "../components/Pagination.js";

export default class CollectPage extends Component {
  setup() {
    this.$state = {
      pokemons,
      currentPage: 1
    };

  }

  template() {
    return `
      <header class="collectPageHeader">
        <h1>Make Your Pokemon</h1>
        <div id="search"></div>
        <div id="category"></div>
      </header>
      <main class="pokemon-list">
        <div id="pokemonItem"></div>
      </main>
      <div id="pagination"></div>
      `;
  }

  mounted() {
    const $search = this.$target.querySelector("#search");
    const $category = this.$target.querySelector("#category");
    const $pokemonItem = this.$target.querySelector("#pokemonItem");
    const $pagination = this.$target.querySelector("#pagination");

    const searchComponent = new Search($search, this.$state.pokemons);
    const categoryComponent = new Category($category); // 카테고리 컴포넌트 생성
    const paginationComponent = new Pagination($pagination);
    const pokemonItemComponent = new PokemonItem($pokemonItem, this.$state.pokemons);

    // 카테고리 컴포넌트의 상태 변경 시 이벤트 핸들링
    $category.addEventListener("notify", () => {
      this.$state.currentPage =1;
      this.$state.selectedCategory = categoryComponent.getSelectedCategory();
      this.renderPokemonList(); // 카테고리가 선택될 때 포켓몬 리스트를 다시 렌더링
    });

    // 검색 컴포넌트의 상태 변경 시 이벤트 핸들링
    $search.addEventListener("search", () => {
      this.$state.selectedCategory = null;
      this.renderPokemonList();
    });

    paginationComponent.setTotalItemsAndPage(this.$state.pokemons.length);

    const handlePagination = () => {
      this.renderPokemonList();
    };

    const prevButton = $pagination.querySelector("#prev-button");
    const nextButton = $pagination.querySelector("#next-button");

    // 페이지 번호 클릭 시 이벤트 핸들링
    $pagination.addEventListener("click", (e) => {
      if (e.target.classList.contains("pagination-number")) {
        this.$state.selectedCategory = null;
        const pageNumber = parseInt(e.target.textContent, 10);
        this.$state.currentPage = pageNumber
        paginationComponent.changePage(pageNumber);
        handlePagination()
      }
    });

    prevButton.addEventListener("click", () => {
      const currentPage = this.$state.currentPage;
      this.$state.selectedCategory = null;
      if (currentPage > 1) {
        this.$state.currentPage = currentPage - 1; // Update currentPage
        paginationComponent.changePage(this.$state.currentPage);
        handlePagination(this.$state.currentPage);
      }
    });
    nextButton.addEventListener("click", () => {
      const pageCount = paginationComponent.calculatePageCount();

      if (this.$state.currentPage < pageCount) {
        paginationComponent.changePage(this.$state.currentPage + 1);
        this.$state.currentPage = this.$state.currentPage + 1; // Update currentPage
        handlePagination(this.$state.currentPage);
      }
    });


    this.renderPokemonList();
  }

  // 카테고리에 따라 포켓몬 리스트를 필터링하고 렌더링
  renderPokemonList() {
    const selectedCategory = this.$state.selectedCategory;
    const currentPage = this.$state.currentPage;
    const itemsPerPage = 5;

    // 선택된 카테고리에 따라 필터링된 포켓몬 리스트 가져오기
    const filteredPokemons = this.$state.pokemons.filter((pokemon) => {
      if (selectedCategory == null ) {
        return true;
      }
      return pokemon.att.includes(selectedCategory);
    });

    // 현재 페이지에 해당하는 데이터만 추출
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pokemonsToShow = filteredPokemons.slice(startIndex, endIndex);
    // PokemonItem 컴포넌트의 포켓몬 데이터를 업데이트하고 다시 렌더링
    this.$target.querySelector("#pokemonItem").innerHTML = "";
    const pokemonItemComponent = new PokemonItem(
        this.$target.querySelector("#pokemonItem"),
        pokemonsToShow
    );
  }
}
