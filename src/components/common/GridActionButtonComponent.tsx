function GridActionButtonComponent(props) {
  console.log(props);

  const { data, actionButtons, actionButtonListPath, search } = props;
  const detailId = data.id;
  const restListUri = actionButtonListPath ? actionButtonListPath : location.pathname;
  const detailPagePath = `${restListUri}/${detailId}`;

  const goDetail = () => {
    alert(`detailPagePath : ${detailPagePath}`);
  };

  const deleteById = () => {
    alert(`delete success : ${detailId}`);
    if (search) {
      search();
    }
  };

  const actionComponent = actionButtons.map((actionName, index) => {
    return (
      <>
        <a
          key={index}
          href=""
          onClick={(event) => {
            event.preventDefault();
            if (actionName === 'detail') {
              goDetail();
            } else if (actionName === 'delete') {
              deleteById();
            }
          }}
        >
          {actionName === 'detail' ? 'detail' : 'delete'}
        </a>{' '}
      </>
    );
  });

  return actionComponent;
}

export default GridActionButtonComponent;
