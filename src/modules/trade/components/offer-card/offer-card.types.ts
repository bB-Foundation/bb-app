import {GemColor} from 'types/gem';

export type OfferCardProps = {
  owner: string;
  gemsAmount: number;
  gemColor: GemColor | undefined;
};
