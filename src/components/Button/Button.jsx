import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { onClick, hasMoreImages } = this.props;

    return (
      <>
        {hasMoreImages && (
          <button type="button" className="load-more" onClick={onClick}>
            Load more
          </button>
        )}
      </>
    );
  }
}

export default Button;
