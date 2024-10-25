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
    changes: 'Added support for multi-factor authentication events',
  },
  {
    version: '2.0.0',
    date: '2024-03-01',
    author: 'Jane Smith',
    changes: 'Major schema restructure for better event categorization',
  },
  {
    version: '1.0.1',
    date: '2024-02-15',
    author: 'John Doe',
    changes: 'Fixed validation for timestamp format',
  },
];

function SchemaVersions() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/schemas')}
        >
          Back
        </Button>
        <Title level={3} style={{ margin: 0 }}>Schema Version History</Title>
      </div>

      <Card>
        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ margin: 0 }}>Authentication Events Schema</Title>
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

export default SchemaVersions;