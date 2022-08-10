import { useState, useEffect } from 'react';
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

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [modalInfo, setModalInfo] = useState({});
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setIsLoading(true);

    api(query, page)
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.hits]);
        setTotalHits(response.totalHits);

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
      })
      .catch(err => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [page, query]);

  const onClickImage = obj => {
    setModalInfo(obj);
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setModalInfo({});
    setIsOpenModal(false);
  };

  const onSubmit = value => {
    if (value.trim() === '') {
      toast.warn('Sorry, Empty search. Please try again.', optionsNotify);
      return;
    }

    setImages([]);
    setQuery(value);
    setPage(1);
  };

  const onClickBtnLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (error) {
    toast.warn(`Sorry, Error ${error}. Please try again.`, optionsNotify);
  }

  const { largeImageURL, tags } = modalInfo;
  const isShowBtn =
    images.length !== 0 && images.length !== totalHits && !isLoading;

  return (
    <AppWrap>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} getImg={onClickImage} />

      {isLoading && <Loader />}

      {isShowBtn && <Button onClick={onClickBtnLoadMore} />}

      {isOpenModal && (
        <Modal onClose={onCloseModal}>
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

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     images: [],
//     modalInfo: {},
//     totalHits: null,
//     error: null,
//     isLoading: false,
//     isOpenModal: false,
//   };

//   componentDidUpdate = async (_, prevState) => {
//     const { query, page } = this.state;

//     if (prevState.query !== query || prevState.page !== page) {
//       this.setState({ isLoading: true });

//       try {
//         const response = await api(query, page);

//         this.setState(prevState => ({
//           images: [...prevState.images, ...response.hits],
//           totalHits: response.totalHits,
//         }));

//         if (page === 1 && response.total !== 0)
//           toast.success(
//             `Hooray! We found ${response.total} images.`,
//             optionsNotify
//           );

//         if (response.total === 0)
//           toast.warn(
//             `Search for ${query} did not find anything. Try again`,
//             optionsNotify
//           );
//       } catch (error) {
//         this.setState({ error: error.message });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   };

//   onClickImage = obj => {
//     this.setState({
//       modalInfo: obj,
//       isOpenModal: true,
//     });
//   };

//   onCloseModal = () => {
//     this.setState({
//       modalInfo: {},
//       isOpenModal: false,
//     });
//   };

//   onSubmit = value => {
//     if (value.trim() === '') {
//       toast.warn('Sorry, Empty search. Please try again.', optionsNotify);
//       return;
//     }

//     this.setState({
//       images: [],
//       query: value,
//       page: 1,
//     });
//   };

//   onClickBtnLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const {
//       images,
//       isLoading,
//       isOpenModal,
//       totalHits,
//       modalInfo: { largeImageURL, tags },
//     } = this.state;

//     const isShowBtn =
//       images.length !== 0 && images.length !== totalHits && !isLoading;

//     return (
//       <AppWrap>
//         <SearchBar onSubmit={this.onSubmit} />
//         <ImageGallery images={images} getImg={this.onClickImage} />

//         {isLoading && <Loader />}

//         {isShowBtn && <Button onClick={this.onClickBtnLoadMore} />}

//         {isOpenModal && (
//           <Modal onClose={this.onCloseModal}>
//             <img src={largeImageURL} alt={tags} />
//           </Modal>
//         )}

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme={'colored'}
//         />
//       </AppWrap>
//     );
//   }
// }
