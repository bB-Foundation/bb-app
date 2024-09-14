import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import './configs';
import Navigator from './navigation';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <Navigator />
        </QueryClientProvider>
      </ApplicationProvider>

      <Toast position="top" topOffset={40} />
    </>
  );
}

export default App;
