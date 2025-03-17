import OpenPGP from 'react-native-fast-openpgp';

import {ChatRoom} from 'types/chat-room';

export const decryptChatRoomLastMessage = async (
  userId: number,
  userPgpPrivateKey: string,
  rooms: ChatRoom[],
) => {
  const roomsWithDecryptedLastMessage = [...rooms];

  const decryptPromises = roomsWithDecryptedLastMessage.map(r =>
    r.lastMessage
      ? OpenPGP.decrypt(
          r.lastMessage!.text,
          userPgpPrivateKey,
          userId.toString(),
        )
      : Promise.reject(null),
  );

  const decryptResults = await Promise.allSettled(decryptPromises);

  for (const [i, decryptedMessage] of decryptResults.entries()) {
    const lastMessage = roomsWithDecryptedLastMessage[i].lastMessage;
    if (decryptedMessage.status === 'fulfilled' && lastMessage) {
      lastMessage.text = decryptedMessage.value;
    }
  }

  return roomsWithDecryptedLastMessage;
};
