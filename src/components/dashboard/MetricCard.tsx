import React from 'react';
import { Card, Statistic, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface MetricCardProps {
  title: string;
  value: number | string;
  prefix?: React.ReactNode;
  suffix?: string;
  comparison?: number;
  icon?: LucideIcon;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  comparison,
  icon: Icon,
  className,
}) => {
  const isPositive = comparison && comparison > 0;
  
  return (
    <Card className={clsx('stat-card', className)}>
      <div className="flex items-center gap-4">
        {Icon && <Icon className="h-8 w-8 text-primary" />}
        <div className="flex-1">
          <Typography.Text type="secondary">{title}</Typography.Text>
          <Statistic
            value={value}
            prefix={prefix}
            suffix={suffix}
          />
          {comparison && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              <span>{Math.abs(comparison)}% vs last period</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};