import { useNavigate } from 'react-router-dom';

export const useMovePage = () => {
  const navigate = useNavigate();

  const movePage = (path, checkedNewTab) => {
    if (checkedNewTab) {
      window.open(path);
    } else {
      navigate(path);
    }
  };

  return movePage;
};
