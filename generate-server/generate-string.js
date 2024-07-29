const testGenerateString = `
<% if (framework === 'express') { %>
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, <%= name %>!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
<% } else { %>
console.log('Hello, <%= name %>!');
<% } %>
`;

const listComponentGenerateString = `
import AppTable from "@/components/common/AppTable";
import { createListSlice, listBaseState } from "@/stores/slice/listSlice";
import { useEffect } from "react";
import { create } from "zustand";

/* 컬럼 영역 */
const columns: any = [<% tableColumns.forEach((columnInfo)=> { %>
    { field: "<%= columnInfo.column_name %>", headerName: "<%= columnInfo.column_comment %>" },<% }) %>
];

const initListData = {
  ...listBaseState,
  listApiPath: "TODO:목록api패스",
  baseRoutePath: 'TODO:UI라우트패스',
  columns: columns,
};

/* zustand store 생성 */
const <%= storeName %> = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  /* TODO : 검색에서 사용할 input 선언 */
  searchWord: '',

  clear: () => {
    set(initListData);
  },
}));

function <%= fileName %>() {
  const state = <%= storeName %>();
  const { search, searchWord, list, getColumns, goAddPage, changeSearchInput, clear } = state;
  const columns = getColumns();

  useEffect(() => {
    search();
    return clear;
  }, []);

  return (
    <>
      {/* TODO : 헤더 영역입니다 */}
      <div className="conts-title">
        <h2>TODO: 타이틀</h2>
        <div className="btn-area">
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={search}>
            조회
          </button>
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line" onClick={goAddPage}>
            신규
          </button>
        </div>
      </div>
      {/* TODO : 검색 input 영역입니다 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <span className="form-group wid100 mr5">
              <input
                type="text"
                className="form-tag"
                name="title"
                value={searchWord}
                onChange={(event) => {
                  changeSearchInput('searchWord', event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event && event.key === 'Enter') {
                    search();
                  }
                }}
              />
              <label className="f-label">이름</label>
            </span>
          </div>
        </div>
      </div>
      <AppTable
        rowData={list}
        columns={columns}
        store={state}
      />
    </>
  );
}

export default <%= fileName %>;
`;

const formStoreGenerateString = `
import { create } from "zustand";
import { formBaseState, createFormSliceYup } from "@/stores/slice/formSlice";
import * as yup from "yup";

/* yup validation */
const yupFormSchema = yup.object({<% tableColumns.forEach((columnInfo)=> { %>
  <%= columnInfo.column_name %>: yup.<%= columnInfo.yupType %>,<% }) %>
});

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'TODO : api path',
  baseRoutePath: 'TODO : UI route path',
  formName: '<%= fileName %>',

  requiredFields: [<% requiredFieldList.forEach((fieldName)=> { %>"<%= fieldName %>", <% }) %>],
  <% tableColumns.forEach((columnInfo)=> { %>
  <%= columnInfo.column_name %>: <%- columnInfo.formInitValue %>,<% }) %>
};

/* zustand store 생성 */
const <%= fileName %> = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set(initFormData);
  },
}));

export default <%= fileName %>`;

const formViewGenerateString = `
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* TODO : store 경로를 변경해주세요. */
import <%= storeName %> from '@/stores/guide/<%= storeName %>';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function <%= fileName %>() {

  /* formStore state input 변수 */
  const { <% tableColumns.forEach((columnInfo)=> { %> <%= columnInfo.column_name %>,<% }) %> errors,
    changeInput,
    getDetail,
    formType,
    save,
    remove,
    cancel,
    clear } =
    <%= storeName %>();

  const { detailId } = useParams();

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>TODO : 헤더 타이틀</h2>
      </div>
      <div className="detail-form">
        <ul className="detail-list">
          <% tableColumns.forEach((columnInfo)=> { %>        
          <li className="list">
            <label className="f-label">
              <%= columnInfo.column_comment %> <% if (columnInfo.is_nullable !== 'YES') { %> <span className="required">*</span> <% } %>
            </label>
            <div className="cont">
              <div className="form-table">
                <div className="form-cell wid100">
                  <span className="form-group wid100 mr5">
                    <input
                      type="text"
                      className={errors.<%= columnInfo.column_name %> ? 'form-tag error' : 'form-tag'}
                      placeholder="<%= columnInfo.column_comment %>"
                      name="<%= columnInfo.column_name %>"
                      id="<%= storeName %><%= columnInfo.column_name %>"
                      value={<%= columnInfo.column_name %>}
                      onChange={(event) => changeInput('<%= columnInfo.column_name %>', event.target.value)}
                    />
                    {errors.<%= columnInfo.column_name %> ? <span className="errorText">{errors.<%= columnInfo.column_name %>}</span> : null}
                  </span>
                </div>
              </div>
            </div>
          </li>                
          <% }) %>
        </ul>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          삭제
        </button>
        <button className="btn_text text_color_darkblue-100 btn_close" onClick={cancel}>
          취소
        </button>
      </div>
    </>
  );
}
export default <%= fileName %>;
`;

module.exports = {
  testGenerateString: testGenerateString,
  listComponentGenerateString: listComponentGenerateString,
  formStoreGenerateString: formStoreGenerateString,
  formViewGenerateString: formViewGenerateString,
};
