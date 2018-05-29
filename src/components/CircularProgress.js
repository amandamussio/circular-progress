import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Platform, ART, AppState } from 'react-native';
const { Surface, Shape, Path, Group } = ART;

export default class CircularProgress extends PureComponent {

  state = {
    appState: AppState.currentState,
  }

  circlePath(cx, cy, r, startDegree, endDegree) {
    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, startDegree * Math.PI / 180, (endDegree * .9999) * Math.PI / 180, 1);
    return p;
  }

  clampFill = fill => Math.min(100, Math.max(0, fill));

  componentDidMount = () => AppState.addEventListener('change', this.handleAppStateChange);
  
  componentWillUnmount = () => AppState.removeEventListener('change', this.handleAppStateChange);

  handleAppStateChange = appState => this.setState({ appState });

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      backgroundColor,
      style,
      rotation,
      lineCap,
      arcSweepAngle,
      renderChild,
      fill,
    } = this.props;

    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, arcSweepAngle * this.clampFill(fill) / 100);
    const offset = size - (width * 2);

    return (
      <View style={style}>
        <Surface
          width={size}
          height={size}
          key={this.state.appState}
          style={{ backgroundColor: 'transparent' }}
        >
          <Group rotation={rotation - 90} originX={size/2} originY={size/2}>
              <Shape
              d={circlePath}
              stroke={tintColor}
              strokeWidth={width}
              strokeCap={lineCap}
              />
          </Group>
        </Surface>
        {renderChild && (
          <View style={childContainerStyle}>
            {renderChild(fill)}
          </View>
        )}
      </View>
    );
  }
}

CircularProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360
};
