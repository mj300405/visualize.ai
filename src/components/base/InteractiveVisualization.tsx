import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { BaseVisualizationProps } from '../../types/visualization';
import BaseVisualizationContainer from './BaseVisualization';
import VisualizationModal from './VisualizationModal';

export interface InteractiveVisualizationProps<T extends BaseVisualizationProps> {
  width: number;
  height: number;
  data: T['data'];
  state: T['state'];
  config: T['config'];
  handlers: T['handlers'];
  onInteraction?: (event: GestureResponderEvent) => void;
  onMove?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

function InteractiveVisualization<T extends BaseVisualizationProps>({
  width,
  height,
  data,
  state,
  config,
  handlers,
  onInteraction,
  onMove,
  children
}: InteractiveVisualizationProps<T>) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Preview Visualization */}
      <TouchableOpacity 
        style={styles.previewContainer}
        onPress={() => setModalVisible(true)}
      >
        <BaseVisualizationContainer<T>
          height={height}
          width={width}
          data={data}
          state={state}
          config={config}
          handlers={handlers}
        >
          {children}
        </BaseVisualizationContainer>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Tap to interact</Text>
        </View>
      </TouchableOpacity>

      {/* Full-screen Modal */}
      <VisualizationModal<T>
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPress={onInteraction}
        onMove={onMove}
        width={width}
        height={height}
        data={data}
        state={state}
        config={config}
        handlers={handlers}
      >
        {children}
      </VisualizationModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
  },
});

export default InteractiveVisualization;