import React, { useMemo } from 'react';
import { G, Circle, Path, Line, Rect } from 'react-native-svg';
import { RegressionVisualizationProps } from '../../types/visualization';
import { colors } from '../../theme';

const PADDING = 40;

const RegressionVisualization: React.FC<RegressionVisualizationProps> = ({
  width,
  height,
  data,
  predictionLine,
  state,
  config,
  handlers,
}) => {
  const scalePoint = useMemo(() => {
    const defaultRange = { min: -5, max: 5 };
    
    const xMin = data.length ? Math.min(...data.map(d => d.x)) : defaultRange.min;
    const xMax = data.length ? Math.max(...data.map(d => d.x)) : defaultRange.max;
    const yMin = data.length ? Math.min(...data.map(d => d.y)) : defaultRange.min;
    const yMax = data.length ? Math.max(...data.map(d => d.y)) : defaultRange.max;

    const xRange = Math.max(xMax - xMin, 1);
    const yRange = Math.max(yMax - yMin, 1);
    
    const paddedXMin = xMin - xRange * 0.1;
    const paddedXMax = xMax + xRange * 0.1;
    const paddedYMin = yMin - yRange * 0.1;
    const paddedYMax = yMax + yRange * 0.1;

    return {
      toSvg: (point: { x: number, y: number }) => ({
        x: ((point.x - paddedXMin) / (paddedXMax - paddedXMin)) * (width - 2 * PADDING) + PADDING,
        y: ((paddedYMax - point.y) / (paddedYMax - paddedYMin)) * (height - 2 * PADDING) + PADDING
      }),
      toData: (svgX: number, svgY: number) => ({
        x: ((svgX - PADDING) / (width - 2 * PADDING)) * (paddedXMax - paddedXMin) + paddedXMin,
        y: paddedYMax - (((svgY - PADDING) / (height - 2 * PADDING)) * (paddedYMax - paddedYMin))
      })
    };
  }, [width, height, data]);

  return (
    <G>
      {/* Touch area that exactly matches the graph area */}
      <Rect
        x={PADDING}
        y={PADDING}
        width={width - 2 * PADDING}
        height={height - 2 * PADDING}
        fill="transparent"
      />

      {/* Grid */}
      <G opacity={0.1}>
        {Array.from({ length: 10 }).map((_, i) => (
          <React.Fragment key={i}>
            <Line
              x1={PADDING}
              y1={PADDING + ((height - 2 * PADDING) * i) / 9}
              x2={width - PADDING}
              y2={PADDING + ((height - 2 * PADDING) * i) / 9}
              stroke={colors.text}
              strokeWidth={1}
            />
            <Line
              x1={PADDING + ((width - 2 * PADDING) * i) / 9}
              y1={PADDING}
              x2={PADDING + ((width - 2 * PADDING) * i) / 9}
              y2={height - PADDING}
              stroke={colors.text}
              strokeWidth={1}
            />
          </React.Fragment>
        ))}
      </G>

      {/* Data points */}
      {data.map((point, i) => {
        const scaledPoint = scalePoint.toSvg(point);
        return (
          <Circle
            key={i}
            cx={scaledPoint.x}
            cy={scaledPoint.y}
            r={4}
            fill={colors.primary}
            opacity={0.6}
          />
        );
      })}

      {/* Prediction line */}
      {predictionLine && predictionLine.length > 1 && (
        <Path
          d={`M ${predictionLine.map(p => {
            const scaledPoint = scalePoint.toSvg(p);
            return `${scaledPoint.x},${scaledPoint.y}`;
          }).join(' L ')}`}
          stroke={colors.text}
          strokeWidth={2}
          fill="none"
        />
      )}

      {/* Axes */}
      <Line
        x1={PADDING}
        y1={height - PADDING}
        x2={width - PADDING}
        y2={height - PADDING}
        stroke={colors.textSecondary}
        strokeWidth={1}
      />
      <Line
        x1={PADDING}
        y1={PADDING}
        x2={PADDING}
        y2={height - PADDING}
        stroke={colors.textSecondary}
        strokeWidth={1}
      />
    </G>
  );
};

export default RegressionVisualization;