import React from 'react';
import {useCallback} from '@hooks';
import {Icon, TouchableOpacity} from '@components';
import styles from './styles';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {setSupport} from '@reducers/modalController';
import {colors} from '@constants';

type TProps = {
  dispatch: Dispatch;
};

const QuestionButton: React.FC<TProps> = ({dispatch}) => {
  const onPress = useCallback(() => {
    dispatch(setSupport(true));
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon size={24} name="support" color={colors.black_000000} />
    </TouchableOpacity>
  );
};

export default connect()(QuestionButton);
