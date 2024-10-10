import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({
  id: 'user-storage',
});

enum TokenNames {
  COMPLETED_TASKS = 'COMPLETED_TASKS',
}

export const markTaskAsCompleted = (taskId: number): void => {
  const serializedCompletedTasksList = storage.getString(
    TokenNames.COMPLETED_TASKS,
  );

  const completedTasksList: number[] = serializedCompletedTasksList
    ? JSON.parse(serializedCompletedTasksList)
    : [];

  if (!completedTasksList.includes(taskId)) {
    completedTasksList.push(taskId);
  }

  storage.set(TokenNames.COMPLETED_TASKS, JSON.stringify(completedTasksList));
};

export const getCompletedTasks = (): number[] => {
  const serializedCompletedTasksList = storage.getString(
    TokenNames.COMPLETED_TASKS,
  );

  const completedTasksList: number[] = serializedCompletedTasksList
    ? JSON.parse(serializedCompletedTasksList)
    : [];

  return completedTasksList;
};
