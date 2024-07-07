import withSourceView from '@/hooks/withSourceView';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/*

  zustand immer middleware 예시

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

const useTestStore = create<any>()(
  immer((set, get) => ({
    ...initailState,

    writeLog: (fnName) => {
      console.log(`call function name : ${fnName}`);
      const profile = get().profile;
      console.log(`profile.name : ${profile.name}`);
    },

    changeProfileName: (newName) => {
      set((state) => {
        state.profile.name = newName + 'good';
      });
      get().writeLog('changeProfileName');
    },

    changeProfileDeptName: (newDeptName) =>
      set((state) => {
        state.profile.deptInfo.name = newDeptName + 'good';
      }),

    changeRootName: (name) => {
      set((state) => {
        state.rootName = name + ' > root';
      });
      get().writeLog('changeProfileName');
    },

    clearStoreByInitData: () =>
      set((state) => {
        state.profile = profileInitailState;
      }),
  }))
);

function ZustandGuideImmerMiddleware() {
  console.log('ZustandGuideImmerMiddleware render');

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

export default withSourceView(ZustandGuideImmerMiddleware);
