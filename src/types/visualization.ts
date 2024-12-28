// Basic data types
export interface Point2D {
    x: number;
    y: number;
  }
  
  export interface DataPoint extends Point2D {
    label?: string | number;
    color?: string;
  }
  
  // Base visualization state
  export interface VisualizationState {
    isPlaying: boolean;
    currentStep: number;
    totalSteps: number;
    speed: number;
  }
  
  // Base parameter type
  export interface Parameter {
    id: string;
    name: string;
    type: 'number' | 'select' | 'range' | 'checkbox';
    value: any;
    min?: number;
    max?: number;
    step?: number;
    options?: { label: string; value: any }[];
  }
  
  // Algorithm categories
  export type AlgorithmCategory = 'regression' | 'classification' | 'clustering';
  
  // Base algorithm configuration
  export interface AlgorithmConfig {
    id: string;
    name: string;
    category: AlgorithmCategory;
    description: string;
    parameters: Parameter[];
  }
  
  // Visualization handlers
  export interface VisualizationHandlers {
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
    onStep: () => void;
    onSpeedChange: (speed: number) => void;
    onParameterChange: (parameterId: string, value: any) => void;
  }
  
  // Base visualization props
  export interface BaseVisualizationProps {
    width: number;
    height: number;
    data: DataPoint[];
    state: VisualizationState;
    config: AlgorithmConfig;
    handlers: VisualizationHandlers;
    onAddPoint?: (point: DataPoint) => void;
  }
  
  // Regression specific types
  export interface RegressionVisualizationProps extends BaseVisualizationProps {
    predictionLine?: Point2D[];
    lossHistory?: number[];
  }