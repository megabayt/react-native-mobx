export type LoginContainerState = {
  step: number,
  phone: string,
  code: string,
  timeout: number,
  visibleHeight: number,
}
export type LoginContainerProps = {
  token: string,
  isLoading: boolean,
  error: string,
  isValidPhone: boolean,
  isSentPhone: boolean,
  isValidCode: boolean,
  isSentCode: boolean,
  isSentReg: boolean,
  phone: string,

  signIn: () => void,
  sendSms: () => void,
  checkCode: () => void,
  resetLogin: () => void,

  navigator: {},
};

export type TermsLinkProps = {
  error?: string,
  onPressNext: () => void,
  onPressTerms: () => void,
};

export type TelephoneProps = {
  getInputRef?: ({}) => void,
  value: string,
  onChangePhone: () => void,
};

export type SendAgaingProps = {
  onPressSendAgain: () => void,
  canSendAgain: boolean,
  timeout: number,
  error: string,
};

export type CodeProps = {
  getInputRef?: ({}) => void,
  value: string,
  onChangeCode: () => void,
};
