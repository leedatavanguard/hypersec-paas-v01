import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Typography,
  Space,
  Timeline,
  Tag,
  Statistic,
  Row,
  Col,
  Table,
} from 'antd';
import {
  ArrowLeftOutlined,
  HistoryOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Sample historical runs
const huntRuns = [
  {
    key: '1',
    startTime: '2024-03-10 15:00',
    endTime: '2024-03-10 15:15',
    status: 'completed',
    processedEvents: 2891,
    matchedEvents: 127,
    alerts: 5,
    duration: '15m',
  },
  {
    key: '2',
    startTime: '2024-03-10 14:00',
    endTime: '2024-03-10 14:15',
    status: 'completed',
    processedEvents: 2456,
    matchedEvents: 89,
    alerts: 2,
    duration: '15m',
  },
];

function HuntHistory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'success' : 'error'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Processed',
      dataIndex: 'processedEvents',
      key: 'processedEvents',
    },
    {
      title: 'Matches',
      dataIndex: 'matchedEvents',
      key: 'matchedEvents',
    },
    {
      title: 'Alerts',
      dataIndex: 'alerts',
      key: 'alerts',
      render: (alerts: number) => (
        <Tag color={alerts > 0 ? 'red' : 'green'}>
          {alerts}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button type="link" onClick={() => console.log('view details', record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/hunts')}
          >
            Back
          </Button>
          <Title level={3} style={{ margin: 0 }}>Hunt History</Title>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Runs"
              value={huntRuns.length}
              prefix={<HistoryOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Alerts"
              value={huntRuns.reduce((acc, curr) => acc + curr.alerts, 0)}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Success Rate"
              value={100}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Avg. Duration"
              value="15"
              suffix="min"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={huntRuns}
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default HuntHistory;