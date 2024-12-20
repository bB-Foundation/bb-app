import {GemColor} from 'types/gem';

export type SelectTokensAmountProps = {
  userId: number;
  gemColor: GemColor;
  submitHandler: (receiverGemIds: number[]) => void;
  submitValidator?: (gemsAmount: number) => void;
};

export type UseSelectAmountData = {
  userId: number;
  gemColor: GemColor;
  submitHandler: (receiverGemIds: number[]) => void;
  submitValidator: SelectTokensAmountProps['submitValidator'];
};
