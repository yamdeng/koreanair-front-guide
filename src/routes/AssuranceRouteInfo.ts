import SpiIndicatorList from '@/components/aviation/spi-spt/spiIndicatorList/SpiIndicatorList';
import SpiInfo from '@/components/aviation/spi-spt/spiInfo/SpiInfo';
import '/src/report.css';

const AssuranceRouteInfo: any = {};

AssuranceRouteInfo.list = [
  // 안전보증 > SPI/SPT > 운영현황
  {
    Component: SpiInfo,
    path: 'spi-spt/spiInfo',
  },
  // 안전보증 > SPI/SPT > 운영현황
  {
    Component: SpiIndicatorList,
    path: 'spi-spt/spiIndicatorList',
  },
];

export default AssuranceRouteInfo;
