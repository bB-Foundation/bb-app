import {GemColor} from 'types/gem';

export type SelectTokensProps = {
  userId: number;
  submitHandler: (selectedGemColor: GemColor) => void;
  submitValidator?: (
    selectedGemsAmount: number,
    selectedGemsColor: GemColor,
  ) => Promise<void>;
};

export type UseSelectTokensData = {
  userId: SelectTokensProps['userId'];
  submitHandler: SelectTokensProps['submitHandler'];
  submitValidator?: SelectTokensProps['submitValidator'];
};
