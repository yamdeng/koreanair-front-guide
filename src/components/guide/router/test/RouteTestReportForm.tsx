import { useParams } from 'react-router-dom';

function RouteTestReportForm() {
  const { detailId } = useParams();

  return (
    <>
      <div>RouteTestReportForm : {detailId}</div>
      <p>{detailId === 'add' ? '신규폼' : '수정폼'}</p>
    </>
  );
}

export default RouteTestReportForm;
