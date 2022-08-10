import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../helpers/apiService';
import { SearchBar, ImageGallery, Button, Loader, Modal } from 'components';
import { AppWrap } from './App.styled';

const optionsNotify = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    modalInfo: {},
    totalHits: null,
    error: null,
    isLoading: false,
    isOpenModal: false,
  };

  componentDidUpdate = async (_, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      try {
        const response = await api(query, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          totalHits: response.totalHits,
        }));

        if (page === 1 && response.total !== 0)
          toast.success(
            `Hooray! We found ${response.total} images.`,
            optionsNotify
          );

        if (response.total === 0)
          toast.warn(
            `Search for ${query} did not find anything. Try again`,
            optionsNotify
          );
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  onClickImage = obj => {
    this.setState({
      modalInfo: obj,
      isOpenModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      modalInfo: {},
      isOpenModal: false,
    });
  };

  onSubmit = value => {
    if (value.trim() === '') {
      toast.warn('Sorry, Empty search. Please try again.', optionsNotify);
      return;
    }

    this.setState({
      images: [],
      query: value,
      page: 1,
    });
  };

  onClickBtnLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      images,
      isLoading,
      isOpenModal,
      totalHits,
      modalInfo: { largeImageURL, tags },
    } = this.state;

    const isShowBtn =
      images.length !== 0 && images.length !== totalHits && !isLoading;

    return (
      <AppWrap>
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery images={images} getImg={this.onClickImage} />

        {isLoading && <Loader />}

        {isShowBtn && <Button onClick={this.onClickBtnLoadMore} />}

        {isOpenModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={'colored'}
        />
      </AppWrap>
    );
  }
}
