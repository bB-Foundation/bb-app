import React, {FC} from 'react';

import Page from 'components/page';
import {useQuestsLogic} from './quests.hooks';
import {OverlayLoader} from 'components/overlay-loader';
import {Content} from './components/content';

const Quests: FC = () => {
  const {geoPosition, showLoader} = useQuestsLogic();

  return (
    <Page isSafeContainer={false}>
      {geoPosition && <Content geoPosition={geoPosition} />}

      {showLoader && <OverlayLoader />}
    </Page>
  );
};

export default Quests;
