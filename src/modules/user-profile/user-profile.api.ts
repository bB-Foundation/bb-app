import {Linking} from 'react-native';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard';

export const copyAccountAddress = (address: string) => {
  Clipboard.setString(address);

  Toast.show({
    type: 'success',
    text1: 'Address was copied',
  });
};

export const openBlockChainExplorer = (accountAddress: string) => {
  Linking.openURL(`https://sepolia.starkscan.co/contract/${accountAddress}`);
};
