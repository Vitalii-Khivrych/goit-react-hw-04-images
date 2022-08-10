import PropTypes from 'prop-types';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ imageURL, tags, onClick }) {
  return (
    <GalleryItem className="gallery-item">
      <GalleryImg src={imageURL} alt={tags} onClick={onClick} />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
