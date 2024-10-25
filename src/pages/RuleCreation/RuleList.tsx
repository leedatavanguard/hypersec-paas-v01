import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Typography, Tag, Space, Card, Select } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

// Sample data
const rules = [
  {
    key: '1',
    name: 'Suspicious Login Pattern',
    type: 'Sigma',
    schema: 'Authentication Events',
    priority: 'High',
    status: 'Active',
    schedule: 'Every 15 minutes',
    lastRun: '2024-03-10 15:30',
    tags: ['authentication', 'security'],
  },
  {
    key: '2',
    name: 'High Network Traffic',
    type: 'SQL',
    schema: 'Network Traffic',
    priority: 'Medium',
    status: 'Active',
    schedule: 'Hourly',
    lastRun: '2024-03-10 15:00',
    tags: ['network', 'performance'],
  },
];

const priorityColors = {
  High: 'red',
  Medium: 'orange',
  Low: 'green',
};

function RuleList() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = React.useState('all');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space direction="vertical" size={0}>
          <span>{text}</span>
          <Space size={4}>
            <Tag color="blue">{record.type}</Tag>
            {record.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Space>
        </Space>
      ),
    },
    {
      title: 'Schema',
      dataIndex: 'schema',
      key: 'schema',
      render: (text: string) => <Tag color="cyan">{text}</Tag>,
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: keyof typeof priorityColors) => (
        <Tag color={priorityColors[priority]}>{priority}</Tag>
      ),
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (text: string) => (
        <Space>
          <ClockCircleOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Last Run',
      dataIndex: 'lastRun',
      key: 'lastRun',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'success' : 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`editor/${record.key}`)}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<HistoryOutlined />}
            onClick={() => navigate(`${record.key}/versions`)}
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
        <Title level={3} style={{ margin: 0 }}>Rule Management</Title>
        <Space>
          <Select
            value={selectedType}
            onChange={setSelectedType}
            style={{ width: 120 }}
            options={[
              { value: 'all', label: 'All Rules' },
              { value: 'sigma', label: 'Sigma Rules' },
              { value: 'sql', label: 'SQL Rules' },
            ]}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('editor')}
          >
            New Rule
          </Button>
        </Space>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={rules.filter(rule => 
            selectedType === 'all' || 
            rule.type.toLowerCase() === selectedType
          )}
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default RuleList;