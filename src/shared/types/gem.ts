export enum GemColor {
  BLUE = 'blue',
  YELLOW = 'yellow',
  PINK = 'pink',
  PURPLE = 'purple',
  GREEN = 'green',
}

type GemAttributes = {
  color: GemColor;
};

export type GemMetadata = {
  tokenId: number;
  name: string;
  description: string;
  imageUrl: string;
  attributes: GemAttributes;
};
