import { Component } from 'react';

interface SearchProps {
  initialValue: string;
  onSearch: (term: string) => void;
}

interface SearchState {
  value: string;
  lastSubmitted: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: props.initialValue,
      lastSubmitted: props.initialValue,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    const trimmed = this.state.value.trim();
    if (trimmed === this.state.lastSubmitted) {
      return;
    }
    this.setState({ value: trimmed, lastSubmitted: trimmed });
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div className="flex gap-3">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Enter character name"
          className="flex-1 rounded-md border border-slate-300 px-4 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <button
          type="button"
          onClick={this.handleSubmit}
          className="rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
