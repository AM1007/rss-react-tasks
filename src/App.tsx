import { Component } from 'react';
import Header from './components/Layout/Header';
import Main from './components/Layout/Main';
import Search from './components/Search/Search';
import { getSearchTerm } from './utils/storage';

interface AppState {
  searchTerm: string;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: getSearchTerm(),
    };
  }

  handleSearch = (term: string) => {
    console.log('Search requested:', term);
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
            <h2 className="mb-2 text-lg font-semibold text-slate-700">Results</h2>
            <p className="text-slate-500">Results section placeholder</p>
          </section>
        </Main>
      </div>
    );
  }
}

export default App;
