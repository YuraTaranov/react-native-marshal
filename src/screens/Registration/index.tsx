import React from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation, useEffect} from '@hooks';
import {QuestionButton, ProfileUpdate} from '@components';
import styles from './styles';

type TProps = {};

const Registration: React.FC<TProps> = ({}) => {
  const {setOptions} = useNavigation();

  useEffect(() => {
    setOptions({
      headerRight: () => <QuestionButton />,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileUpdate isRegistration={true} />
    </SafeAreaView>
  );
};
export default connect()(Registration);
