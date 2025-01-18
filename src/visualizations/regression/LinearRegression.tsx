import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, GestureResponderEvent } from 'react-native';
import { DataPoint, Parameter, AlgorithmConfig, RegressionVisualizationProps } from '../../types/visualization';
import { colors, spacing } from '../../theme';
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
    max: 5,
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

const PADDING = 20;
const SCALE = {
  min: -5,
  max: 5,
  range: 10 // max - min
};

const LinearRegression: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [weights, setWeights] = useState({ m: 0, b: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [parameters, setParameters] = useState(defaultParameters);

  const convertToDataPoint = useCallback((event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;

    // Validate boundaries including padding
    if (
      locationX < PADDING || 
      locationX > visualizationWidth - PADDING || 
      locationY < PADDING || 
      locationY > visualizationHeight - PADDING
    ) {
      return null;
    }

    // Convert to data point using the same scale as RegressionVisualization
    const x = SCALE.min + ((locationX - PADDING) / (visualizationWidth - 2 * PADDING)) * SCALE.range;
    const y = SCALE.max - ((locationY - PADDING) / (visualizationHeight - 2 * PADDING)) * SCALE.range;

    return { x, y };
  }, []);

  const MIN_DRAW_INTERVAL = 100; // Minimum time between points in milliseconds
  let lastDrawTime = 0;
  
  const handleInteraction = useCallback((event: GestureResponderEvent) => {
    const currentTime = Date.now();
    if (currentTime - lastDrawTime < MIN_DRAW_INTERVAL) {
      return;
    }
    
    const point = convertToDataPoint(event);
    if (point) {
      // Get current noise value from parameters
      const noiseLevel = parameters.find(p => p.id === 'noise')?.value || 0.5;
      
      // Add random noise to y coordinate
      const noise = (Math.random() - 0.5) * noiseLevel;
      const noisyPoint = {
        x: point.x,
        y: point.y + noise  // Add noise to y coordinate
      };
  
      if (Math.abs(noisyPoint.x) <= 5 && Math.abs(noisyPoint.y) <= 5) {
        setData(prevData => [...prevData, noisyPoint]);
        if (isPlaying) {
          setWeights({ m: 0, b: 0 });
          setCurrentStep(0);
        }
      }
      lastDrawTime = currentTime;
    }
  }, [isPlaying, convertToDataPoint, parameters]);  // Added parameters to dependencies

  
  const handleDrawMove = useCallback((event: GestureResponderEvent) => {
    const currentTime = Date.now();
    if (currentTime - lastDrawTime < MIN_DRAW_INTERVAL) {
      return; // Skip if not enough time has passed
    }
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
        prev.map(p => p.id === parameterId ? { ...p, value } : p)
      );
      // Reset the visualization when parameters change
      setWeights({ m: 0, b: 0 });
      setCurrentStep(0);
      setIsPlaying(false);
    },
  };

  // Animation effect
  useEffect(() => {
    if (isPlaying && data.length > 0) {
      const intervalId = setInterval(() => {
        gradientDescentStep();
      }, 1000 / (30 * speed));
      
      return () => clearInterval(intervalId);
    }
  }, [isPlaying, gradientDescentStep, speed, data]);

  const visualizationWidth = SCREEN_WIDTH - (spacing.md * 2);
  const visualizationHeight = visualizationWidth * 1.4;

  return (
    <View style={styles.container}>
      <InteractiveVisualization<RegressionVisualizationProps>
        width={visualizationWidth}
        height={visualizationHeight}
        data={data}
        state={{
          isPlaying,
          currentStep,
          totalSteps: parameters.find(p => p.id === 'iterations')?.value || 100,
          speed,
        }}
        config={{
          ...config,
          parameters: parameters,
        }}
        handlers={handlers}
        onInteraction={handleInteraction}
        onMove={handleDrawMove}
      >
        <RegressionVisualization
          width={visualizationWidth}
          height={visualizationHeight}
          data={data}
          predictionLine={getPredictionLine()}
          state={{
            isPlaying,
            currentStep,
            totalSteps: parameters.find(p => p.id === 'iterations')?.value || 100,
            speed,
          }}
          config={{
            ...config,
            parameters: parameters,
          }}
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