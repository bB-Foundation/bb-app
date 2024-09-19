import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useNavigator = () => {
  const insets = useSafeAreaInsets();

  const toastTopOffset = insets.top + 15;

  return {toastTopOffset};
};
