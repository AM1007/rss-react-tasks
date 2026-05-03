import { Component } from 'react';
import Header from './components/Layout/Header';
import Main from './components/Layout/Main';
import Search from './components/Search/Search';
import Results from './components/Results/Results';
import { searchCharacters } from './api/stapi';
import { getSearchTerm, setSearchTerm } from './utils/storage';
import type { SearchResult } from './types/character';

interface AppState {
  searchTerm: string;
  data: SearchResult | null;
  isLoading: boolean;
  error: string | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: getSearchTerm(),
      data: null,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCharacters(this.state.searchTerm);
  }

  fetchCharacters = async (term: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const result = await searchCharacters({ name: term || undefined });
      this.setState({ data: result, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      this.setState({ error: message, isLoading: false });
    }
  };

  handleSearch = (term: string) => {
    setSearchTerm(term);
    this.setState({ searchTerm: term });
    this.fetchCharacters(term);
  };

  render() {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <Main>
          <section className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Search initialValue={this.state.searchTerm} onSearch={this.handleSearch} />
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Results
              data={this.state.data}
              isLoading={this.state.isLoading}
              error={this.state.error}
            />
          </section>
        </Main>
      </div>
    );
  }
}

export default App;
