import React, {FC} from 'react';

import Page from 'components/page';
import {useQuestsLogic} from './quests.hooks';
import { QuestsList } from './components/list/quests-list';

const Quests: FC = () => {
  const {quests} = useQuestsLogic();

  return (
    <Page>
      <QuestsList quests={quests} />
    </Page>
  );
};

export default Quests;
