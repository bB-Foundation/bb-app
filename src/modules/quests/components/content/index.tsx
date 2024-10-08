import React, {FC} from 'react';

import {TopBar} from '../top-bar';
import {QuestsList} from '../quests-list';
import {useContentLogic} from './content.hooks';
import {ContentProps} from './content.types';
import {QuestsMap} from '../quests-map';
import {TabsBar} from '../tabs-bar';

export const Content: FC<ContentProps> = ({geoPosition}) => {
  const {quests, selectedTabIndex, setSelectedTabIndex} =
    useContentLogic(geoPosition);

  return (
    <>
      <TopBar />

      <TabsBar
        selectedIndex={selectedTabIndex}
        onSelect={setSelectedTabIndex}
      />

      {selectedTabIndex === 0 && <QuestsMap quests={quests} />}

      {selectedTabIndex === 1 && <QuestsList quests={quests} />}
    </>
  );
};
