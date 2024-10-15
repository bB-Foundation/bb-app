import {StyleService} from '@ui-kitten/components';

export const imageStyles = StyleService.create({
  root: {
    height: 360,
    position: 'absolute',
    width: '100%',
  },
});

export default StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  imageOverlay: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  title: {
    width: '65%',
  },
  bookButton: {
    position: 'absolute',
    bottom: 17,
    right: 22,
  },
  optionList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontSize: 17,
  },
  gemsContainer: {
    marginTop: 28,
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gemImage: {
    width: 35,
    height: 35,
  },
  advantagesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerContainer: {paddingVertical: 16, paddingHorizontal: 22, marginTop: 10},
});
