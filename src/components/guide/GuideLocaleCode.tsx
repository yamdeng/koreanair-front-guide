import AppNavigation from '@/components/common/AppNavigation';
import AppTable from '@/components/common/AppTable';
import CodeLabelComponent from '../common/CodeLabelComponent';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import { useState } from 'react';
import Config from '@/config/Config';
import CodeSerivce from '@/services/CodeService';
import { useTranslation } from 'react-i18next';

/*

  1.<AppCodeSelect />
  2.CodeService.getCodeLabelByValue('코드그룹id', '코드value') 를 이용한 라벨 가져오는 방법
   -Code 정보를 수동으로 컨트롤 하고 싶을때 CodeService 파일 참고
  3.Table code 값을 다국어 반영

*/
function GuideLocaleCode() {
  const { t } = useTranslation();

  const [columns, setColumns] = useState([
    {
      field: 'codeValue',
      headerName: t('front.text.001'),
      cellRenderer: CodeLabelComponent,
      cellRendererParams: {
        codeGrpId: 'CODE_GRP_009',
      },
    },
    {
      field: 'name',
      headerName: '이름',
    },
  ]);

  const list = [
    { name: 'test1', codeValue: '100001110' },
    { name: 'test1', codeValue: '100001101' },
  ];

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          다국어 code case :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideLocaleCode.tsx`}>
            GuideLocaleCode
          </a>
        </h2>
      </div>
      <div className="boxForm">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppCodeSelect codeGrpId="CODE_GRP_009" label="CODE_GRP_009" />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">{CodeSerivce.getCodeLabelByValue('CODE_GRP_009', '100001110')}</div>
          </div>
        </div>
      </div>
      <AppTable rowData={list} columns={columns} setColumns={setColumns} />
    </>
  );
}

export default GuideLocaleCode;
