import React from 'react';
import {useEffect} from '@hooks';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

type TProps = {
  dispatch: Dispatch;
};

const fakeLink = 'https://dev.marshal.myapp.com.ua/referral?parent_user_id=123';

const DeepLinksManager: React.FC<TProps> = ({dispatch}) => {
  const handleDynamicLink = (link: any) => {
    // console.log('LINK foreground ===', link);
    if (link?.url === 'https://marshalukraine.page.link/test') {
      // dispatch()
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link: any) => {
        // console.log('LINK background ===', link);
        if (link?.url === 'https://marshalukraine.page.link/test') {
          // dispatch()
        }
      });
  }, []);

  return null;
};

export default connect()(DeepLinksManager);
