import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Stations } from '@screens';
import { connect } from 'react-redux';
import { TGlobalState } from '@types';
import { useTranslation } from '@hooks';
import { defaultStackOptions } from '../options';


type TProps = {
}

const StationsStack = createStackNavigator();

const StationsStackNavigator: React.FC<TProps> = ({ }) => {

  const { t } = useTranslation()

  return (
    <StationsStack.Navigator screenOptions={{
      ...defaultStackOptions
    }} >
      <StationsStack.Screen
        name="Stations"
        component={Stations}
        options={{
          title: 'Stations'
        }}
      />
    </StationsStack.Navigator>
  );
};

const mapStateToProps = (state: TGlobalState) => ({

})

export default connect(mapStateToProps)(StationsStackNavigator)

