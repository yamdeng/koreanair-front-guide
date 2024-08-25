import AppNavigation from '@/components/common/AppNavigation';
import {
  useSpiInfoOpStatusStore,
  useSpiInfoSpiStatusStore,
  useSpiInfoStore,
} from '@/stores/aviation/spi-spt/useSpiInfoStore';
import { useEffect } from 'react';
import OpStatus from './OpStatus';
import SpiStatus from './SpiStatus';

function SPIInfo() {
  // PotencialConListStore 에서 정의된 메소드 사용 시 이곳에서 분해할당
  const { tabIndex, changeTab, clear } = useSpiInfoStore();
  const useSpiInfoOpStatusStoreState = useSpiInfoOpStatusStore();
  const useSpiInfoSpiStatusStoreState = useSpiInfoSpiStatusStore();

  useEffect(() => {
    useSpiInfoOpStatusStoreState.search();
    useSpiInfoSpiStatusStoreState.spiCodeSearch();
    return clear;
  }, []);

  return (
    <>
      {/*경로 */}
      <AppNavigation />
      {/*경로 */}
      <div className="conts-title">
        <h2>운영현황</h2>
      </div>
      {/*탭 */}
      <div className="menu-tab-nav">
        <div className="menu-tab">
          <a onClick={(e) => changeTab(0)} className={tabIndex == 0 ? 'active' : ''} data-label="운항정보">
            운항정보
          </a>
          <a onClick={(e) => changeTab(1)} className={tabIndex == 1 ? 'active' : ''} data-label="SPI지표별 현황">
            SPI지표별 현황
          </a>
        </div>
      </div>
      {tabIndex == 0 ? <OpStatus /> : <></>}
      {tabIndex == 1 ? <SpiStatus /> : <></>}
    </>
  );
}

export default SPIInfo;
