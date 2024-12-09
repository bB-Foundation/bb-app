type GemAttributes = {
  color: string;
};

export type GemMetadata = {
  tokenId: number;
  name: string;
  description: string;
  imageUrl: string;
  attributes: GemAttributes;
};
