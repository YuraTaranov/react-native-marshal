import {StyleSheet} from '@components';
import {colors} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
    paddingTop: 16,
  },
  itemBlockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemContainer: {
    marginLeft: 16,
  },
  separator: {
    marginVertical: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingHorizontal: 16,
  },
  itemTitle: {
    color: colors.gray_6D6F79,
    fontSize: 16,
    textTransform: 'lowercase',
  },
});
