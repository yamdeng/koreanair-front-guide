import { useState } from 'react';
import withSourceView from '@/hooks/withSourceView';
import { produce } from 'immer';
import { immerTestList } from '@/data/grid/example-data-new';

/*

  immer 라이브러리 사용예시 : 가능하면 방식은 불변 자료구조를 사용하는 방식으로 해야함
   -list

*/
function UtilGuideImmerListCase() {
  const [testList, setTestList] = useState(immerTestList);

  const toggleSelected = (index) => {
    const newTestList = produce(testList, (draft) => {
      if (draft[index].isRowSelected) {
        draft[index].isRowSelected = false;
      } else {
        draft[index].isRowSelected = true;
      }
    });
    setTestList(newTestList);
  };

  const toggleSelectedAll = (index) => {
    const newTestList = produce(testList, (draft) => {
      draft.forEach((info, draftIndex) => {
        if (index === draftIndex) {
          if (draft[draftIndex].isRowSelected) {
            draft[draftIndex].isRowSelected = false;
          } else {
            draft[draftIndex].isRowSelected = true;
          }
        } else {
          draft[draftIndex].isRowSelected = false;
        }
      });
    });
    setTestList(newTestList);
  };

  const changeAddressZipCode = (index, newZipCode) => {
    const newTestList = produce(testList, (draft) => {
      draft[index].address.detail.zipCode = newZipCode;
    });
    setTestList(newTestList);
  };

  const deleteListByIndex = (index) => {
    const newTestList = produce(testList, (draft) => {
      draft.splice(index, 1);
    });
    setTestList(newTestList);
  };

  const addList = () => {
    // 일반적인 추가하는 예제
    // setTestList([
    //   ...testList,
    //   {
    //     id: 1,
    //     isRowSelected: false,
    //     name: 'name1',
    //     address: {
    //       si: '김포시',
    //       dong: '오정동',
    //       detail: {
    //         zipCode: '111',
    //         detailAddress: '김포상세1',
    //       },
    //     },
    //   },
    // ]);

    // immer을 이용한 예제
    const newTestList = produce(testList, (draft) => {
      draft.push({
        id: 1,
        isRowSelected: false,
        name: 'name1',
        address: {
          si: '김포시',
          dong: '오정동',
          detail: {
            zipCode: '111',
            detailAddress: '김포상세1',
          },
        },
      });
    });
    setTestList(newTestList);
  };

  return (
    <>
      <div>
        <p>
          <button className="button" onClick={addList}>
            add
          </button>
        </p>
        <ul>
          {testList.map((info, index) => {
            const { name, isRowSelected } = info;
            return (
              <li key={info.name}>
                {name} / selected : {isRowSelected + ''}{' '}
                <button className="button button-small" onClick={() => toggleSelected(index)}>
                  toggle selected
                </button>{' '}
                <button className="button button-small" onClick={() => toggleSelectedAll(index)}>
                  하나만 반영 selected
                </button>{' '}
                <button className="button button-small" onClick={() => changeAddressZipCode(index, '000')}>
                  zipCode 변경
                </button>{' '}
                <button className="button button-small" onClick={() => deleteListByIndex(index)}>
                  삭제
                </button>
                <p>{JSON.stringify(info.address.detail)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default withSourceView(UtilGuideImmerListCase);
