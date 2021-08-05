import {StyleSheet} from '@components';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
  },
  name: {
    flex: 1,
    marginLeft: 16,
    color: colors.black_1B1B1B,
    fontSize: 16,
    fontFamily: fonts.interSemiBold_600,
  },
});
