import React, {FC, useContext} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabBarHeightContext} from '@react-navigation/bottom-tabs';

import styles from './chat.styles';
import {ChatProps} from './chat.types';
import {useChat} from './chat.hooks';
import {OverlayLoader} from 'components/overlay-loader';
import useCurrentUserProfile from 'hooks/current-user';

export const Chat: FC<ChatProps> = chatProps => {
  const insets = useSafeAreaInsets();

  const {messages, areLoadingMessages, onSend} = useChat(chatProps);

  const {data: currentUserProfile} = useCurrentUserProfile();

  const tabBarHeight = useContext(BottomTabBarHeightContext) ?? 0;

  if (!currentUserProfile) return null;

  return (
    <>
      {areLoadingMessages && <OverlayLoader />}

      <View style={styles.container}>
        <GiftedChat
          alignTop={false}
          messages={messages}
          onSend={onSend}
          user={{
            _id: currentUserProfile.userId,
          }}
          renderAvatar={null}
          alwaysShowSend
          renderUsernameOnMessage={true}
          bottomOffset={tabBarHeight - insets.bottom}
        />
      </View>
    </>
  );
};
