import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import withSourceView from '@/hooks/withSourceView';
import LocalApiService from '@/services/LocalApiService';
import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';

const initListData = {
  ...listBaseState,
};

const useTemplateTesListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  search: async () => {
    get().changeLoading(true);
    const data: any = await LocalApiService.list({ disableLoadingBar: true });
    get().changeLoading(false);
    set({
      list: data,
    });
  },

  deleteById: async (detailId) => {
    await LocalApiService.delete(detailId);
    alert('삭제완료');
    get().search();
  },

  clear: () => {
    set(initListData);
  },
}));

function TemplateTestList() {
  const navigate = useNavigate();
  const gridApiRef = useRef<any>(null);
  const getGridRef = useCallback((event) => {
    // 외부에서 api 인스턴스를 직접 사용하고 싶을 경우에 사용
    gridApiRef.current = event.api;
  }, []);

  const { search, list, displayTableLoading, deleteById } = useTemplateTesListStore();
  const columns = testColumnInfos;
  columns[0].isLink = true;
  columns[0].linkPath = '/template/tests';

  // custom 컴포넌트 적용
  columns[6].cellRenderer = (params) => {
    const { data } = params;

    const confirmMessage = () => {
      if (confirm('삭제하시겠습니까?')) {
        deleteById(data.id);
      }
    };
    return (
      <>
        <span onClick={confirmMessage}>삭제</span>
      </>
    );
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div>
        <button
          className="button"
          onClick={() => {
            navigate('/template/tests/add/form');
          }}
        >
          add
        </button>
      </div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AppTable rowData={list} columns={columns} displayTableLoading={displayTableLoading} getGridRef={getGridRef} />
      </div>
    </>
  );
}

export default withSourceView(TemplateTestList);
