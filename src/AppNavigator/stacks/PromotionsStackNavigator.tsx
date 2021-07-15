import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Promotions } from '@screens';
import { connect } from 'react-redux';
import { TGlobalState } from '@types';
import { useTranslation } from '@hooks';
import { defaultStackOptions } from '../options';


type TProps = {
}

const PromotionsStack = createStackNavigator();

const PromotionsStackNavigator: React.FC<TProps> = ({ }) => {

  const { t } = useTranslation()

  return (
    <PromotionsStack.Navigator screenOptions={{
      ...defaultStackOptions
    }} >
      <PromotionsStack.Screen
        name="Promotions"
        component={Promotions}
        options={{
          title: 'Promotions'
        }}
      />
    </PromotionsStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({

})

export default connect(mapStateToProps)(PromotionsStackNavigator)

