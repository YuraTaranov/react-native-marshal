import {StyleSheet} from '@components';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
    flexDirection: 'row',
  },
  newMessageCircle: {
    height: 8,
    width: 8,
    borderRadius: 50,
    backgroundColor: colors.green_00AE36,
    position: 'absolute',
    zIndex: 2,
    right: 2,
    top: 2,
  },
  titleContainer: {
    marginLeft: 16,
  },
  title: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 16,
    width: width - 72,
  },
  date: {
    marginTop: 4,
    fontSize: 13,
    color: colors.gray_6D6F79,
  },
});
