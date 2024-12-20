export type SignTradeProps = {
  userId: number;
  tradeId: number;
  signTradeHandler: (signature: string) => void;
};
