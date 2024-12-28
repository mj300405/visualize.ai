import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Parameter } from '../../types/visualization';
import { colors, spacing, typography } from '../../theme';

interface ParameterControlsProps {
  parameters: Parameter[];
  onParameterChange: (parameterId: string, value: any) => void;
  style?: object;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  parameters,
  onParameterChange,
  style,
}) => {
  const renderParameter = (param: Parameter) => {
    switch (param.type) {
      case 'range':
        return (
          <View key={param.id} style={styles.parameterContainer}>
            <View style={styles.parameterHeader}>
              <Text style={styles.parameterName}>{param.name}</Text>
              <Text style={styles.parameterValue}>{param.value}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={param.min}
              maximumValue={param.max}
              step={param.step}
              value={param.value}
              onValueChange={(value) => onParameterChange(param.id, value)}
              minimumTrackTintColor={colors.primary}
              maximumTrackTintColor={colors.surfaceAlt}
              thumbTintColor={colors.primary}
            />
          </View>
        );

      case 'select':
        return (
          <View key={param.id} style={styles.parameterContainer}>
            <Text style={styles.parameterName}>{param.name}</Text>
            <View style={styles.selectContainer}>
              {param.options?.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.selectOption,
                    param.value === option.value && styles.selectOptionSelected,
                  ]}
                  onPress={() => onParameterChange(param.id, option.value)}
                >
                  <Text
                    style={[
                      styles.selectOptionText,
                      param.value === option.value && styles.selectOptionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'checkbox':
        return (
          <View key={param.id} style={styles.parameterContainer}>
            <Text style={styles.parameterName}>{param.name}</Text>
            <Switch
              value={param.value}
              onValueChange={(value) => onParameterChange(param.id, value)}
              trackColor={{ false: colors.surfaceAlt, true: colors.primary }}
              thumbColor={colors.text}
            />
          </View>
        );

      case 'number':
        return (
          <View key={param.id} style={styles.parameterContainer}>
            <Text style={styles.parameterName}>{param.name}</Text>
            <View style={styles.numberControl}>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => onParameterChange(param.id, param.value - (param.step || 1))}
              >
                <Text style={styles.numberButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.numberValue}>{param.value}</Text>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={() => onParameterChange(param.id, param.value + (param.step || 1))}
              >
                <Text style={styles.numberButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={[styles.container, style]}>
      {parameters.map(renderParameter)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
  },
  parameterContainer: {
    marginBottom: spacing.md,
  },
  parameterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  parameterName: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  parameterValue: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  selectOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  selectOptionSelected: {
    backgroundColor: colors.primary,
  },
  selectOptionText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  selectOptionTextSelected: {
    color: colors.text,
  },
  numberControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  numberButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    ...typography.button,
    color: colors.text,
  },
  numberValue: {
    ...typography.body,
    color: colors.text,
    marginHorizontal: spacing.md,
  },
});

export default ParameterControls;