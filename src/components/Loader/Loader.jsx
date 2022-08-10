import { Circles } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrap>
      <Circles
        color=" #303f9f"
        height="50"
        width="50"
        ariaLabel="three-dots-loading"
      />
    </LoaderWrap>
  );
};
