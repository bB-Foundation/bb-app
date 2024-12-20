import {GemColor} from 'types/gem';

export type ReviewOrderProps = {
  isSubmitting: boolean;
  gemsAmount: number;
  gemColor: GemColor;
  submitHandler: () => void;
};
