import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export function Button({ onClick }) {
  return (
    <Btn type="button" onClick={onClick}>
      Load More
    </Btn>
  );
}

Button.propType = {
  onClick: PropTypes.func.isRequired,
};
