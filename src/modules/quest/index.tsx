import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {Button, Card, Text, useStyleSheet} from '@ui-kitten/components';
import FastImage from '@d11/react-native-fast-image';

import {useButtonHandlers, useQuestLogic} from './quest.hooks';
import Page from 'components/page';
import ImageOverlay from 'components/image-overlay';
import AdvantageItem from './components/advantage-item';
import themedStyles, {imageStyles} from './quest.styles';
import QuestTasksMap from './components/quest-tasks-map';

const Quest: FC = () => {
  const {quest, isUserParticipateQuest, distanceFromQuestInKm} =
    useQuestLogic();

  const {joinQuestHandler, leaveQuestHandler} = useButtonHandlers();

  const styles = useStyleSheet(themedStyles);

  if (!quest) return null;

  const renderCardFooter = (): React.ReactElement => {
    const playersHint =
      quest.users.length > 1 || quest.users.length === 0 ? 'players' : 'player';

    return (
      <View style={styles.footerContainer}>
        <View style={styles.optionList}>
          <View style={styles.advantagesContainer}>
            <AdvantageItem hint={playersHint} value={quest.users.length} />
            <AdvantageItem hint="Status" value={quest.status} />
            <AdvantageItem
              hint="From you"
              value={
                distanceFromQuestInKm === undefined
                  ? ''
                  : `${Math.round(distanceFromQuestInKm * 1000)}m`
              }
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Page isBottomTabContainer>
      <View style={styles.container}>
        <FastImage style={imageStyles.root} source={{uri: quest.imgUrl}} />
        <ImageOverlay style={styles.imageOverlay} />

        <Card
          style={styles.bookingCard}
          appearance="filled"
          disabled={true}
          footer={renderCardFooter}>
          <Text style={styles.title} category="h6">
            {quest.title}
          </Text>

          <View style={styles.gemsContainer}>
            <Image
              // @ts-ignore
              style={styles.gemImage}
              source={require('src/assets/images/quests/assets/gem-black.png')}
            />
            <Text category="h4">{quest.tasks.length}</Text>
          </View>

          {isUserParticipateQuest ===
          undefined ? null : isUserParticipateQuest ? (
            <Button
              style={styles.bookButton}
              onPress={() =>
                leaveQuestHandler({questId: quest.id, txHash: 'txHash'})
              }>
              Leave the quest
            </Button>
          ) : (
            <Button
              style={styles.bookButton}
              onPress={() =>
                joinQuestHandler({questId: quest.id, txHash: 'txHash'})
              }>
              Join the quest
            </Button>
          )}
        </Card>

        <Text style={styles.sectionLabel} category="s1">
          About
        </Text>
        <Text style={styles.description}>{quest.description}</Text>

        {quest.tasks.length > 0 && (
          <View>
            <Text style={styles.sectionLabel} category="s1">
              Tasks
            </Text>

            <QuestTasksMap questTasks={quest.tasks} />
          </View>
        )}
      </View>
    </Page>
  );
};

export default Quest;
