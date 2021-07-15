import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    // paddingBottom: ios ? bottom : longScreen ? 8 : 0,
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 10
    // ...shadowBlock,
  },
  eachScreen: {
    // width: width / 5,
    paddingTop: 8,
    // paddingBottom: !bottom ? 8 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    // lineHeight: ,
    // marginTop: 4,
  },
  textActive: {
  },
});
