export type ReviewOrderProps = {
  isSubmitting: boolean;
  gemsAmount: number;
  user1GemIds: number[];
  user2GemIds?: number[];
  submitHandler: () => void;
};
