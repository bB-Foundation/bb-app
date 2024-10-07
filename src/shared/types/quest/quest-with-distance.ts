import Quest from '.';

type QuestWithDistance = Quest & {
  /** distance from user */
  distanceInKm: number;
};

export default QuestWithDistance;
