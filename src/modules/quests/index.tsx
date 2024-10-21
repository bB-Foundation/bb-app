import React, {FC} from 'react';

import Page from 'components/page';
import {useQuestsLogic} from './quests.hooks';
import {Content} from './components/content';
import {Loader} from 'components/loader';
import {RequestGeoPermissionView} from './components/request-geo-permission-view';

const Quests: FC = () => {
  const {geoPosition, showLoader, isGeoPermissionProblem} = useQuestsLogic();

  return (
    <Page isBottomTabContainer>
      {geoPosition && <Content geoPosition={geoPosition} />}

      {showLoader && <Loader />}

      {isGeoPermissionProblem && <RequestGeoPermissionView />}
    </Page>
  );
};

export default Quests;
