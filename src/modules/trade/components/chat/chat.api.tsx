import OpenPGP from 'react-native-fast-openpgp';
import {IMessage} from 'react-native-gifted-chat';

import {ChatMessage} from 'types/chat-message';

export const decryptChatMessage = async (
  userId: number,
  userPgpPrivateKey: string,
  message: ChatMessage,
): Promise<IMessage> => {
  const {id: messageId, text: encryptedText, creator, createdAt} = message;

  const decryptedText = await OpenPGP.decrypt(
    encryptedText,
    userPgpPrivateKey,
    userId.toString(),
  );

  return {
    _id: messageId,
    text: decryptedText,
    createdAt: new Date(createdAt),
    user: {
      _id: creator.id,
      name: creator.email,
    },
  };
};

export const sortChatMessagesByTime = (a: IMessage, b: IMessage) => {
  const timeA =
    typeof a.createdAt === 'number' ? a.createdAt : a.createdAt.getTime();
  const timeB =
    typeof b.createdAt === 'number' ? b.createdAt : b.createdAt.getTime();

  return timeB - timeA;
};
