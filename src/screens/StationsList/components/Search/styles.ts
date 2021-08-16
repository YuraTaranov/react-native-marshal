import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

const HeightBlock = 46;
const iconSize = 30;

export default StyleSheet.create({
  container: {
    width: '100%',
    height: HeightBlock,
    borderBottomColor: colors.gray_DADBDF,
    borderBottomWidth: 1.75,
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
    fontFamily: fonts.interExtraLight_200,
    fontSize: 17,
    lineHeight: 20,
    color: colors.gray_2D2D2D,
    textAlignVertical: 'bottom',
    padding: 0,
    margin: 0,
    paddingLeft: 2,
  },
  ITView: {
    overflow: 'visible',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
