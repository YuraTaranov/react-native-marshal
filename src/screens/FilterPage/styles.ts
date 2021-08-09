import {StyleSheet} from '@components';
import {colors} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_363434,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
