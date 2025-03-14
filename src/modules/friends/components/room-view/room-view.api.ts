import {ChatRoom} from 'types/chat-room';

/** Returns the second bbId in the chat room */
export const getSecondBBId = (
  currentUserId: number,
  chatRoom: ChatRoom,
): string =>
  chatRoom.participants.find(p => p.id !== currentUserId)?.bbId ?? '';
