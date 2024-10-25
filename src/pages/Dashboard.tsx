import React, { useState } from 'react';
import { Row, Col, Card, Space, Button } from 'antd';
import { 
  AlertCircle, 
  Database, 
  Shield,
  Clock,
  DollarSign,
  Bell
} from 'lucide-react';
import { TimeRangeSelector } from '../components/dashboard/TimeRangeSelector';
import { MetricCard } from '../components/dashboard/MetricCard';
import TimelineChart from '../components/dashboard/TimelineChart';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { TimelineControls } from '../components/dashboard/TimelineControls';
import { generateChartData } from '../utils/chartData';
import type { Dayjs } from 'dayjs';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'alerts' | 'data' | 'cost'>('alerts');
  const [showAlerts, setShowAlerts] = useState(false);
  const chartData = generateChartData();

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Security Overview</h1>
        <Space>
          <TimeRangeSelector onChange={setTimeRange} />
          <Button 
            type="primary"
            icon={<Bell size={16} />}
            onClick={() => setShowAlerts(true)}
          >
            Alerts
          </Button>
        </Space>
      </div>

      {/* Metric Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Alerts"
            value={245}
            comparison={4.75}
            icon={AlertCircle}
            suffix="alerts"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Data Ingested"
            value="2.5"
            comparison={-1.39}
            icon={Database}
            suffix="TB"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Active Rules"
            value={12}
            comparison={2.35}
            icon={Shield}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Running Hunts"
            value={8}
            comparison={3.25}
            icon={Clock}
          />
        </Col>
      </Row>

      {/* Timeline Chart */}
      <Card className="timeline-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <TimelineControls
            metric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />
          <TimelineChart 
            data={chartData} 
            height={400}
          />
        </Space>
      </Card>

      {/* Alerts Panel */}
      <AlertsPanel
        visible={showAlerts}
        onClose={() => setShowAlerts(false)}
        alerts={[]}
      />
    </div>
  );
};

export default Dashboard;