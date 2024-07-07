import withSourceView from '@/hooks/withSourceView';
import { create } from 'zustand';

const useTestStore = create<any>((set) => ({
  profile: {
    name: 'ays',
    authList: ['R', 'W'],
    deptInfo: {
      name: 'develop',
    },
  },

  changeProfileName: (newName) =>
    set((state) => ({
      profile: { ...state.profile, name: newName },
    })),

  changeProfileDeptName: (newDeptName) =>
    set((state) => ({
      profile: {
        ...state.profile,
        deptInfo: { ...state.deptInfo, name: newDeptName },
      },
    })),

  addAuthList: (authName) =>
    set((state) => ({
      profile: {
        ...state.profile,
        authList: [...state.profile.authList, authName],
      },
    })),
}));

function ZustandGuideNestedPropsUpdate() {
  console.log('ZustandGuideNestedPropsUpdate render');

  const profile = useTestStore((state) => state.profile);
  const changeProfileName = useTestStore((state) => state.changeProfileName);
  const changeProfileDeptName = useTestStore((state) => state.changeProfileDeptName);
  const addAuthList = useTestStore((state) => state.addAuthList);

  return (
    <div>
      내부 속성 변경 방법 예시
      <p>name : {profile.name}</p>
      <p>deptInfo : {profile.deptInfo.name}</p>
      <p>authList : {profile.authList}</p>
      <div>
        <button className="button" onClick={() => changeProfileName('ays777')}>
          changeProfileName
        </button>
        <br />
        <button className="button" onClick={() => changeProfileDeptName('ower')}>
          changeProfileDeptName
        </button>
        <br />
        <button className="button" onClick={() => addAuthList('D')}>
          addAuthList
        </button>
      </div>
    </div>
  );
}

export default withSourceView(ZustandGuideNestedPropsUpdate);
