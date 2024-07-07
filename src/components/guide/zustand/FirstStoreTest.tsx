import useFirstStore from '@/stores/guide/useFirstStore';

export default function FirstStoreTest() {
  console.log('FirstStoreTest render');

  const { name, changeName, age, changeAge } = useFirstStore();

  return (
    <div>
      FirstStoreTest test
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
