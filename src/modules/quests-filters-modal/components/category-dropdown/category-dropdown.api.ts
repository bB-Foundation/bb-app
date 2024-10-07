import {translateQuestCategory} from 'src/shared/api/quests';
import {QuestCategory} from 'types/quest';

export const data = [
  {label: 'No category', value: null},
  {
    label: translateQuestCategory(QuestCategory.SPORTS_FITNESS),
    value: QuestCategory.SPORTS_FITNESS,
  },
  {
    label: translateQuestCategory(QuestCategory.NUTRITION_HEALTH),
    value: QuestCategory.NUTRITION_HEALTH,
  },
  {
    label: translateQuestCategory(QuestCategory.ARTS),
    value: QuestCategory.ARTS,
  },
  {
    label: translateQuestCategory(QuestCategory.EDUCATION),
    value: QuestCategory.EDUCATION,
  },
  {
    label: translateQuestCategory(QuestCategory.ENVIRONMENT),
    value: QuestCategory.ENVIRONMENT,
  },
];
