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
  const {
    isLoading,
    showOverlayLoader,
    userEmail,
    accountAddress,
    reducedAccountAddress,
    loomis,
  } = useUserProfileLogic();

  if (isLoading) return <OverlayLoader />;

  return (
    <Page isBottomTabContainer>
      {showOverlayLoader && <OverlayLoader />}

      <View
        style={[styles.header, hasNotch() ? undefined : styles.headerPaddings]}>
        <View style={styles.userView}>
          <FastImage
            style={styles.userImage}
            source={require('src/assets/images/blank-profile.png')}
          />

          <Text category="h6" style={styles.userName}>
            {userEmail}
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
        <AdvantageItem
          hint="Rank"
          value={
            <Text category="s2" style={styles.advantageItemText}>
              ??
            </Text>
          }
        />
        <AdvantageItem
          hint="Quests Completed"
          value={
            <Text category="s2" style={styles.advantageItemText}>
              ??
            </Text>
          }
        />
        <AdvantageItem
          hint="Loomi"
          value={
            <Text category="s2" style={styles.advantageItemText}>
              {loomis.length}
            </Text>
          }
        />
      </View>
    </Page>
  );
};
