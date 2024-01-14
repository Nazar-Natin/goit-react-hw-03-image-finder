import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    const { image } = this.props;

    if (!image) {
      return null;
    }

    const { id, webformatURL, largeImageURL } = image;

    return (
      <li
        className="gallery-item"
        onClick={() => this.props.onClick({ id, largeImageURL })}
      >
        <img src={webformatURL} alt="" />
      </li>
    );
  }
}

export default ImageGalleryItem;
