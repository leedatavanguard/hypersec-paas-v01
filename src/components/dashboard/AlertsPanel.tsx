import React from 'react';
import { Drawer, List, Tag, Typography, Badge, Space, Button, Divider, Radio } from 'antd';
import { AlertCircle, Bell, Clock, Server, Shield, User, AlertTriangle } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Text, Title } = Typography;

interface Alert {
  id: string;
  title: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  type: 'auth' | 'system' | 'network' | 'security';
  status: 'new' | 'investigating' | 'resolved';
}

interface AlertsPanelProps {
  visible: boolean;
  onClose: () => void;
  alerts: Alert[];
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Multiple Failed Authentication Attempts',
    timestamp: '2024-03-10T14:30:00',
    severity: 'critical',
    type: 'auth',
    description: 'Multiple failed login attempts detected from IP 192.168.1.100 targeting admin account',
    status: 'new'
  },
  {
    id: '2',
    title: 'Unusual Network Traffic Pattern',
    timestamp: '2024-03-10T14:25:00',
    severity: 'high',
    type: 'network',
    description: 'Detected abnormal outbound traffic spike to unknown endpoints',
    status: 'investigating'
  },
  {
    id: '3',
    title: 'System Resource Exhaustion',
    timestamp: '2024-03-10T14:15:00',
    severity: 'medium',
    type: 'system',
    description: 'High CPU utilization detected on production server cluster',
    status: 'investigating'
  },
  {
    id: '4',
    title: 'New Admin User Created',
    timestamp: '2024-03-10T14:00:00',
    severity: 'high',
    type: 'security',
    description: 'Unexpected admin user creation detected outside change window',
    status: 'new'
  },
  {
    id: '5',
    title: 'SSL Certificate Expiring',
    timestamp: '2024-03-10T13:45:00',
    severity: 'low',
    type: 'security',
    description: 'Production SSL certificate will expire in 15 days',
    status: 'new'
  }
];

const typeIcons = {
  auth: <User size={16} />,
  system: <Server size={16} />,
  network: <AlertTriangle size={16} />,
  security: <Shield size={16} />
};

const severityColors = {
  critical: '#ff4d4f',
  high: '#fa8c16',
  medium: '#faad14',
  low: '#52c41a'
};

const statusColors = {
  new: 'error',
  investigating: 'processing',
  resolved: 'success'
} as const;

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ visible, onClose }) => {
  const [filter, setFilter] = React.useState('all');

  const filteredAlerts = React.useMemo(() => {
    return mockAlerts.filter(alert => {
      if (filter !== 'all' && alert.severity !== filter) return false;
      return true;
    });
  }, [filter]);

  return (
    <Drawer
      title={
        <Space>
          <Bell className="text-primary" />
          <span>Security Alerts</span>
          <Badge count={mockAlerts.filter(a => a.status === 'new').length} />
        </Space>
      }
      placement="right"
      onClose={onClose}
      open={visible}
      width={480}
      extra={
        <Button type="text" onClick={() => console.log('Mark all as read')}>
          Mark all as read
        </Button>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div>
          <Title level={5}>Filter by Severity</Title>
          <Radio.Group value={filter} onChange={e => setFilter(e.target.value)}>
            <Radio.Button value="all">All</Radio.Button>
            <Radio.Button value="critical">Critical</Radio.Button>
            <Radio.Button value="high">High</Radio.Button>
            <Radio.Button value="medium">Medium</Radio.Button>
            <Radio.Button value="low">Low</Radio.Button>
          </Radio.Group>
        </div>

        <Divider />

        <List
          dataSource={filteredAlerts}
          renderItem={(alert) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Badge dot status={alert.status === 'new' ? 'error' : 'default'}>
                    <div style={{ 
                      padding: '8px',
                      background: severityColors[alert.severity] + '15',
                      borderRadius: '50%'
                    }}>
                      {typeIcons[alert.type]}
                    </div>
                  </Badge>
                }
                title={
                  <Space direction="vertical" size={4}>
                    <Space>
                      <Text strong>{alert.title}</Text>
                      <Tag color={severityColors[alert.severity]}>
                        {alert.severity.toUpperCase()}
                      </Tag>
                    </Space>
                    <Space size="small">
                      <Tag icon={<Clock size={12} />} color={statusColors[alert.status]}>
                        {alert.status.toUpperCase()}
                      </Tag>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {dayjs(alert.timestamp).fromNow()}
                      </Text>
                    </Space>
                  </Space>
                }
                description={
                  <Text type="secondary" style={{ marginTop: '8px' }}>
                    {alert.description}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </Space>
    </Drawer>
  );
};