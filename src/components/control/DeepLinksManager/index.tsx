import React from 'react';
import {useEffect} from '@hooks';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {setReferralUserId} from '@reducers/referral';

type TProps = {
  dispatch: Dispatch;
};

const DeepLinksManager: React.FC<TProps> = ({dispatch}) => {
  const handleDynamicLink = (link: FirebaseDynamicLinksTypes.DynamicLink) => {
    if (link?.url) {
      const userId = link?.url?.split('=')[1];
      dispatch(setReferralUserId(userId));
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link: FirebaseDynamicLinksTypes.DynamicLink | null) => {
        link && handleDynamicLink(link);
      });
  }, []);

  return null;
};

export default connect()(DeepLinksManager);
