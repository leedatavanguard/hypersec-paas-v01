import React from 'react';
import { Card } from 'antd';

interface ChartContainerProps {
  children: React.ReactNode;
  height?: number;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children, height = 400 }) => (
  <Card className="w-full bg-gray-50">
    <div style={{ height }}>{children}</div>
  </Card>
);

export default ChartContainer;