import React, {FC} from 'react';
import {Modal, View} from 'react-native';
import {Button} from '@ui-kitten/components';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import styles from './trade-chat-modal.styles';
import {TradeChatModalProps} from './trade-chat-modal.types';

export const TradeChatModal: FC<TradeChatModalProps> = ({
  children,
  isOpen,
  toggleOpen,
}) => {
  return (
    <Modal animationType="slide" visible={isOpen} onRequestClose={toggleOpen}>
      <SafeAreaProvider>
        <SafeAreaView>
          <View>
            <View style={styles.topButtonsContainer}>
              <Button onPress={toggleOpen}>Close</Button>
            </View>

            {children}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
