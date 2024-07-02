import _ from 'lodash';

function GridLinkComponent(props) {
  console.log(props);

  const { value, data, linkPath, detailPath, colunm } = props;
  const detailId = detailPath ? _.get(data, detailPath) : colunm.colId;
  const movePagePath = `${linkPath}/${detailId}`;

  const onClick = () => {
    alert(`movePagePath : ${movePagePath}`);
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
