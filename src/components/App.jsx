import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const API_KEY = '40491977-4d771312700760bcb76f7c497';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isLoading: false,
      showModal: false,
      selectedImage: '',
      page: 1,
      query: '',
      totalPages: 0,
    };
  }

  handleSearch = query => {
    this.setState({ query, images: [], page: 1 }, () => this.fetchImages());
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const apiUrl = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false,
          page: prevState.page + 1,
          totalPages: data.total / 12,
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        this.setState({ isLoading: false });
      });
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = selectedImage => {
    if (selectedImage && selectedImage.largeImageURL) {
      this.setState({ showModal: true, selectedImage });
    }
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, isLoading, showModal, selectedImage, page, totalPages } =
      this.state;
    const hasMoreImages = images.length > 0 && !isLoading && page < totalPages;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {hasMoreImages && (
          <Button onClick={this.handleLoadMore} hasMoreImages={hasMoreImages} />
        )}
        {showModal && (
          <Modal
            imageUrl={selectedImage.largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default App;
