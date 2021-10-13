import {StyleSheet} from '@components';
import {colors, width, bottom} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: colors.green_00AE36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  innerCircle: {
    height: 6,
    width: 6,
    borderRadius: 50,
    backgroundColor: colors.green_00AE36,
  },
  pointText: {
    fontSize: 16,
    color: colors.black_000000,
    marginLeft: 16,
    width: width - 70,
  },
  dotsContainer: {
    marginTop: 4,
  },
  dot: {
    backgroundColor: colors.green_00AE36,
    height: 4,
    width: 4,
    borderRadius: 50,
    marginBottom: 5,
    marginLeft: 8,
  },
  fuelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
  },
  fuelText: {
    fontSize: 16,
    color: colors.black_000000,
    marginLeft: 12,
  },
  scrollView: {
    marginTop: 32,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: bottom,
  },
});
