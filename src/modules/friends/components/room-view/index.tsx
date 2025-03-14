import React from 'react';
import {Text, View} from 'react-native';
import {Card} from '@ui-kitten/components';

import styles from './room-view.styles';
import {ChatRoom} from 'types/chat-room';
import {getSecondBBId} from './room-view.api';
import useCurrentUserProfile from 'hooks/current-user';
import {getTimeFromDateString} from 'src/shared/utils/strings';

type Props = {
  room: ChatRoom;
  onOpen: (room: ChatRoom) => void;
};

export const RoomView: React.FC<Props> = ({room, onOpen}) => {
  const {data: currentUserProfile} = useCurrentUserProfile();

  if (!currentUserProfile) return null;

  return (
    <Card onPress={() => onOpen(room)}>
      <View style={styles.contentContainer}>
        <View style={styles.lastMessageContainer}>
          <Text>{getSecondBBId(currentUserProfile.userId, room)}</Text>

          {room.lastMessage && <Text>{room.lastMessage.text}</Text>}
        </View>

        {room.lastMessage && (
          <View style={styles.lastMessageTime}>
            <Text>{getTimeFromDateString(room.lastMessage.createdAt)}</Text>
          </View>
        )}
      </View>
    </Card>
  );
};
