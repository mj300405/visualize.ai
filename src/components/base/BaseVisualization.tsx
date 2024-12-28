import React from 'react';
import { View, StyleSheet, GestureResponderEvent, PanResponder } from 'react-native';
import Svg from 'react-native-svg';
import { BaseVisualizationProps } from '../../types/visualization';
import { colors, spacing } from '../../theme';
import ControlPanel from './ControlPanle';
import ParameterControls from './ParameterControls';

export interface BaseVisualizationContainerProps<T extends BaseVisualizationProps> {
  width: number;
  height: number;
  data: T['data'];
  state: T['state'];
  config: T['config'];
  handlers: T['handlers'];
  onPress?: (event: GestureResponderEvent) => void;
  onMove?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

export const BaseVisualizationContainer = <T extends BaseVisualizationProps>({
  width,
  height,
  state,
  config,
  handlers,
  onPress,
  onMove,
  children
}: BaseVisualizationContainerProps<T>) => {
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderStart: onPress,
        onPanResponderMove: onMove,
      }),
    [onPress, onMove]
  );

  return (
    <View style={styles.container}>
      {/* Main visualization area */}
      <View 
        style={[styles.visualizationContainer, { width, height }]}
        {...panResponder.panHandlers}
      >
        <View style={{ width, height }}>
          <Svg width={width} height={height}>
            {children}
          </Svg>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <ControlPanel
          state={state}
          handlers={handlers}
          style={styles.controls}
        />

        {/* Parameters */}
        {config?.parameters && (
          <ParameterControls
            parameters={config.parameters}
            onParameterChange={handlers.onParameterChange}
            style={styles.parameters}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  visualizationContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    margin: spacing.md,
  },
  controlsContainer: {
    paddingHorizontal: spacing.md,
  },
  controls: {
    marginBottom: spacing.md,
  },
  parameters: {
    marginBottom: spacing.md,
  },
});

export default BaseVisualizationContainer;