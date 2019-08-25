import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, ViewPropTypes } from 'react-native';

{
  /* <Carousel snapToInterval={SCALE(210) + 20} horizontalInset={10}>
    // Content
</Carousel> */
}

export default class Carousel extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    dataLength: PropTypes.number,
    onScroll: PropTypes.func,
    showsHorizontalScrollIndicator: PropTypes.bool,
    snapToInterval: PropTypes.number,
    snapToAlignment: PropTypes.string,
    verticalInset: PropTypes.number,
    horizontalInset: PropTypes.number,
    scrollEventThrottle: PropTypes.number,
    decelerationRate: PropTypes.number,
    initialPage: PropTypes.number,
    scrollIndicator: PropTypes.bool,
    scrollIndicatorStyle: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    snapToAlignment: 'center',
    showsHorizontalScrollIndicator: false,
    scrollIndicator: false,
    scrollEventThrottle: 16,
    snapToInterval: 0,
    verticalInset: 0,
    horizontalInset: 0,
    decelerationRate: 0.5,
    dataLength: 0,
    initialPage: 0,
    onScroll: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const { horizontalInset, verticalInset, initialPage, snapToInterval } = this.props;
    setTimeout(() => {
      this.scrollView.scrollTo({
        x: initialPage * snapToInterval - horizontalInset,
        y: -verticalInset,
      });
    }, 0);
  }

  handleScroll(event) {
    const { onScroll, snapToInterval } = this.props;
    const currentIndex = Math.ceil(event.nativeEvent.contentOffset.x / snapToInterval);
    this.setState({ currentIndex });
    onScroll(currentIndex);
  }

  componentDidCatch(error, { text, componentStack }) {
    logCustomError({ name: 'Root', reason: text, stack: componentStack });
  }

  render() {
    const {
      children,
      snapToInterval,
      snapToAlignment,
      horizontalInset,
      verticalInset,
      scrollEventThrottle,
      decelerationRate,
      showsHorizontalScrollIndicator,
      dataLength,
      scrollIndicator,
      scrollIndicatorStyle,
      contentContainerStyle,
      ...props
    } = this.props;
    const { currentIndex } = this.state;
    // const smallerWidth = parseInt(WIDTH / 2, 10);
    return (
      <Fragment>
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          contentInsetAdjustmentBehavior="automatic"
          horizontal
          pagingEnabled
          directionalLockEnabled
          decelerationRate={decelerationRate}
          snapToInterval={snapToInterval}
          scrollEventThrottle={scrollEventThrottle}
          contentContainerStyle={contentContainerStyle}
          // snapToOffsets={[
          //   1 * snapToInterval - (WIDTH - snapToInterval) / 2,
          //   2 * snapToInterval - (WIDTH - snapToInterval) / 2,
          //   3 * snapToInterval - (WIDTH - snapToInterval) / 2,
          //   4 * snapToInterval - (WIDTH - snapToInterval) / 2,
          // ]}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          onScroll={this.handleScroll}
          snapToAlignment={snapToAlignment}
          contentInset={{
            top: verticalInset,
            left: horizontalInset,
            bottom: verticalInset,
            right: horizontalInset,
          }}
          keyboardShouldPersistTaps="always"
          {...props}
        >
          {children}
        </ScrollView>
        {dataLength > 0 && scrollIndicator && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              height: 60,
              alignItems: 'center',
            }}
          >
            {range(dataLength).map(i => (
              <View
                key={i}
                style={[
                  {
                    height: 10,
                    width: 10,
                    backgroundColor: currentIndex + 1 === i ? '#d8d8d8' : '#818181',
                    marginHorizontal: 8,
                    borderRadius: 5,
                  },
                  scrollIndicatorStyle,
                ]}
              />
            ))}
          </View>
        )}
      </Fragment>
    );
  }
}
