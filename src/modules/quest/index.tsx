import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {Button, Card, Text, useStyleSheet} from '@ui-kitten/components';

import {useButtonHandlers, useQuestLogic} from './quest.hooks';
import Page from 'components/page';
import ImageOverlay from 'components/image-overlay';
import AdvantageItem from './components/advantage-item';
import themedStyles from './quest.styles';

const Quest: FC = () => {
  const {quest, isUserParticipateQuest} = useQuestLogic();

  const {joinQuestHandler, leaveQuestHandler} = useButtonHandlers();

  const styles = useStyleSheet(themedStyles);

  if (!quest) return null;

  const renderCardFooter = (): React.ReactElement => (
    <View style={styles.footerContainer}>
      <View style={styles.optionList}>
        <View style={styles.advantagesContainer}>
          <AdvantageItem hint="Players" value={quest.users.length} />
          <AdvantageItem hint="Status" value={quest.status} />
          <AdvantageItem hint="Difficulty" value={quest.difficulty} />
          <AdvantageItem hint="From you" value="300m" />
        </View>
      </View>
    </View>
  );

  return (
    <Page>
      <View style={styles.container}>
        <ImageOverlay style={styles.image} />
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
            <Text category="h4">100</Text>
          </View>

          {/* TODO add loading indicator inside button and disable it while loading */}
          {/* TODO don't show buttons before isUserParticipateQuest loaded */}
          {isUserParticipateQuest ? (
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
      </View>
    </Page>
  );
};

export default Quest;
