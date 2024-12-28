import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
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
  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation();
  };

  const handleValueChange = (parameterId: string, value: any) => {
    onParameterChange(parameterId, value);
  };

  const renderParameter = (param: Parameter) => {
    switch (param.type) {
      case 'range':
        return (
          <View 
            key={param.id} 
            style={styles.parameterContainer}
            onTouchStart={handlePress}
            onTouchMove={handlePress}
          >
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
          <View 
            key={param.id} 
            style={styles.parameterContainer}
            onTouchStart={handlePress}
            onTouchMove={handlePress}
          >
            <Text style={styles.parameterName}>{param.name}</Text>
            <View style={styles.selectContainer}>
              {param.options?.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.selectOption,
                    param.value === option.value && styles.selectOptionSelected,
                  ]}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleValueChange(param.id, option.value);
                  }}
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
          <View 
            key={param.id} 
            style={styles.parameterContainer}
            onTouchStart={handlePress}
            onTouchMove={handlePress}
          >
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
          <View 
            key={param.id} 
            style={styles.parameterContainer}
            onTouchStart={handlePress}
            onTouchMove={handlePress}
          >
            <Text style={styles.parameterName}>{param.name}</Text>
            <View style={styles.numberControl}>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleValueChange(param.id, param.value - (param.step || 1));
                }}
              >
                <Text style={styles.numberButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.numberValue}>{param.value}</Text>
              <TouchableOpacity
                style={styles.numberButton}
                onPress={(e) => {
                  e.stopPropagation();
                  handleValueChange(param.id, param.value + (param.step || 1));
                }}
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
    <View 
      style={[styles.container, style]}
      onTouchStart={handlePress}
      onTouchMove={handlePress}
    >
      {parameters.map(renderParameter)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: '4%',
    width: '100%',
  },
  parameterContainer: {
    marginBottom: spacing.lg,
    width: '100%',
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
    marginBottom: spacing.xs,
  },
  parameterValue: {
    ...typography.body,
    fontSize: 16,
    color: colors.textSecondary,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: spacing.sm,
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
    marginTop: spacing.sm,
  },
  numberButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginHorizontal: spacing.lg,
  },
});

export default ParameterControls;