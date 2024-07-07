import useSecondStore from '@/stores/guide/useSecondStore';

export default function SecondStoreTest() {
  console.log('SecondStoreTest render');

  const { name, changeName, age, changeAge } = useSecondStore();

  return (
    <div>
      SecondStoreTest test
      <br />
      <p>name : {name}</p>
      <p>age : {age}</p>
      <p>
        <button className="button" onClick={() => changeName('ays2')}>
          changeName
        </button>
      </p>
      <p>
        <button className="button" onClick={() => changeAge(28)}>
          changeAge
        </button>
      </p>
    </div>
  );
}
