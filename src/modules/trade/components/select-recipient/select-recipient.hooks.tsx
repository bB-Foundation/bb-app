import {useEffect, useState} from 'react';
import {useSelector} from '@xstate/react';
import {debounce} from 'lodash';

import {UserProfile} from 'types/user';
import {fetUserByBbId} from './select-recipient.api';
import {tradingActor} from '../../api/trading-machine';
import {TradingMachinesIds} from '../../api/trade.api';
import {CreateTradeActor} from '../../api/create-trade-machine';

export const useFindRecipient = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);

  const [searchUserBbId, setSearchUserBbId] = useState('');

  const [selectedRecipientUser, setSelectedRecipientUser] =
    useState<UserProfile>();

  const createTradeActor = useSelector(
    tradingActor,
    snapshot =>
      snapshot.children[TradingMachinesIds.CREATE_TRADE] as CreateTradeActor,
  );

  const selectRecipient = () => {
    if (!selectedRecipientUser || !selectedRecipientUser.bbId) return;
    createTradeActor.send({
      type: 'selectRecipient',
      receiverBbId: selectedRecipientUser.bbId,
    });
  };

  const setData = (data: string) => setSearchUserBbId(data);

  const onChangeText = debounce(setData, 2000);

  // search user
  useEffect(() => {
    (async () => {
      if (!searchUserBbId) return setUsers([]);

      try {
        const user = await fetUserByBbId(searchUserBbId);
        setUsers([user]);
      } catch (error) {
        setUsers([]);
      }
    })();
  }, [searchUserBbId]);

  return {
    data: users,
    value: selectedRecipientUser,
    onChangeText,
    submit: selectRecipient,
    onChange: setSelectedRecipientUser,
  };
};
