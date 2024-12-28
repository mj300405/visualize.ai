import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import { DataPoint, Parameter, AlgorithmConfig, RegressionVisualizationProps } from '../../types/visualization';
import { colors } from '../../theme';
import RegressionVisualization from './RegressionVisualization';
import InteractiveVisualization from '../../components/base/InteractiveVisualization';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const defaultParameters: Parameter[] = [
  {
    id: 'learningRate',
    name: 'Learning Rate',
    type: 'range',
    value: 0.01,
    min: 0.001,
    max: 0.1,
    step: 0.001,
  },
  {
    id: 'iterations',
    name: 'Max Iterations',
    type: 'number',
    value: 100,
    min: 10,
    max: 1000,
    step: 10,
  },
  {
    id: 'noise',
    name: 'Point Noise',
    type: 'range',
    value: 0.5,
    min: 0,
    max: 2,
    step: 0.1,
  }
];

const config: AlgorithmConfig = {
  id: 'linear-regression',
  name: 'Linear Regression',
  category: 'regression',
  description: 'Find the best fitting line through data points using gradient descent',
  parameters: defaultParameters,
};

const PADDING = 40; // Make sure this matches the padding in RegressionVisualization

const LinearRegression: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [weights, setWeights] = useState({ m: 0, b: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [parameters, setParameters] = useState(defaultParameters);

  // Convert screen coordinates to data coordinates
  const convertToDataPoint = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const width = SCREEN_WIDTH - 32;
    const height = 300;

    // Only add points within the graph area
    if (
      locationX < PADDING || 
      locationX > width - PADDING || 
      locationY < PADDING || 
      locationY > height - PADDING
    ) {
      return null;
    }

    // Scale the coordinates to match the graph's coordinate system
    const x = ((locationX - PADDING) / (width - 2 * PADDING)) * 10 - 5;
    const y = 5 - ((locationY - PADDING) / (height - 2 * PADDING)) * 10;

    return { x, y };
  };

  // Handlers
  const handleInteraction = useCallback((event: GestureResponderEvent) => {
    const point = convertToDataPoint(event);
    if (point) {
      console.log('Adding new point:', point);
      setData(prevData => [...prevData, point]);
      if (isPlaying) {
        setWeights({ m: 0, b: 0 });
        setCurrentStep(0);
      }
    }
  }, [isPlaying]);

  // Handlers for continuous drawing
  const handleDrawMove = useCallback((event: GestureResponderEvent) => {
    handleInteraction(event);
  }, [handleInteraction]);

  const getPredictionLine = useCallback(() => {
    if (data.length === 0) return [];
    
    const xMin = Math.min(...data.map(p => p.x));
    const xMax = Math.max(...data.map(p => p.x));
    return [
      { x: xMin, y: weights.m * xMin + weights.b },
      { x: xMax, y: weights.m * xMax + weights.b },
    ];
  }, [weights, data]);

  // Gradient descent step
  const gradientDescentStep = useCallback(() => {
    if (data.length === 0) return;
    
    const learningRate = parameters.find(p => p.id === 'learningRate')?.value || 0.01;
    const maxIterations = parameters.find(p => p.id === 'iterations')?.value || 100;

    if (currentStep >= maxIterations) {
      setIsPlaying(false);
      return;
    }

    let mGrad = 0;
    let bGrad = 0;
    const n = data.length;

    // Compute gradients
    for (const point of data) {
      const prediction = weights.m * point.x + weights.b;
      const error = prediction - point.y;
      mGrad += error * point.x;
      bGrad += error;
    }

    mGrad = (2/n) * mGrad;
    bGrad = (2/n) * bGrad;

    // Update weights
    setWeights(prev => ({
      m: prev.m - learningRate * mGrad,
      b: prev.b - learningRate * bGrad,
    }));

    setCurrentStep(prev => prev + 1);
  }, [weights, data, currentStep, parameters]);

  const handlers = {
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
    onReset: () => {
      setIsPlaying(false);
      setWeights({ m: 0, b: 0 });
      setCurrentStep(0);
    },
    onStep: () => gradientDescentStep(),
    onSpeedChange: (newSpeed: number) => setSpeed(newSpeed),
    onParameterChange: (parameterId: string, value: any) => {
      setParameters(prev =>
        prev.map(p => (p.id === parameterId ? { ...p, value } : p))
      );
      handlers.onReset();
    },
  };

  // Animation effect
  React.useEffect(() => {
    if (isPlaying && data.length > 0) {
      const intervalId = setInterval(() => {
        gradientDescentStep();
      }, 1000 / (30 * speed));
      
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, gradientDescentStep, speed, data]);

  return (
    <View style={styles.container}>
      <InteractiveVisualization<RegressionVisualizationProps>
        width={SCREEN_WIDTH - 32}
        height={300}
        data={data}
        state={{
          isPlaying,
          currentStep,
          totalSteps: parameters.find(p => p.id === 'iterations')?.value || 100,
          speed,
        }}
        config={config}
        handlers={handlers}
        onInteraction={handleInteraction}
        onMove={handleDrawMove}
      >
        <RegressionVisualization
          width={SCREEN_WIDTH - 32}
          height={300}
          data={data}
          predictionLine={getPredictionLine()}
          state={{
            isPlaying,
            currentStep,
            totalSteps: parameters.find(p => p.id === 'iterations')?.value || 100,
            speed,
          }}
          config={config}
          handlers={handlers}
        />
      </InteractiveVisualization>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default LinearRegression;