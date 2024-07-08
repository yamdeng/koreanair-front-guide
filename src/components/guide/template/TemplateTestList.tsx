import withSourceView from '@/hooks/withSourceView';
import AppTable from '@/components/common/AppTable';
import { testColumnInfos } from '@/data/grid/table-column';
import LocalApiService from '@/services/LocalApiService';
import { useEffect, useState } from 'react';
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
    const data: any = await LocalApiService.list({ disableLoadingBar: true });
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
  const [displayTableLoading, setDisplayTableLoading] = useState(false);
  const { search, list, deleteById } = useTemplateTesListStore();
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
    setDisplayTableLoading(true);
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
        <AppTable rowData={list} columns={columns} displayTableLoading={displayTableLoading} />
      </div>
    </>
  );
}

export default withSourceView(TemplateTestList);
