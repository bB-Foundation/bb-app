import React from 'react';
import {MenuItem, OverflowMenu, Button} from '@ui-kitten/components';

import styles from './button.styles';
import SettingsIcon from 'src/assets/images/settings.svg';
import SignOutIcon from 'src/assets/images/sign-out.svg';
import {ItemTitle} from '../item-title';
import {useButtonHandlers} from './button.hooks';

export const SettingsButton = () => {
  const [visible, setVisible] = React.useState(false);

  const {logOutHandler} = useButtonHandlers();

  const onLogOutPress = () => {
    setVisible(false);
    logOutHandler();
  };

  const IconButton = () => (
    <Button
      onPress={() => setVisible(true)}
      style={styles.button}
      appearance="ghost">
      <SettingsIcon width={38} height={38} />
    </Button>
  );

  return (
    <OverflowMenu
      visible={visible}
      anchor={IconButton}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}>
      <MenuItem
        title={evaProps => <ItemTitle evaProps={evaProps} title="Log out" />}
        onPress={onLogOutPress}
        accessoryLeft={<SignOutIcon width={32} height={32} />}
      />
    </OverflowMenu>
  );
};
