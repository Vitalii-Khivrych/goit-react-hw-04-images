import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components';
import { Gallery } from './ImageGallery.styled';

export function ImageGallery({ images, getImg }) {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          imageURL={webformatURL}
          tags={tags}
          onClick={() => getImg({ largeImageURL, tags })}
        />
      ))}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  largeImageURL: PropTypes.string,
};
