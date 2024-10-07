import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

import './configs/axios';
import Navigator from './modules/navigation';
import store from './redux-store';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <Provider store={store}>
              <Navigator />
            </Provider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ApplicationProvider>
    </>
  );
}

export default App;
