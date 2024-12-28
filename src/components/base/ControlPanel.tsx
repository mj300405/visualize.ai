import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VisualizationState, VisualizationHandlers } from '../../types/visualization';
import { colors, spacing, typography } from '../../theme';

interface ControlPanelProps {
  state: VisualizationState;
  handlers: VisualizationHandlers;
  style?: object;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  state,
  handlers,
  style
}) => {
  const { isPlaying, currentStep, totalSteps, speed } = state;
  const { onPlay, onPause, onReset, onStep, onSpeedChange } = handlers;

  return (
    <View style={[styles.container, style]}>
      {/* Main Controls */}
      <View style={styles.mainControls}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={onReset}
        >
          <Ionicons name="refresh" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.stepButton}
          onPress={onStep}
        >
          <Ionicons name="play-skip-forward" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={isPlaying ? onPause : onPlay}
        >
          <Ionicons 
            name={isPlaying ? "pause" : "play"} 
            size={32} 
            color={colors.text} 
          />
        </TouchableOpacity>

        <View style={styles.speedControl}>
          <TouchableOpacity
            onPress={() => onSpeedChange(Math.max(0.5, speed - 0.5))}
          >
            <Ionicons name="remove" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <Text style={styles.speedText}>{speed}x</Text>
          <TouchableOpacity
            onPress={() => onSpeedChange(Math.min(2, speed + 0.5))}
          >
            <Ionicons name="add" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar,
            { width: `${(currentStep / totalSteps) * 100}%` }
          ]} 
        />
        <Text style={styles.progressText}>
          {currentStep} / {totalSteps}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  resetButton: {
    padding: spacing.sm,
  },
  stepButton: {
    padding: spacing.sm,
    marginRight: spacing.md,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.md,
  },
  speedControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  speedText: {
    ...typography.body,
    color: colors.textSecondary,
    marginHorizontal: spacing.sm,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 2,
    marginTop: spacing.md,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});

export default ControlPanel;