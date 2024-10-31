import React, {FC} from 'react';
import {ListRenderItemInfo, View} from 'react-native';
import {Button, Layout, Text, Card, List} from '@ui-kitten/components';
import FastImage from '@d11/react-native-fast-image';

import styles from './list.styles';
import ImageOverlay from 'components/image-overlay';
import {useQuestsListLogic} from './quests-list.hooks';
import {translateQuestCategory} from 'src/shared/api/quests';
import QuestWithDistance from 'types/quest/quest-with-distance';
import {QuestsListProps} from './quests-list.types';
import {getDistanceFromQuest} from './quests-list.api';
import {NoQuests} from '../no-quests';
import Delayed from 'hooks/delayed';

export const QuestsList: FC<QuestsListProps> = ({quests, geoPosition}) => {
  const {showLoader, goToQuest} = useQuestsListLogic();

  const renderItemHeader = (
    quest: ListRenderItemInfo<QuestWithDistance>,
  ): React.ReactElement => {
    const distanceLabel = getDistanceFromQuest(geoPosition.coords, quest.item);

    return (
      <ImageOverlay style={styles.itemHeader}>
        <FastImage
          style={styles.headerImage}
          source={{uri: quest.item.imgUrl}}
        />

        <View style={styles.headerContentContainer}>
          <View style={styles.itemHeaderDetails}>
            <Text category="h4" status="control" style={styles.cardTitle}>
              {quest.item.title}
            </Text>
            <Text
              category="s1"
              status="control"
              style={styles.distanceFromQuest}>
              {distanceLabel}
            </Text>
          </View>

          <View style={styles.gemsContainer}>
            <FastImage
              style={styles.gemImage}
              source={require('src/assets/images/quests/assets/gem-white.png')}
            />
            <Text category="h4" status="control">
              {quest.item.tasks.length}
            </Text>
          </View>
        </View>
      </ImageOverlay>
    );
  };

  const renderItem = (
    quest: ListRenderItemInfo<QuestWithDistance>,
  ): React.ReactElement => {
    const playersAmount = quest.item.users.length;

    const playerLabel = playersAmount > 1 ? 'players' : 'player';

    const playersAmountLabel = playersAmount
      ? `${playersAmount} active ${playerLabel}`
      : 'No active players yet';

    return (
      <Card
        style={styles.item}
        onPress={() => goToQuest(quest.item)}
        header={() => renderItemHeader(quest)}
        testID={`quest-card-${quest.item.id}`}>
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
      keyExtractor={item => item.id.toString()}
      scrollEnabled={false}
      ListEmptyComponent={
        showLoader ? null : (
          <Delayed waitBeforeShow={20}>
            <NoQuests />
          </Delayed>
        )
      }
    />
  );
};
