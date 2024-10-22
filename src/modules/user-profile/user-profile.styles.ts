import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 100,
  },
  headerPaddings: {
    paddingTop: 16,
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  userImage: {width: 54, height: 54, borderRadius: 100},
  userName: {fontWeight: 'normal'},
  blockChainView: {alignItems: 'center', marginTop: 32},
  accountAddressBox: {flexDirection: 'row', alignItems: 'center', gap: 4},
  copyAccountAddressButton: {width: 22, height: 22},
  userStatsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 32,
  },
});
