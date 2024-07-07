import withSourceView from '@/hooks/withSourceView';
import { create } from 'zustand';
import { createListSlice } from '@/stores/slice/testSlice';

/*

  zustand slice 예시 1

*/

const useListSliceTestStore = create<any>((set, get) => ({
  ...createListSlice(set, get),
}));

function ZustandGuideSliceCase1() {
  console.log('ZustandGuideSliceCase1 render');

  const { currentPage, pageSize, changeCurrentPage, changePageSize, list, search, clearStore } =
    useListSliceTestStore();

  return (
    <div>
      <p>currentPage {currentPage}</p>
      <p>pageSize {pageSize}</p>
      <p>list {JSON.stringify(list)}</p>
      <p>
        <button className="button" onClick={() => changeCurrentPage(2)}>
          changeCurrentPage
        </button>
      </p>
      <p>
        <button className="button" onClick={() => changePageSize(50)}>
          changePageSize
        </button>
      </p>
      <p>
        <button className="button" onClick={search}>
          saerch
        </button>
      </p>
      <p>
        <button className="button" onClick={clearStore}>
          clearStore
        </button>
      </p>
    </div>
  );
}

export default withSourceView(ZustandGuideSliceCase1);
