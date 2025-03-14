import React from 'react';
import {Text, View} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import Page from 'components/page';
import styles from './friends.styles';
import {RoomView} from './components/room-view';
import {OverlayLoader} from 'components/overlay-loader';
import {useChat, useLayout, useUserSearch} from './friends.hooks';

const Friends = () => {
  const {data, value, onChangeText, cleanSearch} = useUserSearch();

  const {areLoadingRooms, chatRooms, onUserPressHandler, openRoomHandler} =
    useChat();

  const {mainContainerMarginTop} = useLayout();

  if (!chatRooms.length && areLoadingRooms) return <OverlayLoader />;

  return (
    <Page>
      <View style={[styles.container, {marginTop: mainContainerMarginTop}]}>
        <View>
          <Autocomplete
            autoCorrect={false}
            data={data}
            value={value}
            autoCapitalize="characters"
            onChangeText={onChangeText}
            inputContainerStyle={styles.searchInputContainer}
            placeholder="Search...."
            flatListProps={{
              keyboardShouldPersistTaps: undefined,
              keyExtractor: ({bbId}, i) => bbId ?? i.toString(),
              renderItem: ({item: {userId, bbId}}) => (
                <Text
                  style={styles.searchInputItem}
                  onPress={() => {
                    cleanSearch();
                    onUserPressHandler(userId);
                  }}>
                  {bbId}
                </Text>
              ),
            }}
          />
        </View>

        <View style={styles.roomsContainer}>
          {chatRooms.map(r => {
            // do not show empty rooms
            if (!r.lastMessage) return null;

            return <RoomView key={r.id} room={r} onOpen={openRoomHandler} />;
          })}
        </View>
      </View>
    </Page>
  );
};

export default Friends;
