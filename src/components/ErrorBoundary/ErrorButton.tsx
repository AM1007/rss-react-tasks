import { Component } from 'react';

interface ErrorButtonState {
  shouldThrow: boolean;
}

class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = { shouldThrow: false };
  }

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Test error triggered by ErrorButton');
    }

    return (
      <button
        type="button"
        onClick={this.handleClick}
        className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        Trigger error
      </button>
    );
  }
}

export default ErrorButton;
