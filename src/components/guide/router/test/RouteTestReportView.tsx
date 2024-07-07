import { useParams } from 'react-router-dom';

function RouteTestReportView() {
  const { detailId } = useParams();
  return (
    <>
      <div>RouteTestReportView detailId : {detailId}</div>
    </>
  );
}

export default RouteTestReportView;
