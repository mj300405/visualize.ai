import React, { useState } from 'react';
import { View, StyleSheet, GestureResponderEvent, ScrollView } from 'react-native';
import Svg from 'react-native-svg';
import { BaseVisualizationProps } from '../../types/visualization';
import { colors, spacing } from '../../theme';
import ControlPanel from './ControlPanel';
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
  onControlPress?: (event: GestureResponderEvent) => void;
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
  onControlPress,
  children
}: BaseVisualizationContainerProps<T>) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleTouchStart = (event: GestureResponderEvent) => {
    setScrollEnabled(false);
    onPress?.(event);
  };

  const handleTouchEnd = () => {
    setScrollEnabled(true);
  };

  const handleTouchMove = (event: GestureResponderEvent) => {
    onMove?.(event);
  };

  return (
    <ScrollView 
      style={styles.container} 
      bounces={false}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={scrollEnabled}
    >
      {/* Main visualization area */}
      <View style={styles.visualizationContainer}>
        <View 
          style={[styles.svgWrapper, { height }]}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <Svg 
            width="100%" 
            height="100%" 
            viewBox={`0 0 ${width} ${height}`} 
            preserveAspectRatio="xMidYMid meet"
          >
            {children}
          </Svg>
        </View>
      </View>

      {/* Controls Section */}
      <View style={styles.controlsContainer}>
        <ControlPanel
          state={state}
          handlers={handlers}
          style={styles.controls}
        />

        {/* Parameters */}
        {config?.parameters && config.parameters.length > 0 && (
          <View style={styles.parametersWrapper}>
            <ParameterControls
              parameters={config.parameters}
              onParameterChange={handlers.onParameterChange}
              style={styles.parameters}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  visualizationContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  svgWrapper: {
    width: '100%',
    height: '100%',
  },
  controlsContainer: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  controls: {
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
  },
  parametersWrapper: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: spacing.md,
  },
  parameters: {
    padding: spacing.md,
  },
});

export default BaseVisualizationContainer;