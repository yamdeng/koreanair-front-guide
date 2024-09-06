import AppSelect from '@/components/common/AppSelect';
import AppTextInput from '@/components/common/AppTextInput';
import Config from '@/config/Config';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formListObjectSlice';
import { useState } from 'react';
import * as yup from 'yup';
import { create } from 'zustand';
import AppNavigation from '../common/AppNavigation';
import AppTable from '../common/AppTable';

const ActionButton = (props) => {
  const { node, updateListStatus } = props;
  const { rowIndex } = node;
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopPropagation();
    updateListStatus(rowIndex, 'D', true);
  };
  return (
    <>
      <div onClick={handleClick}>삭제</div>
    </>
  );
};

const formName = 'SysMessageForm';

/* yup validation */
const yupFormSchema = yup.object().shape({
  comName: yup.string().required(),
  comNumber: yup.string().required(),
  ceo: yup.string().required(),
  uptae: yup.string().required(),
  upjong: yup.string().required(),
});

const yupListSchema = yup
  .array()
  .min(1, '목록은 최소 하나여야 합니다.')
  .of(
    yup.object().shape({
      name: yup.string().required('name is a required field'),
      content: yup.string().required('content is a required field'),
      deptCd: yup.string().required('deptCd is a required field'),
      email: yup.string().required('email is a required field'),
    })
  );

const yupListFormSchema = yup.object().shape({
  name: yup.string().required('name is a required field'),
  content: yup.string().required('content is a required field'),
  deptCd: yup.string().required('deptCd is a required field'),
  email: yup.string().required('email is a required field'),
});

const initFormData = {
  ...formBaseState,

  formApiPath: 'sys/messages',
  baseRoutePath: '/messages',
  formValue: {
    comName: '',
    comNumber: '',
    ceo: '',
    uptae: '',
    upjong: '',
  },
};

/* zustand store 생성 */
const testFormListStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),
  formName: formName,
  ...initFormData,
  yupFormSchema: yupFormSchema,
  yupListSchema: yupListSchema,
  yupListFormSchema: yupListFormSchema,
}));

function ListMappingForm() {
  const { detailFormErrors, changeDetailFormInput, detailFormValue, selectedListIndex, saveDetailForm } =
    testFormListStore();

  const { name, content, deptCd, email } = detailFormValue;
  return (
    <>
      <div className="ck-edit">
        <div className="boxForm">
          <h3 className="table-tit mt-10">사업장 상세정보</h3>
          <div className="form-table">
            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppTextInput
                  label="사업장 분류"
                  required
                  value={name}
                  onChange={(value) => changeDetailFormInput(`name`, value)}
                  errorMessage={detailFormErrors.name}
                  disabled={selectedListIndex === -1}
                />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput
                  label="내용"
                  required
                  value={content}
                  onChange={(value) => changeDetailFormInput(`content`, value)}
                  errorMessage={detailFormErrors.content}
                  disabled={selectedListIndex === -1}
                />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput
                  label="관리부서"
                  required
                  value={deptCd}
                  onChange={(value) => changeDetailFormInput(`deptCd`, value)}
                  errorMessage={detailFormErrors.deptCd}
                  disabled={selectedListIndex === -1}
                />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid100">
              <div className="form-group wid100">
                <AppTextInput
                  label="이메일"
                  required
                  value={email}
                  onChange={(value) => changeDetailFormInput(`email`, value)}
                  errorMessage={detailFormErrors.email}
                  disabled={selectedListIndex === -1}
                />
              </div>
            </div>
          </div>
          <div style={{ fontWeight: 'bold', padding: 20 }} onClick={saveDetailForm}>
            상세정보 적용
          </div>
          <div className="form-table">
            <div className="form-cell wid100">
              <div className="form-group wid100">
                <span className="stit-btn">
                  <h3>2차 협력업체</h3>
                  <button>추가</button>
                </span>
                그리드영역
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function GuideTableFormCase2() {
  const {
    errors,
    formValue,
    changeInput,
    selectedListIndex,
    changeSelectedListIndex,
    list,
    save,
    addRow,
    updateListStatus,
  } = testFormListStore();

  const [columns, setColumns] = useState([
    { field: 'status', headerName: 'status' },
    { field: 'name', headerName: 'name' },
    { field: 'content', headerName: 'content' },
    { field: 'deptCd', headerName: 'deptCd' },
    { field: 'email', headerName: 'email' },
    {
      pinned: 'right',
      field: 'action',
      headerName: '',
      cellRenderer: 'actionButton',
      cellRendererParams: {
        updateListStatus: updateListStatus,
      },
    },
  ]);

  const { comName, comNumber, ceo, uptae, upjong } = formValue;

  const handleRowDoubleClick = (selectedInfo) => {
    const { rowIndex, data } = selectedInfo;
    changeSelectedListIndex(rowIndex, data);
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          GuideTableFormCase2 case(yup 개별로 적용) :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideTableFormCase2.tsx`}>
            GuideTableFormCase2
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="업체명"
                required
                value={comName}
                onChange={(value) => changeInput('comName', value)}
                errorMessage={errors.comName}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="사업자번호"
                required
                value={comNumber}
                onChange={(value) => changeInput('comNumber', value)}
                errorMessage={errors.comNumber}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                label="대표자"
                value={ceo}
                onChange={(value) => changeInput('ceo', value)}
                errorMessage={errors.ceo}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSelect
                label="업태"
                required
                value={uptae}
                onChange={(value) => changeInput('uptae', value)}
                errorMessage={errors.uptae}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSelect
                label="업종"
                required
                value={upjong}
                onChange={(value) => changeInput('uptae', value)}
                errorMessage={errors.upjong}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="ck-edit-box pd-t0">
              <div className="ck-list">
                <span className="stit-btn">
                  <h3>사업장</h3>
                  <button onClick={addRow}>추가</button>
                </span>
                <AppTable
                  rowData={list}
                  columns={columns}
                  setColumns={setColumns}
                  handleRowDoubleClick={handleRowDoubleClick}
                  getRowStyle={(params) => {
                    const { data, rowIndex } = params;
                    if (rowIndex === selectedListIndex) {
                      return { background: '#d6d9eb' };
                    } else if (data.isError) {
                      return { background: '#ebb2b2' };
                    }
                  }}
                  components={{
                    actionButton: ActionButton,
                  }}
                />
                <p>{JSON.stringify(list)}</p>
              </div>
              <ListMappingForm />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
      </div>
      {/*//입력영역*/}

      {/* 하단버튼영역 */}
      <div className="contents-btns">
        <button type="button" name="button" className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button type="button" name="button" className="btn_text btn-del">
          취소
        </button>
      </div>
    </>
  );
}
export default GuideTableFormCase2;
