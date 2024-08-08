
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
    this.callback = () => { };
    BitShiftHelper.instance = this;
  }

  fetchCurrent(fetchBit) {
    this.currentBit |= fetchBit
    if (this.currentBit === this.completionBit) {
      this.callback?.();
      this.callback = undefined;
    }
  }

  setupCompletion(count) {
    let i = 0;
    do {
      DefaultShiftHelper.completionBit = DefaultShiftHelper.completionBit | 0x0001 << i;
      i++;
    } while (i < count);
  }

  debug() {
    console.log(`currentBit: ${this.currentBit.toString(2)}, completionBit: ${this.completionBit.toString(2)}`)
  }
}

export const DefaultShiftHelper = new BitShiftHelper();
