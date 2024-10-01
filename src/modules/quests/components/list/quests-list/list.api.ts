import {QuestCategory} from 'types/quest';

export const translateQuestCategory = (
  questCategory: QuestCategory,
): string => {
  const mapper = new Map<QuestCategory, string>([
    [QuestCategory.SPORTS_FITNESS, 'Sports & fitness'],
    [QuestCategory.NUTRITION_HEALTH, 'Nutrition & health'],
    [QuestCategory.ARTS, 'Arts'],
    [QuestCategory.EDUCATION, 'Education'],
    [QuestCategory.ENVIRONMENT, 'Environment'],
  ]);

  return mapper.get(questCategory) ?? questCategory;
};
