import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import ChartContainer from './ChartContainer';
import { chartConfig } from './ChartConfig';
import { chartTheme } from './ChartTheme';
import { TimelineChartProps } from './types';

const TimelineChart: React.FC<TimelineChartProps> = ({ data, height }) => (
  <ChartContainer height={height}>
    <ResponsiveLine
      {...chartConfig}
      theme={chartTheme}
      data={data}
    />
  </ChartContainer>
);

export default TimelineChart;