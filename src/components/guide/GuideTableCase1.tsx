import AppNavigation from '@/components/common/AppNavigation';
import AppTable from '@/components/common/AppTable';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import { useState } from 'react';
import { create } from 'zustand';
import AppCheckbox from '../common/AppCheckbox';

const initListData = {
  ...listBaseState,
  listApiPath: 'TODO:목록api패스',
  baseRoutePath: 'TODO:UI라우트패스',
};

/* zustand store 생성 */
const SysMessageListStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  ...initListData,

  expanded: true,

  list: [
    {
      name: 'aaa',
      reportTitle: 'bbb',
      auditors: [
        { color: 'red', name: '신상훈1-1', dutyTitle: '사장1-1' },
        { name: '신상훈1-2', dutyTitle: '사장1-2' },
        { name: '신상훈1-3', dutyTitle: '사장1-3' },
      ],
    },
    {
      name: 'aaa',
      reportTitle: 'bbb',
      auditors: [
        { color: 'blue', name: '신상훈2-1', dutyTitle: '사장2-1' },
        { name: '신상훈2-2', dutyTitle: '사장2-2' },
        { name: '신상훈2-3', dutyTitle: '사장2-3' },
      ],
    },
  ],

  toggleExpand: () => {
    const { expanded } = get();
    set({ expanded: !expanded });
  },
}));

function AuditorListComponent(props) {
  const state = SysMessageListStore();
  const { expanded } = state;
  const { value } = props;
  let applyAuditorList = [];
  if (value && value.length) {
    value && expanded ? value : value[0];
    if (expanded) {
      applyAuditorList = value;
    } else {
      applyAuditorList = [value[0]];
    }
  }

  const onClick = (auditorInfo) => {
    alert(`auditorInfo : ${JSON.stringify(auditorInfo)}`);
  };

  return (
    <span>
      {applyAuditorList.map((info) => {
        const { name, dutyTitle } = info;
        const applyStyle: any = {};
        if (info.color) {
          applyStyle.color = info.color;
        }
        return (
          <>
            <span key={name} onClick={() => onClick(info)} style={applyStyle}>
              {name} / {dutyTitle}
            </span>
          </>
        );
      })}
    </span>
  );
}

function SysMessageList() {
  const state = SysMessageListStore();
  const { list, toggleExpand, expanded } = state;
  const [columns, setColumns] = useState([
    { field: 'name', headerName: '이름' },
    { field: 'reportTitle', headerName: '보고서명' },
    {
      field: 'auditors',
      headerName: '감시자들',
      cellRenderer: AuditorListComponent,
      cellRendererParams: {
        expanded: SysMessageListStore.getState().expanded,
      },
    },
  ]);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>테이블 case1(펼치기/닫기)</h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="group-box-wrap wid100">
              <AppCheckbox
                label="펼치기/닫기"
                value={expanded}
                onChange={(value) => {
                  toggleExpand(value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="btn-area">
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line">
            조회
          </button>
          <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line">
            초기화
          </button>
        </div>
      </div>
      <AppTable rowData={list} columns={columns} setColumns={setColumns} />
    </>
  );
}

export default SysMessageList;
