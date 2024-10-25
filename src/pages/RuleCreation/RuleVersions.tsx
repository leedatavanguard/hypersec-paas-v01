import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Timeline, Card, Button, Typography, Tag, Space } from 'antd';
import { ArrowLeftOutlined, HistoryOutlined, RollbackOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const versions = [
  {
    version: '2.1.0',
    date: '2024-03-10',
    author: 'John Doe',
    changes: 'Updated detection threshold and added new conditions',
    type: 'Sigma',
  },
  {
    version: '2.0.0',
    date: '2024-03-01',
    author: 'Jane Smith',
    changes: 'Major rule restructure for better detection accuracy',
    type: 'Sigma',
  },
  {
    version: '1.0.1',
    date: '2024-02-15',
    author: 'John Doe',
    changes: 'Fixed time window calculation',
    type: 'Sigma',
  },
];

function RuleVersions() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/rules')}
        >
          Back
        </Button>
        <Title level={3} style={{ margin: 0 }}>Rule Version History</Title>
      </div>

      <Card>
        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ margin: 0 }}>Suspicious Authentication Pattern</Title>
          <Text type="secondary">ID: {id}</Text>
        </div>

        <Timeline
          items={versions.map((version, index) => ({
            dot: <HistoryOutlined style={{ fontSize: '16px' }} />,
            children: (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Space direction="vertical" size={4}>
                    <Space>
                      <Tag color="blue">Version {version.version}</Tag>
                      <Tag color="cyan">{version.type}</Tag>
                      <Text type="secondary">{version.date}</Text>
                    </Space>
                    <Text>By {version.author}</Text>
                    <Text>{version.changes}</Text>
                  </Space>
                </div>
                {index > 0 && (
                  <Button icon={<RollbackOutlined />}>
                    Rollback
                  </Button>
                )}
              </div>
            ),
          }))}
        />
      </Card>
    </div>
  );
}

export default RuleVersions;