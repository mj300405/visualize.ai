import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
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

  const handleValueChange = (parameterId: string, value: any) => {
    onParameterChange(parameterId, value);
  };

  const renderParameter = (param: Parameter) => {
    switch (param.type) {
      case 'range':
        return (
          <View key={param.id} style={styles.parameterContainer}>
            <View style={styles.parameterHeader}>
              <Text style={styles.parameterName}>{param.name}</Text>
              <Text style={styles.parameterValue}>
                {typeof param.value === 'number' ? param.value.toFixed(3) : param.value}
              </Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={param.min}
              maximumValue={param.max}
              step={param.step}
              value={param.value}
              onValueChange={(value) => handleValueChange(param.id, value)}
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
                  onPress={() => handleValueChange(param.id, option.value)}
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
              onValueChange={(value) => handleValueChange(param.id, value)}
              trackColor={{ false: colors.surfaceAlt, true: colors.primary }}
              thumbColor={colors.text}
            />
          </View>
        );

      case 'number':
        return (
          <View key={param.id} style={styles.parameterContainer}>
            <View style={styles.parameterHeader}>
              <Text style={styles.parameterName}>{param.name}</Text>
              <View style={styles.numberControl}>
                <TouchableOpacity
                  style={styles.numberButton}
                  onPress={() => handleValueChange(param.id, Math.max((param.min || 0), param.value - (param.step || 1)))}
                >
                  <Text style={styles.numberButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.numberValue}>{param.value}</Text>
                <TouchableOpacity
                  style={styles.numberButton}
                  onPress={() => handleValueChange(param.id, Math.min((param.max || Infinity), param.value + (param.step || 1)))}
                >
                  <Text style={styles.numberButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {parameters?.map(renderParameter)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  parameterContainer: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  parameterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  parameterName: {
    ...typography.body,
    fontSize: 16,
    color: colors.text,
  },
  parameterValue: {
    ...typography.body,
    fontSize: 16,
    color: colors.textSecondary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
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
    ...typography.body,
    fontSize: 16,
    color: colors.textSecondary,
  },
  selectOptionTextSelected: {
    color: colors.text,
  },
  numberControl: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 20,
    color: colors.text,
  },
  numberValue: {
    ...typography.body,
    fontSize: 16,
    color: colors.text,
    marginHorizontal: spacing.md,
    minWidth: 40,
    textAlign: 'center',
  },
});

export default ParameterControls;