import { useState } from 'react';
import withSourceView from '@/hooks/withSourceView';
import { produce } from 'immer';
import { immerTestObject } from '@/data/grid/example-data-new';

/*

  immer 라이브러리 사용예시 : 가능하면 방식은 불변 자료구조를 사용하는 방식으로 해야함
   -object

*/
function UtilGuideImmerObjectCase() {
  const [testObject, setTestObject] = useState(immerTestObject);

  const changeAddressZipCode = () => {
    const newTestObject = produce(testObject, (draft) => {
      draft.address.detail.zipCode = '000';
    });
    setTestObject(newTestObject);
  };

  const addChildren = () => {
    // 일반적인 추가하는 예제
    // setTestObject({
    //   ...testObject,
    //   children: [...testObject.children, { name: 'child3', description: 'description3' }],
    // });

    // immer을 사용하는 예제
    const newTestObject = produce(testObject, (draft) => {
      draft.children.push({
        name: 'child3',
        description: 'description3',
      });
    });
    setTestObject(newTestObject);
  };

  const changeChildrenNameAll = () => {
    const newTestObject = produce(testObject, (draft) => {
      draft.children.forEach((info) => {
        info.name = info.name + ' update';
      });
    });
    setTestObject(newTestObject);
  };

  const deleteChildrenByName = (name) => {
    const newTestObject = produce(testObject, (draft) => {
      const searchIndex = draft.children.findIndex((info) => info.name === name);
      if (searchIndex !== -1) {
        draft.children.splice(searchIndex, 1);
      }
    });
    setTestObject(newTestObject);
  };

  return (
    <>
      <div>
        <p>
          <button className="button" onClick={changeAddressZipCode}>
            zipcode 변경
          </button>{' '}
          <button className="button" onClick={addChildren}>
            add children
          </button>{' '}
          <button className="button" onClick={changeChildrenNameAll}>
            자식이름 전체변경
          </button>
        </p>
        <div>
          <p>name : {testObject.name}</p>
          <p>address.si : {testObject.address.si}</p>
          <p>address.detail.zipCode : {testObject.address.detail.zipCode}</p>
        </div>
        <div>
          <ul>
            {testObject.children.map((info) => {
              const { name, description } = info;
              return (
                <li key={name}>
                  {name} : {description}{' '}
                  <button className="button button-small" onClick={() => deleteChildrenByName(name)}>
                    삭제
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default withSourceView(UtilGuideImmerObjectCase);
