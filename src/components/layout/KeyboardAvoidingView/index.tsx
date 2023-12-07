import React from 'react';
import {KeyboardAvoidingView as KAView, Platform, KeyboardAvoidingViewProps} from 'react-native';

const KeyboardAvoidingView: React.FC<TProps> = ({children, keyboardVerticalOffset, ...props}) => {
  const behavior: TBehavior = Platform.select({ios: 'padding', android: undefined});

  return (
    <KAView keyboardVerticalOffset={keyboardVerticalOffset || 0} behavior={behavior} {...props}>
      {children}
    </KAView>
  );
};

export default KeyboardAvoidingView;

type TProps = KeyboardAvoidingViewProps;
type TBehavior = 'padding' | 'height' | 'position' | undefined;
