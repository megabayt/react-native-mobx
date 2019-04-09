export type BarcodeProps = {
  barcode: string,
  style?: {
    barcodeImg?: {},
    barcodeString?: {},
  },
};

export type BonusProps = {
  bonusCount: number,
  style?: {
    bonusWrapper?: {},
    bonusCount?: {},
    bonusString?: {},
  },
};

export type PromoProps = {
  appSettings: [{ key: string, value: string }],
  style?: {
    promoBg?: {},
    promoBgImg?: {},
    promoCount?: {},
    promoUnit?: {},
    promoText?: {},
  },
};

export type BonusContainerProps = {
  isLoading: boolean,
  bonus: number,
  barcode: string,
  style?: {},

  getUserData: () => void,
  renderHeader: () => void,
};
