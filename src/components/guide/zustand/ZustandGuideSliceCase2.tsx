import withSourceView from '@/hooks/withSourceView';
import { create } from 'zustand';
import { createListSlice } from '@/stores/slice/testSlice';

/*

  zustand slice 예시 2

*/

const useListSliceTestStore = create<any>((set, get) => ({
  ...createListSlice(set, get),
  currentPage: 20,
  changePageSize: (pageSize) => {
    console.log('custom changePageSize call');
    alert(pageSize);
    set({ pageSize: pageSize, currentPage: 1 });
    get().search();
  },
}));

function ZustandGuideSliceCase2() {
  console.log('ZustandGuideSliceCase2 render');

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

export default withSourceView(ZustandGuideSliceCase2);
