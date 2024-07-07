import withSourceView from '@/hooks/withSourceView';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

/*

    useShallow 예시
     -용도1 : zustand는 useMemo 대신에 사용하면 됨
     -용도2 : 계산된 값을 사용하고 싶을때 사용함

*/

const useTestStore = create<any>((set, get) => ({
  firstName: 'ahn',
  lastName: 'yongseong',
  age1: 10,
  age2: 20,
  profile: {
    name: 'yamdeng',
    auth: 'READ',
  },
  changeFirstName: (name) => set(() => ({ firstName: name })),
  changeLastName: (name) => set(() => ({ lastName: name })),
  changeAge1: (newAge) => set(() => ({ age1: newAge })),
  changeProfileAuth: (newAuth) => set((state) => ({ profile: { ...state.profile, auth: newAuth } })),
  changeProfile: (newProfile) => set(() => ({ profile: newProfile })),
  getProfileAuth: () => {
    const profile = get().profile;
    const auth = profile.auth;
    return auth;
  },
}));

const Profile = () => {
  console.log('Profile render');

  // 아래 3줄 처럼 사용하면 안됨 : getProfileAuth() ===> 함수 자체가 변경감지 관찰대상이 아님
  //   const getProfileAuth = useTestStore((state) => state.getProfileAuth);
  //   const profileAuth = getProfileAuth();
  //   const profile = useTestStore((state) => state.profile); // getProfileAuth() 함수에서 반환하는 변수를 selector로 감지하면 정상 동작은 하지만 이렇게 사용하면 안됨

  // 아래의 경우는 cache가 안됨
  //   const profile = useTestStore((state) => state.profile);

  // 아래의 경우는 cache 됨 : 참조형 주소값으로 체크하지 않고 내부적으로 깊은 복사로 값을 비교함
  //   const profile = useTestStore(useShallow((state: any) => state.profile));

  // nested 키값을 캐시하는 방식으로 사용할 수 있음
  const profileAuth = useTestStore(useShallow((state: any) => state.profile.auth));
  return (
    <div>
      {/* profileAuth : {profile.auth} */}
      profileAuth : {profileAuth}
      {/* <p>profile : {JSON.stringify(profile)}</p> */}
    </div>
  );
};

const NameAgeInfo = () => {
  console.log('NameAgeInfo render');

  // computed 방식으로 사용할 수 있음
  const ageTotal = useTestStore(
    useShallow((state: any) => {
      return state.age1 + state.age2;
    })
  );

  // 다음과 같이 useShallow를 대입할당 방식으로 사용할 수 있음 : root depth에 선언한 기본타입 변수를 아래와 같이 사용하는 것은 의미가 없음
  const { firstName, lastName } = useTestStore(
    useShallow((state: any) => ({ nuts: state.firstName, honey: state.lastName }))
  );

  // 위와 cache 되는 기준은 동일함
  //   const firstName = useTestStore((state) => state.firstName);
  //   const lastName = useTestStore((state) => state.lastName);

  return (
    <div>
      <p>firstName : {firstName}</p>
      <p>lastName : {lastName}</p>
      <p>ageTotal: {ageTotal}</p>
    </div>
  );
};

const ZustandStateKeyNames = () => {
  console.log('ZustandStateKeyNames render');
  //   const names = useTestStore((state) => Object.keys(state));

  // 아래의 코드 적용시 state 변경시 render가 되지 않음
  const names = useTestStore(useShallow((state) => Object.keys(state)));

  return <div>{names.join(', ')}</div>;
};

function ZustandGuideUseShallow() {
  console.log('ZustandGuideUseShallow render');
  const changeFirstName = useTestStore((state) => state.changeFirstName);
  const changeLastName = useTestStore((state) => state.changeLastName);
  const changeAge1 = useTestStore((state) => state.changeAge1);
  const changeProfileAuth = useTestStore((state) => state.changeProfileAuth);
  const changeProfile = useTestStore((state) => state.changeProfile);

  return (
    <div>
      <p>
        <br />
        <button className="button" onClick={() => changeFirstName('kim')}>
          changeFirstName
        </button>
        <br />
        <button className="button" onClick={() => changeLastName('taeho')}>
          changeLastName
        </button>
        <br />
        <button className="button" onClick={() => changeAge1(200)}>
          changeAge1
        </button>
        <br />
        <button className="button" onClick={() => changeProfileAuth('WRITE')}>
          changeProfileAuth
        </button>
        <br />
        <button
          className="button"
          onClick={() =>
            changeProfile({
              name: '안용성',
              auth: 'ALL',
            })
          }
        >
          changeProfile
        </button>
      </p>
      <ZustandStateKeyNames />
      <NameAgeInfo />
      <Profile />
    </div>
  );
}

export default withSourceView(ZustandGuideUseShallow);
