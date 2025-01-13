import React, {FC, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from '@xstate/react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {UserProfile} from 'types/user';
import {fetUserByBbId} from './select-recipient.api';
import {tradingActor} from '../../api/trading-machine';
import {TradingMachinesIds} from '../../api/trade.api';
import {CreateTradeActor} from '../../api/create-trade-machine';

export const SelectRecipient: FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);

  const [searchUserBbId, setSearchUserBbId] = useState('');

  const [selectedRecipientUser, setSelectedRecipientUser] =
    useState<UserProfile>();

  const createTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.CREATE_TRADE] as CreateTradeActor,
  );

  const {top} = useSafeAreaInsets();
  const mainContainerMarginTop = top ? 0 : 16;

  const selectRecipient = () => {
    if (!selectedRecipientUser || !selectedRecipientUser.bbId) return;
    createTradeActor.send({
      type: 'selectRecipient',
      receiverBbId: selectedRecipientUser.bbId,
    });
  };

  // search user
  useEffect(() => {
    (async () => {
      const user = await fetUserByBbId(searchUserBbId);
      if (!user) return;

      setUsers([user]);
    })();
  }, [searchUserBbId]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        marginTop: mainContainerMarginTop,
      }}>
      <Text category="h6">Select user for trade</Text>

      <Dropdown
        data={users}
        value={selectedRecipientUser}
        onChange={setSelectedRecipientUser}
        labelField="bbId"
        valueField="bbId"
        placeholder="Users"
        search
        searchField="bbId"
        searchPlaceholder="Find user by bbId"
        style={{marginTop: 16}}
        onChangeText={setSearchUserBbId}
      />

      <Button
        onPress={selectRecipient}
        style={{marginTop: 'auto'}}
        disabled={!selectedRecipientUser}>
        NEXT
      </Button>
    </View>
  );
};
