import { useSearchParams } from 'react-router-dom';

function RouteTestReportList() {
  const [searchParams] = useSearchParams();
  const pageSize = searchParams.get('pageSize');
  const currentPage = searchParams.get('currentPage');
  console.log(`pageSize : ${pageSize}`);
  console.log(`currentPage : ${currentPage}`);
  return (
    <>
      <div>RouteTestReportList</div>
    </>
  );
}

export default RouteTestReportList;
