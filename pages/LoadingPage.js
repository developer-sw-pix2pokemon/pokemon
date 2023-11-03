import Component from "../core/Component.js";

export default class LoadingPage extends Component {
  setup() {
    this.$props = {
      loading: true,
    };
  }

  template() {
    return `
      <div class="loading">
        <h2>포켓몬 생성중 ...</h2>
        <img src="../img/pokeball.png" />
      </div>  
    `;
  }

  mounted() {
    this.fetchLoadingState();
  }

  async fetchLoadingState() {
    try {
      const response = await fetch('<<URL>>');
      const data = await response.json();
      this.$props.loading = data.loading;
      if (this.$props.loading) {
        this.showResultPage();
      }
    } catch (error) {
      console.error('Failed to fetch loading state:', error);
    }
  }

  showResultPage() {
    // Assuming the result page is another component
    const resultPage = new ResultPage();
    resultPage.render();
  }
}