import withSourceView from '@/hooks/withSourceView';
import { produce } from 'immer';
import { create } from 'zustand';

/*

  zustand immer 연동 기본 예시

*/
const profileInitailState = {
  name: 'ays',
  authList: ['R', 'W'],
  deptInfo: {
    asName: 'asDevelop',
    name: 'develop',
  },
};

const initailState = {
  rootName: 'yamdeng',
  profile: profileInitailState,
};

const useTestStore = create<any>((set, get) => ({
  ...initailState,

  writeLog: (fnName) => {
    console.log(`call function name : ${fnName}`);
    const profile = get().profile;
    console.log(`profile.name : ${profile.name}`);
  },

  changeProfileName: (newName) => {
    set(
      produce((state: any) => {
        state.profile.name = newName + 'good';
      })
    );
    get().writeLog('changeProfileName');
  },

  changeProfileDeptName: (newDeptName) =>
    set(
      produce((state: any) => {
        state.profile.deptInfo.name = newDeptName + 'good';
      })
    ),

  changeRootName: (name) => {
    set(
      produce((state: any) => {
        state.rootName = name + ' > root';
      })
    );
    get().writeLog('changeProfileName');
  },

  clearStore: () =>
    set(() => ({
      profile: {
        name: 'test',
        authList: ['D'],
        deptInfo: {
          asName: 'test',
          name: 'test',
        },
      },
    })),
  clearDirect: () => {
    useTestStore.getState().clearStore();
  },
  clearStoreByInitData: () =>
    set(() => ({
      profile: profileInitailState,
    })),
  clearStoreByInitDataAll2: () => set(() => initailState),
  clearStoreByInitDataAll: () => set(initailState), // 이것도됨
}));

function ZustandGuideImmer() {
  console.log('ZustandGuideImmer render');

  const {
    profile,
    rootName,
    changeProfileName,
    changeProfileDeptName,
    changeRootName,
    clearStore,
    clearStoreByInitData,
  } = useTestStore();

  console.log(clearStore);
  console.log(clearStoreByInitData);

  return (
    <div>
      <div>
        <p>profile : {JSON.stringify(profile)}</p>
        <p>rootName : {rootName}</p>
        <div>
          <p>
            <button className="button" onClick={() => changeProfileName('안용성2')}>
              changeProfileName
            </button>
          </p>
          <p>
            <button className="button" onClick={() => changeProfileDeptName('develop')}>
              changeProfileDeptName
            </button>
          </p>
          <p>
            <button className="button" onClick={() => changeRootName('yamdeng2')}>
              changeRootName
            </button>
          </p>
          <p>
            <button className="button" onClick={() => clearStoreByInitData()}>
              clearStoreByInitData
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default withSourceView(ZustandGuideImmer);
