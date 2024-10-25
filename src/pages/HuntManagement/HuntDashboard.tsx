import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Typography, 
  Table, 
  Tag, 
  Space, 
  Row, 
  Col,
  Statistic,
  Progress,
  Alert,
} from 'antd';
import {
  PlusOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  HistoryOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

interface Hunt {
  key: string;
  name: string;
  rule: string;
  schedule: string;
  nextRun: string;
  status: 'running' | 'scheduled' | 'paused' | 'completed' | 'failed';
  alerts: number;
  progress: number;
}

// Sample data
const hunts: Hunt[] = [
  {
    key: '1',
    name: 'Authentication Anomalies',
    rule: 'Suspicious Login Pattern',
    schedule: 'Every 15 minutes',
    nextRun: '2024-03-10 16:00',
    status: 'running',
    alerts: 5,
    progress: 45,
  },
  {
    key: '2',
    name: 'Network Traffic Analysis',
    rule: 'High Network Traffic',
    schedule: 'Hourly',
    nextRun: '2024-03-10 17:00',
    status: 'scheduled',
    alerts: 0,
    progress: 0,
  },
  {
    key: '3',
    name: 'Failed Login Detection',
    rule: 'Multiple Failed Logins',
    schedule: 'Daily',
    nextRun: '2024-03-11 00:00',
    status: 'paused',
    alerts: 12,
    progress: 75,
  },
];

const statusColors: Record<Hunt['status'], string> = {
  running: 'processing',
  scheduled: 'default',
  paused: 'warning',
  completed: 'success',
  failed: 'error',
};

const statusIcons: Record<Hunt['status'], React.ReactNode> = {
  running: <SyncOutlined spin />,
  scheduled: <ClockCircleOutlined />,
  paused: <PauseCircleOutlined />,
  completed: <CheckCircleOutlined />,
  failed: <AlertOutlined />,
};

function HuntDashboard() {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Hunt Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: Hunt) => (
        <a onClick={() => navigate(record.key)}>{record.name}</a>
      ),
    },
    {
      title: 'Rule',
      dataIndex: 'rule',
      key: 'rule',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
    },
    {
      title: 'Next Run',
      dataIndex: 'nextRun',
      key: 'nextRun',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Hunt['status']) => (
        <Tag icon={statusIcons[status]} color={statusColors[status]}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => <Progress percent={progress} size="small" />,
    },
    {
      title: 'Alerts',
      dataIndex: 'alerts',
      key: 'alerts',
      render: (alerts: number) => (
        <Tag color={alerts > 0 ? 'red' : 'green'} icon={<AlertOutlined />}>
          {alerts}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Hunt) => (
        <Space>
          {record.status === 'running' ? (
            <Button 
              type="text" 
              icon={<PauseCircleOutlined />}
              onClick={() => console.log('pause', record.key)}
            >
              Pause
            </Button>
          ) : (
            <Button 
              type="text" 
              icon={<PlayCircleOutlined />}
              onClick={() => console.log('resume', record.key)}
            >
              Resume
            </Button>
          )}
          <Button 
            type="text" 
            icon={<HistoryOutlined />}
            onClick={() => navigate(`${record.key}/history`)}
          >
            History
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ margin: 0 }}>Hunt Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('create')}
        >
          New Hunt
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Hunts"
              value={hunts.filter(h => h.status === 'running').length}
              prefix={<SyncOutlined spin />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Scheduled Hunts"
              value={hunts.filter(h => h.status === 'scheduled').length}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Alerts"
              value={hunts.reduce((acc, curr) => acc + curr.alerts, 0)}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Success Rate"
              value={98.5}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {hunts.some(h => h.alerts > 0) && (
        <Alert
          message="Active Alerts"
          description="There are hunts that have generated alerts. Please review them."
          type="warning"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      <Card>
        <Table
          columns={columns}
          dataSource={hunts}
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default HuntDashboard;