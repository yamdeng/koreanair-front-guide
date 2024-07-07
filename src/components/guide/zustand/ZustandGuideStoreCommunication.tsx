import withSourceView from '@/hooks/withSourceView';
import FirstStoreTest from './FirstStoreTest';
import SecondStoreTest from './SecondStoreTest';

/*

  zustand store간의 통신하는 방법

*/
function ZustandGuideStoreCommunication() {
  console.log('ZustandGuideStoreCommunication render');

  return (
    <div>
      <FirstStoreTest />
      <SecondStoreTest />
    </div>
  );
}

export default withSourceView(ZustandGuideStoreCommunication);
