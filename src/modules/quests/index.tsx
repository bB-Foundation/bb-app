import React, {FC} from 'react';

import Page from 'components/page';
import {useQuestsLogic} from './quests.hooks';
import {Content} from './components/content';
import {Loader} from 'components/loader';

const Quests: FC = () => {
  const {geoPosition, showLoader} = useQuestsLogic();

  return (
    <Page isBottomTabContainer>
      {geoPosition && <Content geoPosition={geoPosition} />}

      {showLoader && <Loader />}
    </Page>
  );
};

export default Quests;
