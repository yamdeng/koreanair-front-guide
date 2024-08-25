import ApiService from '@/services/ApiService';
import { createFormSliceYup, formBaseState } from '@/stores/slice/formSlice';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { create } from 'zustand';

const now = dayjs();

/* yup validation */
const yupFormSchema = yup.object({
  year: yup.string().required(),
  spiCode: yup.string().required(),
  spiName: yup.string().required(),
  spiType: yup.string(),
  spiTaxonomy: yup.string(),
  outputStnd: yup.string(),
  spiDescr: yup.string(),
  dataSource: yup.string(),
  cautionPoint: yup.number().nullable(),
  warnPoint: yup.number().nullable(),
  criticalPoint: yup.number().nullable(),
  sptPoint: yup.number().nullable(),
  useYn: yup.string().required(),
  viewOrder: yup.number().required(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  year: '',
  spiCode: '',
  spiName: '',
  spiType: '',
  spiTaxonomy: '',
  outputStnd: '',
  spiDescr: '',
  dataSource: '',
  cautionPoint: null,
  warnPoint: null,
  criticalPoint: null,
  sptPoint: null,
  useYn: '',
  viewOrder: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'TODO : api path',
  baseRoutePath: 'TODO : UI route path',
  formName: 'AvnSpiForm',
  formValue: {
    ...initFormValue,
  },
};

const initSearchParam = {
  year: '' + now.year(),
  spiType: 'A',
};

/* zustand store 생성 */
const useSpiIndicatorStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    year: '' + now.year(),
    spiType: 'A',
  },

  initSearchInput: () => {
    set({
      searchParam: {
        ...initSearchParam,
      },
    });
  },

  search: async () => {
    const { searchParam } = get();
    const { year } = searchParam;
    const apiParam = { year: year };
    const apiResult = await ApiService.get(`avn/assurance/spi-spt/indicators`, apiParam);
    const { rtnMap1, rtnMap2, rtnMap3 } = apiResult.data;
    set({ list1: rtnMap1, list2: rtnMap2, list3: rtnMap3 });
  },

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue }, searchParam: { ...initSearchParam } });
  },
}));

export default useSpiIndicatorStore;
