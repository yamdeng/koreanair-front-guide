import withSourceView from '@/hooks/withSourceView';
import useGuideTestStore from '@/stores/guide/useGuideTestStore';
import { changeName, logProfile } from '@/utils/TestUtil';

/*

  util, service 레이어에서 zustand store 사용 예시

*/

function ZustandGuideUtilUse() {
  console.log('ZustandGuideUtilUse render');

  const name = useGuideTestStore((state) => state.name);
  const profile = useGuideTestStore((state) => state.profile);
  const changeProfile = useGuideTestStore((state) => state.changeProfile);

  return (
    <div>
      <div>
        <p>profile : {profile ? JSON.stringify(profile) : 'no profile'}</p>
        <p>name : {name}</p>
        <div>
          <p>
            <button className="button" onClick={() => changeName('안용성2')}>
              changeName
            </button>
          </p>
          <p>
            <button className="button" onClick={() => changeProfile({ name: '안용성7' })}>
              changeProfile
            </button>
          </p>
          <p>
            <button className="button" onClick={() => logProfile()}>
              logProfile
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default withSourceView(ZustandGuideUtilUse);
