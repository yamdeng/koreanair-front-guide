import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

function GridLinkComponent(props) {
  const navigate = useNavigate();

  const { value, data, linkPath, detailPath, isWindowOpen, column } = props;
  const detailId = detailPath ? _.get(data, detailPath) : _.get(data, column.colId);
  const movePagePath = `${linkPath}/${detailId}`;

  const onClick = () => {
    if (isWindowOpen) {
      window.open(`${linkPath}`);
    } else {
      navigate(`${movePagePath}`);
    }
  };

  return (
    <a
      href=""
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      {value}
    </a>
  );
}

export default GridLinkComponent;
