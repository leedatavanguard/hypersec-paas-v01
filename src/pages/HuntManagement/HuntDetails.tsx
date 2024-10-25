import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Typography,
  Space,
  Descriptions,
  Tag,
  Timeline,
  Row,
  Col,
  Statistic,
  Progress,
} from 'antd';
import {
  ArrowLeftOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  HistoryOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Sample hunt data
const huntDetails = {
  id: '1',
  name: 'Authentication Anomalies',
  description: 'Detect suspicious authentication patterns and potential brute force attempts',
  rule: 'Suspicious Login Pattern',
  ruleType: 'Sigma',
  schema: 'Authentication Events',
  schedule: 'Every 15 minutes',
  nextRun: '2024-03-10 16:00',
  status: 'running',
  alerts: 5,
  progress: 45,
  matchedEvents: 127,
  processedEvents: 2891,
  startTime: '2024-03-10 15:45',
  timezone: 'UTC',
};

// Sample activity log
const activityLog = [
  {
    time: '15:45:00',
    event: 'Hunt started',
    type: 'info',
  },
  {
    time: '15:47:30',
    event: 'Alert generated: Multiple failed login attempts from IP 192.168.1.100',
    type: 'warning',
  },
  {
    time: '15:48:45',
    event: 'Processing batch #23 (1000 events)',
    type: 'processing',
  },
];

function HuntDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

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
          <Title level={3} style={{ margin: 0 }}>{huntDetails.name}</Title>
        </Space>
        <Space>
          <Button
            icon={<HistoryOutlined />}
            onClick={() => navigate(`/hunts/${id}/history`)}
          >
            View History
          </Button>
          <Button
            type="primary"
            icon={<PauseCircleOutlined />}
            onClick={() => console.log('pause hunt')}
          >
            Pause Hunt
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="Hunt Details">
            <Descriptions column={2}>
              <Descriptions.Item label="Status">
                <Tag color="processing" icon={<SyncOutlined spin />}>
                  RUNNING
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Rule">
                <Space>
                  {huntDetails.rule}
                  <Tag color="blue">{huntDetails.ruleType}</Tag>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Schema">
                <Tag color="cyan">{huntDetails.schema}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Schedule">
                <Space>
                  <ClockCircleOutlined />
                  {huntDetails.schedule}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Next Run">
                {huntDetails.nextRun}
              </Descriptions.Item>
              <Descriptions.Item label="Time Zone">
                {huntDetails.timezone}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>Current Progress</Title>
            <Progress percent={huntDetails.progress} status="active" />
            
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
              <Col span={8}>
                <Statistic
                  title="Processed Events"
                  value={huntDetails.processedEvents}
                  prefix={<CheckCircleOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Matched Events"
                  value={huntDetails.matchedEvents}
                  prefix={<AlertOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Alerts Generated"
                  value={huntDetails.alerts}
                  prefix={<AlertOutlined />}
                  valueStyle={{ color: huntDetails.alerts > 0 ? '#cf1322' : '#3f8600' }}
                />
              </Col>
            </Row>
          </Card>

          <Card title="Activity Log" style={{ marginTop: 16 }}>
            <Timeline
              items={activityLog.map(log => ({
                color: log.type === 'warning' ? 'red' : 
                       log.type === 'processing' ? 'blue' : 'green',
                children: (
                  <Space direction="vertical" size={0}>
                    <Text type="secondary">{log.time}</Text>
                    <Text>{log.event}</Text>
                  </Space>
                ),
              }))}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Alerts">
            {huntDetails.alerts > 0 ? (
              <Timeline
                items={[
                  {
                    color: 'red',
                    children: (
                      <Space direction="vertical" size={0}>
                        <Text>Multiple failed login attempts</Text>
                        <Text type="secondary">15:47:30</Text>
                        <Tag color="orange">Medium Severity</Tag>
                      </Space>
                    ),
                  },
                  // Add more alerts here
                ]}
              />
            ) : (
              <Empty
                description="No alerts generated"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Card>

          <Card title="Hunt Configuration" style={{ marginTop: 16 }}>
            <Descriptions column={1}>
              <Descriptions.Item label="Alert Threshold">
                100 matches
              </Descriptions.Item>
              <Descriptions.Item label="Notifications">
                Enabled
              </Descriptions.Item>
              <Descriptions.Item label="Notification Channels">
                <Space direction="vertical">
                  <Tag icon={<MailOutlined />}>Email</Tag>
                  <Tag icon={<SlackOutlined />}>Slack</Tag>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HuntDetails;