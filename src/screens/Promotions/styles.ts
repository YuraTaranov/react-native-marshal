import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  emptyTitle: {
    textAlign: 'center',
    fontFamily: fonts.interSemiBold_600,
    fontSize: 16,
  },
});
