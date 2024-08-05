const listComponentGenerateString = `
import AppTable from "@/components/common/AppTable";
import { createListSlice, listBaseState } from "@/stores/slice/listSlice";
import { useEffect, useState, useCallback } from "react";
import CommonUtil from '@/utils/CommonUtil';
import { create } from "zustand";
import AppSearchInput from '@/components/common/AppSearchnput';

const initListData = {
  ...listBaseState,
  listApiPath: "TODO:목록api패스",
  baseRoutePath: 'TODO:UI라우트패스',
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
  const [columns, setColumns] = useState(
  CommonUtil.mergeColumnInfosByLocal([<% tableColumns.forEach((columnInfo)=> { %>
      { field: "<%= columnInfo.column_name %>", headerName: "<%= columnInfo.column_comment %>" },<% }) %>
  ])
  );
  const { search, searchWord, list, goAddPage, changeSearchInput, clear } = state;

  const handleRowDoubleClick = useCallback((selectedInfo) => {
    // TODO : 더블클릭시 상세 페이지 또는 모달 페이지 오픈
  }, []);

  useEffect(() => {
    search();
    return clear;
  }, []);

  return (
    <>
      {/* TODO : 헤더 영역입니다 */}
      <div className="conts-title">
        <h2>TODO: 타이틀</h2>
      </div>
      {/* TODO : 검색 input 영역입니다 */}
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <span className="form-group wid100">
              <AppSearchInput 
                label="이름"
                value={searchWord}
                onChange={(value) => {
                  changeSearchInput('searchWord', value);
                }}
                search={search}
              />
            </span>
          </div>
        </div>
      </div>
      <AppTable
        rowData={list}
        columns={columns}
        setColumns={setColumns}
        store={state}
        handleRowDoubleClick={handleRowDoubleClick}
      />
      <div className="contents-btns">
        {/* TODO : 버튼 목록 정의 */}
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm">
          신규
        </button>
      </div>
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
import AppTextInput from '@/components/common/AppTextInput';
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
      <div className="boxForm">
        <% tableColumns.forEach((columnInfo)=> { %>        

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="<%= storeName %><%= columnInfo.column_name %>"
                name="<%= columnInfo.column_name %>"
                label="<%= columnInfo.column_comment %>"
                onChange={(value) => {
                  setInputValue(value);
                }}
                value={<%= columnInfo.column_name %>}
                onChange={(value) => changeInput('<%= columnInfo.column_name %>', value)}
                <% if (columnInfo.is_nullable !== 'YES') { %> required <% } %>
              />
            </div>
          </div>
        </div>       
        <% }) %>
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

const detailViewGenerateString = `
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* TODO : store 경로를 변경해주세요. */
import <%= storeName %> from '@/stores/guide/<%= storeName %>';

/* TODO : 컴포넌트 이름을 확인해주세요 */
function <%= fileName %>() {

  /* formStore state input 변수 */
  const { <% tableColumns.forEach((columnInfo)=> { %> <%= columnInfo.column_name %>,<% }) %> 
    getDetail,
    formType,
    cancel,
    gorFormPage,
    clear } =
    <%= storeName %>();

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>TODO : 헤더 타이틀</h2>
      </div>
      <div className="boxForm">
        <% tableColumnMultiArray.forEach((rootArray)=> { %>
          <div className="form-table">
            <div className="form-cell wid50">
              <% rootArray.forEach((columnInfo)=> { %>
                <div className="form-group wid100">
                  <div className="box-view-list">
                    <ul className="view-list">
                      <li className="accumlate-list">
                        <label className="t-label">                        
                          <%= columnInfo.column_comment %>
                        </label>
                        <span className="text-desc">{<%= columnInfo.column_name %>}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              <% }) %>
            </div>
          </div>
        <% }) %>        
      </div>

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={cancel}>
          목록으로
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={gorFormPage}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          수정
        </button>
      </div>
    </>
  );
}
export default <%= fileName %>;
`;

const formModalGenerateString = ``;
const detailModalGenerateString = ``;

module.exports = {
  listComponentGenerateString: listComponentGenerateString,
  formStoreGenerateString: formStoreGenerateString,
  formViewGenerateString: formViewGenerateString,
  detailViewGenerateString: detailViewGenerateString,
  formModalGenerateString: formModalGenerateString,
  detailModalGenerateString: detailModalGenerateString,
};
