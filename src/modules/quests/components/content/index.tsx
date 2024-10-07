import React, {FC} from 'react';

import {TopBar} from '../top-bar';
import {QuestsList} from '../quests-list';
import {useContentLogic} from './content.hooks';
import {ContentProps} from './content.types';

export const Content: FC<ContentProps> = ({geoPosition}) => {
  const {quests} = useContentLogic(geoPosition);

  return (
    <>
      <TopBar />

      <QuestsList quests={quests} />
    </>
  );
};
