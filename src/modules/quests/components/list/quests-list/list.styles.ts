import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
  },
  itemHeader: {
    minHeight: 220,
    padding: 24,
    objectFit: 'contain',
  },
  cardTitle: {
    flex: 1,
  },
  distanceFromQuest: {
    flexShrink: 0,
    marginTop: 8,
  },
  itemHeaderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
  },
  itemStyxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: -8,
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  itemStyxText: {},
  itemStyxButton: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 24,
  },
  itemDescription: {
    marginHorizontal: -8,
    marginTop: 16,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemReactionsContainer: {
    flexDirection: 'row',
  },
  itemAddButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  gemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    right: 23,
    bottom: 16,
  },
  gemImage: {
    width: 35,
    height: 35,
  },
});
