export type InitializeTradeData = {
  receiverbBId: string;
  initiatorGemIds: number[];
};

export type AcceptTradeData = {
  tradeId: number;
  receiverGemIds: number[];
};

export type SignTradeData = {
  tradeId: number;
  signature: string;
};

export type ReviewOrderProps = {
  mode: 'creator' | 'acceptor';
};
