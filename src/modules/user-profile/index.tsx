import React from 'react';
import {View} from 'react-native';
import {Button, Divider, Text} from '@ui-kitten/components';
import FastImage from '@d11/react-native-fast-image';
import {hasNotch} from 'react-native-device-info';

import styles from './user-profile.styles';
import Page from 'components/page';
import CopyIcon from 'src/assets/images/copy.svg';
import AdvantageItem from './components/advantage-item';
import {useUserProfileLogic} from './user-profile.hooks';
import {copyAccountAddress, openBlockChainExplorer} from './user-profile.api';
import {SettingsButton} from './components/settings-button/button';
import {OverlayLoader} from 'components/overlay-loader';

export const UserProfile = () => {
  const {accountAddress, reducedAccountAddress, isLoading} =
    useUserProfileLogic();

  return (
    <Page isBottomTabContainer>
      {isLoading && <OverlayLoader />}

      <View
        style={[styles.header, hasNotch() ? undefined : styles.headerPaddings]}>
        <View style={styles.userView}>
          <FastImage
            style={styles.userImage}
            source={require('src/assets/images/blank-profile.png')}
          />

          <Text category="h4" style={styles.userName}>
            Bob Kuper
          </Text>
        </View>

        <SettingsButton />
      </View>

      <View style={styles.blockChainView}>
        <View style={styles.accountAddressBox}>
          <Text onPress={() => copyAccountAddress(accountAddress)}>
            {reducedAccountAddress}
          </Text>

          <Button
            onPress={() => copyAccountAddress(accountAddress)}
            style={styles.copyAccountAddressButton}
            appearance="ghost">
            <CopyIcon width={22} height={22} />
          </Button>
        </View>

        <Button
          onPress={() => openBlockChainExplorer(accountAddress)}
          size="large"
          appearance="ghost">
          View on Blockchain Explorer
        </Button>
      </View>

      <Divider />

      <View style={styles.userStatsView}>
        <AdvantageItem hint="Rank" value="54" />
        <AdvantageItem hint="Quests Completed" value="4" />
        <AdvantageItem hint="Loomi" value="7" />
      </View>
    </Page>
  );
};
