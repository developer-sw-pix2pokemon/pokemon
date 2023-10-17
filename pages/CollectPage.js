import Component from "../core/Component.js";
import pokemons from "../data/pokemons.js";
import Search from "../components/Search.js";
import Category from "../components/Category.js";
import PokemonItem from "../components/PokemonItem.js";
import Pagination from "../components/Pagination.js";

export default class CollectPage extends Component {
  setup() {
    this.$state = pokemons;
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

    const searchComponent = new Search($search, this.$state);
    const categoryComponent = new Category($category); // 카테고리 컴포넌트 생성
    const paginationComponent = new Pagination($pagination);
    const pokemonItemComponent = new PokemonItem($pokemonItem, this.$state);

    // 카테고리 컴포넌트의 상태 변경 시 이벤트 핸들링
    $category.addEventListener("notify", () => {
      this.$state.selectedCategory = categoryComponent.getSelectedCategory();
      this.renderPokemonList(); // 카테고리가 선택될 때 포켓몬 리스트를 다시 렌더링
    });

    // 검색 컴포넌트의 상태 변경 시 이벤트 핸들링
    $search.addEventListener("search", () => {
      this.renderPokemonList();
    });
  }

  // 카테고리에 따라 포켓몬 리스트를 필터링하고 렌더링
  renderPokemonList() {
    const selectedCategory = this.$state.selectedCategory;
    const filteredPokemons = this.$state.filter((pokemon) => {
      if (selectedCategory === null) {
        return true; // 카테고리가 선택되지 않은 경우 모든 포켓몬을 보여줍니다.
      }
      return pokemon.att.includes(selectedCategory);
    });

    // PokemonItem 컴포넌트의 포켓몬 데이터를 업데이트하고 다시 렌더링
    this.$target.querySelector("#pokemonItem").innerHTML = "";
    const pokemonItemComponent = new PokemonItem(
      this.$target.querySelector("#pokemonItem"),
      filteredPokemons
    );
  }
}
