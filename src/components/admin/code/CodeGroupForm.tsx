import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSysCodeGroupFormStore from '@/stores/admin/useSysCodeGroupFormStore';
import AppTable from '@/components/common/AppTable';
import AppTextInput from '@/components/common/AppTextInput';
import AppSelect from '@/components/common/AppSelect';
import Code from '@/config/Code';
import { DETAIL_NEW_ID, FORM_TYPE_ADD } from '@/config/CommonConstant';

const DeleteActionButton = (props) => {
  const { node, onClick } = props;
  const { rowIndex } = node;
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.nativeEvent.stopPropagation();
    onClick(rowIndex);
  };
  return <div onClick={handleClick}>삭제</div>;
};

function CodeGroupForm() {
  /* formStore state input 변수 */
  const {
    formValue,
    errors,
    changeInput,
    getDetail,
    formType,
    save,
    remove,
    clear,
    addRow,
    removeAll,
    removeByIndex,
    saveCodeDetail,
  } = useSysCodeGroupFormStore();

  const { codeGrpId, workScope, codeGrpNameKor, codeGrpNameEng, useYn, remark } = formValue;
  const listState = useSysCodeGroupFormStore();
  const { search, list, changeListApiPath, changeListInfoByIndex } = listState;

  const [columns] = useState([
    { field: 'codeId', headerName: '코드ID', editable: true },
    { field: 'codeNameKor', headerName: '코드명(한국어)', editable: true },
    { field: 'codeNameEng', headerName: '코드명(영어)', editable: true },
    { field: 'codeField1', headerName: '예비필드 1', editable: true },
    { field: 'codeField2', headerName: '예비필드 2', editable: true },
    { field: 'codeField3', headerName: '예비필드 3', editable: true },
    { field: 'codeField4', headerName: '예비필드 4', editable: true },
    { field: 'codeField5', headerName: '예비필드 5', editable: true },
    {
      field: 'sortOrder',
      headerName: '정렬순서',
      editable: true,
      cellEditor: 'agNumberCellEditor',
      cellEditorParams: {
        min: 1,
        max: 300,
      },
    },
    {
      field: 'useYn',
      headerName: '사용여부',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Y', 'N'],
      },
    },
    { field: 'remark', headerName: '비고', editable: true },
    {
      pinned: 'right',
      field: 'action',
      headerName: 'Action',
      cellRenderer: 'deleteActionButton',
      cellRendererParams: {
        onClick: removeByIndex,
      },
    },
  ]);

  const { detailId } = useParams();

  const customButtons = [
    {
      title: '행추가',
      onClick: () => {
        addRow();
      },
    },
    {
      title: '전체삭제',
      onClick: () => {
        removeAll();
      },
    },
  ];

  const handleRowDoubleClick = (props) => {
    const { event } = props;
    if (!event.defaultPrevented) {
      // TODO : 모달 open
    }
  };

  const onCellEditRequest = (cellInfo) => {
    const { rowIndex, column, newValue } = cellInfo;
    const { colId } = column;
    changeListInfoByIndex(rowIndex, colId, newValue);
  };

  useEffect(() => {
    if (detailId && detailId !== DETAIL_NEW_ID) {
      getDetail(detailId);
      changeListApiPath(`sys/code-groups/${detailId}/codes`);
      search();
    }
    return clear;
  }, []);

  return (
    <>
      <div className="conts-title">
        <h2>코드관리</h2>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysCodeGroupFormStorecodeGrpId"
                name="codeGrpId"
                label="코드그룹ID"
                value={codeGrpId}
                onChange={(value) => changeInput('codeGrpId', value)}
                required
                errorMessage={errors.codeGrpId}
                disabled={formType !== FORM_TYPE_ADD}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSelect
                id="useSysCodeGroupFormStoreworkScope"
                name="workScope"
                label="업무구분"
                options={Code.adminWorkScope}
                value={workScope}
                onChange={(value) => changeInput('workScope', value)}
                errorMessage={errors.workScope}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysCodeGroupFormStorecodeGrpNameKor"
                name="codeGrpNameKor"
                label="코드그룹명(한국어)"
                value={codeGrpNameKor}
                onChange={(value) => changeInput('codeGrpNameKor', value)}
                errorMessage={errors.codeGrpNameKor}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysCodeGroupFormStorecodeGrpNameEng"
                name="codeGrpNameEng"
                label="코드그룹명(영어)"
                value={codeGrpNameEng}
                onChange={(value) => changeInput('codeGrpNameEng', value)}
                errorMessage={errors.codeGrpNameEng}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSelect
                id="useSysCodeGroupFormStoreuseYn"
                name="useYn"
                label="사용여부"
                options={Code.useYn}
                value={useYn}
                onChange={(appSelectValue) => {
                  changeInput('useYn', appSelectValue);
                }}
                required
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>

        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="useSysCodeGroupFormStoreremark"
                name="remark"
                label="비고"
                value={remark}
                onChange={(value) => changeInput('remark', value)}
                errorMessage={errors.remark}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          style={{ display: formType !== FORM_TYPE_ADD ? '' : 'none' }}
        >
          삭제
        </button>
      </div>

      {formType !== FORM_TYPE_ADD ? (
        <AppTable
          rowData={list}
          columns={columns}
          store={listState}
          hiddenPagination
          customButtons={customButtons}
          components={{
            deleteActionButton: DeleteActionButton,
          }}
          onCellEditRequest={onCellEditRequest}
          handleRowDoubleClick={handleRowDoubleClick}
        />
      ) : null}

      {/* 하단 버튼 영역 */}
      <div className="contents-btns" style={{ display: formType !== FORM_TYPE_ADD ? '' : 'none' }}>
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={saveCodeDetail}>
          코드 상세 저장
        </button>
      </div>
    </>
  );
}
export default CodeGroupForm;