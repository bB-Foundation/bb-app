import {Linking} from 'react-native';

export const openBlockChainExplorer = (thHash: string) => {
  Linking.openURL(`https://sepolia.starkscan.co/tx/${thHash}`);
};
