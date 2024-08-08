export class BitShiftHelper {
  currentBit: any;
  static instance: any;
  completionBit: number;
  callback: () => void;

  constructor() {
    if (BitShiftHelper.instance) {
      return BitShiftHelper.instance;
    }

    this.completionBit = 0b0;
    this.currentBit = 0b0;
    this.callback = () => {};
    BitShiftHelper.instance = this;
  }

  fetchCurrent(fetchBit) {
    this.currentBit |= fetchBit;
    if (this.currentBit === this.completionBit) {
      this.callback?.();
      this.callback = undefined;
    }
  }

  setupCompletion(count) {
    let i = 0;
    do {
      DefaultShiftHelper.completionBit = DefaultShiftHelper.completionBit | (0x0001 << i);
      i++;
    } while (i < count);
  }

  debug() {
    console.log(`currentBit: ${this.currentBit.toString(2)}, completionBit: ${this.completionBit.toString(2)}`);
  }
}

export const DefaultShiftHelper = new BitShiftHelper();

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 KB';

  const kb = bytes / 1024;
  const roundedKb = Math.floor(kb); // 소수점 이하를 제거합니다.
  const formattedSize = roundedKb.toLocaleString(); // 천 단위 구분 기호를 추가합니다.

  return `${formattedSize} KB`;
};
