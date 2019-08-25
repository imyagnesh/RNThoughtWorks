import React from 'react';
import { View, Text, Button, Animated, SafeAreaView, PanResponder } from 'react-native';

const settings = () => {
  const animatedValue = new Animated.ValueXY({ x: 0, y: 0 });

  const startAnimation = () => {
    Animated.parallel(
      [
        // after decay, in parallel:
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(animatedValue1, {
          toValue: 1,
          duration: 1000,
        }),
      ],
      {
        useNativeDriver: true,
      },
    ).start();
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: (evt, gestureState) => {
      return Animated.event([null, { dx: animatedValue.x, dy: animatedValue.y }])(
        evt,
        gestureState,
      );
      // Animated.timing(animatedValue, {
      //   toValue: {x:gestureState. }
      // }).start()
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      Animated.spring(animatedValue, {
        toValue: { x: 0, y: 0 },
        speed: 5,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Settings Page</Text>
      <Button title="Click Me" onPress={startAnimation} />
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [
            {
              translateY: animatedValue.y,
            },
            {
              translateX: animatedValue.x,
            },
          ],
        }}
      >
        <Animated.View
          style={{
            left: 30,
            height: 100,
            width: 100,
            backgroundColor: 'red',
          }}
        >
          <Text>Hello</Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default settings;
