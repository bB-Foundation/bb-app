import React, {FC} from 'react';
import {Image, ListRenderItemInfo, View} from 'react-native';
import {Button, Layout, Text, Card, List} from '@ui-kitten/components';

import Quest from 'types/quest';
import styles from './list.styles';
import {translateQuestCategory} from './list.api';
import ImageOverlay from 'components/image-overlay';
import {useQuestsListLogic} from './quests-list.hooks';

type Props = {
  quests: Quest[];
};

export const QuestsList: FC<Props> = ({quests}) => {
  const {goToQuest} = useQuestsListLogic();

  const renderItemHeader = (
    info: ListRenderItemInfo<Quest>,
  ): React.ReactElement => (
    <ImageOverlay style={styles.itemHeader}>
      <View style={styles.itemHeaderDetails}>
        <Text category="h4" status="control" style={styles.cardTitle}>
          {info.item.title}
        </Text>
        <Text category="s1" status="control" style={styles.distanceFromQuest}>
          30000m
        </Text>
      </View>

      <View style={styles.gemsContainer}>
        <Image
          style={styles.gemImage}
          source={require('src/assets/images/quests/assets/gem-white.png')}
        />
        <Text category="h4" status="control">
          100
        </Text>
      </View>
    </ImageOverlay>
  );

  const renderItem = (quest: ListRenderItemInfo<Quest>): React.ReactElement => {
    const playersAmount = quest.item.users.length;

    const playerLabel = playersAmount > 1 ? 'players' : 'player';

    const playersAmountLabel = playersAmount
      ? `${playersAmount} active ${playerLabel}`
      : 'No active players yet';

    return (
      <Card
        style={styles.item}
        onPress={() => goToQuest(quest.item)}
        header={() => renderItemHeader(quest)}>
        <Layout style={styles.itemStyxContainer} level="2">
          <Text style={styles.itemStyxText} category="h6">
            {playersAmountLabel}
          </Text>
          <View>
            <Button style={styles.itemStyxButton} size="small">
              {translateQuestCategory(quest.item.category)}
            </Button>
          </View>
        </Layout>
        <Text style={styles.itemDescription}>{quest.item.description}</Text>
      </Card>
    );
  };

  return (
    <List
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={quests}
      renderItem={renderItem}
      scrollEnabled={false}
    />
  );
};
