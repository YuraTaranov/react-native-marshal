import {StyleSheet} from '@components';
import {colors, fonts, bottom} from '@constants';

export default StyleSheet.create({
  container: {
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
  youCanAdd: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.gray_6D6F79,
    marginBottom: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 16,
    marginBottom: bottom,
  },
});
