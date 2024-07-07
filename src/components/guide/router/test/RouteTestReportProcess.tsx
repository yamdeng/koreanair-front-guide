import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Tab1(props: any) {
  console.log('Tab1 Component Render');
  const { name } = props;
  return <p>Tab1 : {name}</p>;
}

function Tab2(props: any) {
  console.log('Tab2 Component Render');
  const { name } = props;
  return <p>Tab2 : {name}</p>;
}

function Tab3(props: any) {
  console.log('Tab3 Component Render');
  const { name } = props;
  return <p>Tab3 : {name}</p>;
}

function RouteTestReportProcess() {
  const navigate = useNavigate();

  return (
    <>
      <div>RouteTestReportProcess</div>
      <button
        className="button"
        onClick={() => {
          navigate('tab1');
        }}
      >
        tab1
      </button>
      <button
        className="button"
        onClick={() => {
          navigate('tab2');
        }}
      >
        tab2
      </button>
      <button
        className="button"
        onClick={() => {
          navigate('tab3');
        }}
      >
        tab3
      </button>
      <Routes>
        {/* <Route path="" element={<Tab1 name="항공안전" />} /> */}
        <Route path="tab1" element={<Tab1 name="항공안전" />} />
        <Route path="tab2" element={<Tab2 name="산업안전" />} />
        <Route path="tab3" element={<Tab3 name="통합안전" />} />
      </Routes>
    </>
  );
}

export default RouteTestReportProcess;
