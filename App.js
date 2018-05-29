import React, {PureComponent} from 'react';
import { StyleSheet, Text, View, PanResponder } from 'react-native';
import { AnimatedCircularProgress } from './src/components';

export default class App extends PureComponent {

  render() {
    return (
      <View style={{flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#152d44',
        padding: 50}}>
        <AnimatedCircularProgress
        size={150}
        width={10}
        fill={100}
        duration={10000}
        tintColor="yellow"
        onAnimationComplete={() => console.log('onAnimationComplete')}
         />
    </View>
    );
  }
}

