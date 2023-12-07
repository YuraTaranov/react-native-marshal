import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

const HeightBlock = 46;
const iconSize = 30;

export default StyleSheet.create({
  container: {
    width: '100%',
    height: HeightBlock,
    borderBottomColor: colors.gray_DADBDF,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 8,
  },
  iconView: {
    width: iconSize,
    height: HeightBlock,
    marginRight: 6,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  cleanView: {
    paddingTop: 17,
    paddingRight: 5,
    width: iconSize,
    height: HeightBlock,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  blockInput: {
    flex: 1,
    height: HeightBlock,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
  text: {
    overflow: 'visible',
    fontSize: 16,
    lineHeight: 20,
    color: colors.black_1B1B1B,
    textAlignVertical: 'bottom',
    padding: 0,
    margin: 0,
    width: '100%',
  },
  ITView: {
    overflow: 'visible',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
