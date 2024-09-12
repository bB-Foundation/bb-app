import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import Navigator from './navigation';

function App(): React.JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigator />
      </ApplicationProvider>
    </>
  );
}

export default App;
