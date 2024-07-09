import AppTable from '@/components/common/AppTable';
import ApiService from '@/services/ApiService';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { create } from 'zustand';

const initListData = {
  ...listBaseState,
};

const userStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  name: '',

  changeName: (newName) => set(() => ({ name: newName })),

  search: async () => {
    const apiParam = get().getSearchParam();
    const response: any = await ApiService.get('users', apiParam, { disableLoadingBar: true });
    const { data } = response;
    const list = data.data;
    set({
      list: list,
    });
  },

  deleteById: async (detailId) => {
    await ApiService.delete(`/users/${detailId}`, detailId);
    alert('삭제완료');
    get().search();
  },

  clear: () => {
    set(initListData);
  },
}));

function DeleteButton(params) {
  const { data, deleteFunction } = params;
  const { id } = data;
  const clickButton = async () => {
    if (confirm('삭제하시겠습니까?')) {
      deleteFunction(id);
    }
  };
  return (
    <button className="button" onClick={clickButton}>
      delete
    </button>
  );
}

function UserList() {
  const navigate = useNavigate();
  const [displayTableLoading, setDisplayTableLoading] = useState(false);
  const { search, list, name, changeName, deleteById } = userStore();

  const userColumns: any = [
    { field: 'id', headerName: 'Id' },
    { field: 'loginId', headerName: '로그인ID' },
    { field: 'name', headerName: 'Name', isLink: true, linkPath: '/users', detailPath: 'id' },
    { field: 'nameEn', headerName: 'Nameen' },
    { field: 'sabun', headerName: 'Sabun' },
    { field: 'positionTitle', headerName: '직위' },
    { field: 'email', headerName: 'Email' },
    { field: 'phoneNumber', headerName: '핸드폰번호' },
    { field: 'address1', headerName: '주소' },
    { field: 'zipcode', headerName: '우편번호' },
    { field: 'joinDate', headerName: '가입일' },
    { field: 'status', headerName: '사용자 상태' },
    { field: 'createdDate', headerName: '생성일' },
    { field: 'updatedDate', headerName: '수정일' },
    {
      field: 'button',
      headerName: '삭제',
      cellRenderer: DeleteButton,
      cellRendererParams: {
        deleteFunction: deleteById,
      },
      pinned: 'right',
    },
  ];

  const columns = userColumns;

  const clearKeyword = useCallback(() => {
    changeName('');
    search();
  }, []);

  useEffect(() => {
    setDisplayTableLoading(true);
    search();
  }, []);

  return (
    <div className="content_area">
      <h3>사용자 목록</h3>
      <div className="box_form">
        <div className="form_table f_wid50">
          <div className="form_cell form_cell_flex">
            <span className="form_group form_search form_clear form_glow c_mr5">
              <input
                type="text"
                className="form_tag"
                onChange={(event) => changeName(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                    e.preventDefault();
                    search();
                  }
                }}
                value={name}
              />
              <label className="f_label">키워드</label>
              <span className="icon icon_search">
                <i className="fas fa-search"></i>
              </span>
              <span className="icon icon_clear" style={{ display: name ? 'block' : 'none' }} onClick={clearKeyword}>
                <i className="fas fa-times-circle"></i>
              </span>
            </span>
            <button className="btn_icon btn_dark_gray" onClick={search}>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="list_form c_mt10">
        <div className="list_form_btns_fix">
          <button
            className="btn_text btn_green c_mr5"
            onClick={() => {
              navigate('/users/add/form');
            }}
          >
            사용자 추가
          </button>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AppTable rowData={list} columns={columns} displayTableLoading={displayTableLoading} />
      </div>
    </div>
  );
}

export default UserList;
