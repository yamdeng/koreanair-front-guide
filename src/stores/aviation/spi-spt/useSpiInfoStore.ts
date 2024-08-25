import ApiService from '@/services/ApiService';
import { createListSlice, listBaseState } from '@/stores/slice/listSlice';
import dayjs from 'dayjs';
import { create } from 'zustand';

const now = dayjs();

const initSearchParam = {
  year: '' + now.year(),
  spiType: 'A',
  multipleSelectValue: [],
};

export const useSpiInfoStore = create<any>((set, get) => ({
  tabIndex: '',
  changeTab: (tabIndex) => {
    set({ tabIndex: tabIndex });
    if (tabIndex === 0) {
      useSpiInfoOpStatusStore.getState().search();
    } else {
      useSpiInfoSpiStatusStore.getState().spiCodeSearch();
      //useSpiInfoSpiStatusStore.getState().search();
    }
  },
  clear: () => {
    useSpiInfoOpStatusStore.getState().clear();
    useSpiInfoSpiStatusStore.getState().clear();
  },
}));

/* zustand store 생성 */
export const useSpiInfoSpiStatusStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    year: '' + now.year(),
    spiType: 'A',
    multipleSelectValue: [],
  },

  spiCodeList: [],

  createChart: () => {
    const tatgetSpi = get().searchParam.multipleSelectValue;
    const codeList = get().spiCodeList;
    let strInnerHtml = '';

    tatgetSpi.map((spi, targetIndex) => {
      const tatgetSpiInfo = codeList.filter((data) => {
        return data.value === spi;
      })[0];

      if (targetIndex % 2 == 0) strInnerHtml += '<div class="Status-chart">';

      strInnerHtml += '<div class="Status-col">';
      strInnerHtml += '  <p class="h4">';
      strInnerHtml += tatgetSpiInfo.label + '(SPT : <span>' + tatgetSpiInfo.sptPoint + '</span>)';
      strInnerHtml += '  </p>';
      strInnerHtml += '  <div class="Chart-box">';
      strInnerHtml += '    <canvas  width="700" height="400" id="chart' + tatgetSpiInfo.value + '"></canvas>';
      strInnerHtml += '  </div>';
      strInnerHtml += '</div>';

      if (targetIndex % 2 == 1 || targetIndex == tatgetSpi.length - 1) strInnerHtml += '</div>';
    });

    const chartElement = document.getElementById('test');
    chartElement.replaceChildren();

    chartElement.innerHTML = strInnerHtml;

    tatgetSpi.map((spi, targetIndex) => {
      const tatgetSpiInfo = codeList.filter((data) => {
        return data.value === spi;
      })[0];
      // canvas 요소에 접근하기 위해 document.getElementById를 사용합니다.
      //var chart = document.getElementById("ChartJS01");
      const cvs = document.getElementById('chart' + tatgetSpiInfo.value);

      // 차트를 그리기 위한 정보
      const data = {
        xaxisdata: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], // X축 라벨
        bardata: [
          [tatgetSpiInfo.stnd01Cnt, tatgetSpiInfo.bf01Cnt],
          [tatgetSpiInfo.stnd02Cnt, tatgetSpiInfo.bf02Cnt],
          [tatgetSpiInfo.stnd03Cnt, tatgetSpiInfo.bf03Cnt],
          [tatgetSpiInfo.stnd04Cnt, tatgetSpiInfo.bf04Cnt],
          [tatgetSpiInfo.stnd05Cnt, tatgetSpiInfo.bf05Cnt],
          [tatgetSpiInfo.stnd06Cnt, tatgetSpiInfo.bf06Cnt],
          [tatgetSpiInfo.stnd07Cnt, tatgetSpiInfo.bf07Cnt],
          [tatgetSpiInfo.stnd08Cnt, tatgetSpiInfo.bf08Cnt],
          [tatgetSpiInfo.stnd09Cnt, tatgetSpiInfo.bf09Cnt],
          [tatgetSpiInfo.stnd10Cnt, tatgetSpiInfo.bf10Cnt],
          [tatgetSpiInfo.stnd11Cnt, tatgetSpiInfo.bf11Cnt],
          [tatgetSpiInfo.stnd12Cnt, tatgetSpiInfo.bf12Cnt],
        ], // [2024년도 데이터,2023년도 데이터]
        linedata: [
          tatgetSpiInfo.spiOcc01,
          tatgetSpiInfo.spiOcc02,
          tatgetSpiInfo.spiOcc03,
          tatgetSpiInfo.spiOcc04,
          tatgetSpiInfo.spiOcc05,
          tatgetSpiInfo.spiOcc06,
          tatgetSpiInfo.spiOcc07,
          tatgetSpiInfo.spiOcc08,
          tatgetSpiInfo.spiOcc09,
          tatgetSpiInfo.spiOcc10,
          tatgetSpiInfo.spiOcc11,
          tatgetSpiInfo.spiOcc12,
        ], // 누적발생률
      };

      // 수평선을 표시하기 위한 정보
      const HLineInfo = [
        { value: tatgetSpiInfo.cautionPoint || 0, color: '#fadb14' }, // 주의
        { value: tatgetSpiInfo.warnPoint || 0, color: '#fa8c16' }, // 경계
        { value: tatgetSpiInfo.criticalPoint || 0, color: '#f5222d' }, // 심각
      ];

      // 필요한 경우 변경
      const opt = {
        // yaxixScaleMaxBar  : 10 ,  // bar chart의 Y축의 최대값
        // yaxixScaleMinLine :  0 ,  // line chart의 Y축의 최소값
        // yaxixScaleMaxLine :  1.0, // line chart의 Y축의 최대값
        // lineMarginInner   : 35    // 라인의 중앙으로 옮기기 위한 마진
      };

      get().drawChart(cvs, data, HLineInfo, opt);
    });
  },

  spiCodeSearch: async () => {
    set({ multipleSelectValue: [] });
    const { searchParam } = get();
    const { year, spiType } = searchParam;
    const apiParam = { year: year, spiType: spiType };
    const apiResult = await ApiService.get(`avn/assurance/spi-spt/spiCodeList`, apiParam);
    set({ spiCodeList: apiResult.data });
  },

  initSearchInput: () => {
    set({
      searchParam: {
        ...initSearchParam,
      },
    });
  },

  clear: () => {
    set({ ...listBaseState, searchParam: { ...initSearchParam } });
  },

  /*
    실제로 차트를 그린다.
    cvs : 차트를 그릴 Div의 하위에 있는 canvas 오브젝트
    data : 화면에 표시할 데이터 
    HLineInfo : 수평선의 정보(값,컬러 등)
  */
  drawChart: (cvs, data, HLineInfo, opt) => {
    // 기본값
    const yaxixScaleMaxBar = opt.yaxixScaleMaxBar || 10;
    const yaxixScaleMinLine = opt.yaxixScaleMinLine || 0;
    const yaxixScaleMaxLine = opt.yaxixScaleMaxLine || 10;
    const lineMarginInner = opt.lineMarginInner || 35;

    DxChart.reset(cvs);

    const bar = new DxChartBar({
      id: cvs,
      elem: cvs,
      data: data.bardata,
      options: {
        colors: ['#1890ff', '#42c41a'],
        /*
          차트의 여백
        */
        margin: { Left: 50, Bottom: 50, Inner: 5, InnerGrouped: 0, Right: 50, Top: 50 },
        /*
          X축 정보 
        */
        xaxis: { Use: true, Labels: data.xaxisdata },
        /*
          Y축 정보
        */
        yaxis: { Use: true, Scale: true, ScaleMax: yaxixScaleMaxBar },
      },
    }).draw();

    const line = new DxChartLine({
      id: cvs,
      elem: cvs,
      data: data.linedata,
      options: {
        colors: ['#061178'],
        background: { GridHlines: false, GridVlines: false, GridBorder: false },
        /*
          차트의 여백
          Inner는 라인의 Pointer의 위치를 중간으로 옮기기 위해 사용( (canvas.width - Left - Right)/X축데이터수(12)/2 )
        */
        margin: { Left: 50, Bottom: 50, Inner: lineMarginInner, Right: 50, Top: 50 },
        /*
          X축 정보 (바차트의 정보만 사용, 표시는 안함)
        */
        xaxis: {
          Use: false, // X축 라인및 tickmarks의 표시여부
          Scale: false, // X축 라벨의 표시여부
        },
        /*
          Y축 정보 (바차트의 정보만 사용, 표시는 안함)
        */
        yaxis: {
          Use: false, // Y축 라인및 tickmarks의 표시여부
          Scale: false, // Y축 라벨의 표시여부
          ScaleMin: yaxixScaleMinLine, // 최소값
          ScaleMax: yaxixScaleMaxLine, // 최대값
        },
        /*
          라인의 값에 해당하는 부분의 ticmark	
        */
        tickmarks: {
          Style: 'filledcircle',
          Size: 3,
        },
        /*
           수평선 표시 정보(주의/경계/심각의 순서로 지정)
        */
        horizontalLines: [
          {
            // 주의
            value: HLineInfo[0].value, // 수평선의 값
            color: HLineInfo[0].color, // 수평선의 컬러
            dashed: true, // 대쉬선 사용여부
            lineWidth: 2, // 선의 굵기
            labelUse: false, // 라벨표시여부
            label: '', // 우수평선 우측상단의 라벨 표시부분 ()
          },
          {
            // 경계
            value: HLineInfo[1].value, // 수평선의 값
            color: HLineInfo[1].color, // 수평선의 컬러
            dashed: true, // 대쉬선 사용여부
            lineWidth: 2, // 선의 굵기
            labelUse: false, // 라벨표시여부
            label: '', // 우수평선 우측상단의 라벨 표시부분 ()
          },
          {
            // 심각
            value: HLineInfo[2].value, // 수평선의 값
            color: HLineInfo[2].color, // 수평선의 컬러
            dashed: true, // 대쉬선 사용여부
            lineWidth: 2, // 선의 굵기
            labelUse: false, // 라벨표시여부
            label: '', // 우수평선 우측상단의 라벨 표시부분 ()
          },
        ],
      },
    }).draw();
  },
}));

/* zustand store 생성 */
export const useSpiInfoOpStatusStore = create<any>((set, get) => ({
  ...createListSlice(set, get),

  list1: [],
  list2: [],
  list3: [],

  /* TODO : 검색에서 사용할 input 선언 및 초기화 반영 */
  searchParam: {
    year: '' + now.year(),
  },

  search: async () => {
    const { searchParam } = get();
    const { year } = searchParam;
    const apiParam = { year: year };
    const apiResult = await ApiService.get(`avn/assurance/spi-spt/op-status`, apiParam);
    const { rtnMap1, rtnMap2, rtnMap3 } = apiResult.data;
    set({ list1: rtnMap1, list2: rtnMap2, list3: rtnMap3 });
  },

  initSearchInput: () => {
    set({
      searchParam: {
        ...initSearchParam,
      },
    });
  },

  clear: () => {
    set({ ...listBaseState, searchParam: { ...initSearchParam } });
  },
}));
