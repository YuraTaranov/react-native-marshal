import {StyleSheet} from '@components';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    textAlign: 'center',
    fontFamily: fonts.interSemiBold_600,
    fontSize: 16,
  },
});
