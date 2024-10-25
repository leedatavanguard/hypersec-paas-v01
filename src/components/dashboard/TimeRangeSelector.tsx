import React from 'react';
import { DatePicker, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { FilterOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface TimeRangeSelectorProps {
  onChange: (dates: [Dayjs, Dayjs] | null) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ onChange }) => {
  return (
    <Space>
      <FilterOutlined />
      <RangePicker
        presets={[
          { label: 'Last 24 Hours', value: [dayjs().subtract(24, 'hour'), dayjs()] },
          { label: 'Last 7 Days', value: [dayjs().subtract(7, 'day'), dayjs()] },
          { label: 'Last 30 Days', value: [dayjs().subtract(30, 'day'), dayjs()] },
        ]}
        onChange={(dates) => onChange(dates as [Dayjs, Dayjs] | null)}
      />
    </Space>
  );
};