import {StyleSheet} from '@components';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 16,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderColor: colors.gray_E1E1E8,
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
  },
  title: {
    fontFamily: fonts.interSemiBold_600,
    fontSize: 16,
    width: width - 100,
  },
  date: {
    marginTop: 4,
    fontSize: 13,
    color: colors.gray_6D6F79,
  },
  emptyContainer: {
    paddingTop: 32,
    alignItems: 'center',
  },
  emptyImage: {
    height: 208,
    width: 208,
  },
  emptyTitle: {
    marginTop: 32,
    fontSize: 18,
    fontFamily: fonts.interSemiBold_600,
    color: colors.gray_8D909D,
  },
});
