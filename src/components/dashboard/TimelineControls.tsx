import React from 'react';
import { Radio, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { AlertCircle, Database, DollarSign } from 'lucide-react';

interface TimelineControlsProps {
  metric: 'alerts' | 'data' | 'cost';
  onMetricChange: (metric: 'alerts' | 'data' | 'cost') => void;
}

export const TimelineControls: React.FC<TimelineControlsProps> = ({ metric, onMetricChange }) => (
  <div style={{ marginBottom: '20px' }}>
    <Radio.Group
      value={metric}
      onChange={(e: RadioChangeEvent) => onMetricChange(e.target.value)}
      buttonStyle="solid"
      className="timeline-toggle"
    >
      <Radio.Button value="alerts">
        <Space>
          <AlertCircle size={16} />
          Alerts
        </Space>
      </Radio.Button>
      <Radio.Button value="data">
        <Space>
          <Database size={16} />
          Data Ingested
        </Space>
      </Radio.Button>
      <Radio.Button value="cost">
        <Space>
          <DollarSign size={16} />
          Cost
        </Space>
      </Radio.Button>
    </Radio.Group>
  </div>
);