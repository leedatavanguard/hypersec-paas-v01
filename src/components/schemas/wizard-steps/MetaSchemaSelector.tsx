import React from 'react';
import { Radio, Input, Card, Space, Tag, Empty, Typography } from 'antd';
import { DatabaseOutlined, SearchOutlined, CheckCircleFilled } from '@ant-design/icons';

const { Search } = Input;
const { Text } = Typography;

interface MetaSchema {
  id: string;
  name: string;
  description: string;
  fieldCount: number;
  lastUpdated: string;
  category: string;
}

// Sample meta schemas with categories
const metaSchemas: MetaSchema[] = [
  {
    id: '1',
    name: 'Authentication Events',
    description: 'Base schema for all authentication-related events',
    fieldCount: 15,
    lastUpdated: '2024-03-10',
    category: 'Security',
  },
  {
    id: '2',
    name: 'Network Traffic',
    description: 'Core schema for network traffic analysis',
    fieldCount: 25,
    lastUpdated: '2024-03-09',
    category: 'Network',
  },
  {
    id: '3',
    name: 'System Metrics',
    description: 'Base schema for system performance metrics',
    fieldCount: 20,
    lastUpdated: '2024-03-08',
    category: 'System',
  },
  {
    id: '4',
    name: 'User Activity',
    description: 'Track user interactions and behavior',
    fieldCount: 18,
    lastUpdated: '2024-03-07',
    category: 'Security',
  },
];

interface MetaSchemaSelectorProps {
  selectedSchema: MetaSchema | null;
  onSelect: (schema: MetaSchema) => void;
}

export const MetaSchemaSelector: React.FC<MetaSchemaSelectorProps> = ({
  selectedSchema,
  onSelect,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredSchemas, setFilteredSchemas] = React.useState(metaSchemas);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = metaSchemas.filter(schema =>
      schema.name.toLowerCase().includes(value.toLowerCase()) ||
      schema.description.toLowerCase().includes(value.toLowerCase()) ||
      schema.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSchemas(filtered);
  };

  // Group schemas by category
  const schemasByCategory = React.useMemo(() => {
    const grouped: Record<string, MetaSchema[]> = {};
    filteredSchemas.forEach(schema => {
      if (!grouped[schema.category]) {
        grouped[schema.category] = [];
      }
      grouped[schema.category].push(schema);
    });
    return grouped;
  }, [filteredSchemas]);

  return (
    <div>
      <Search
        placeholder="Search meta schemas by name, description, or category..."
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 24 }}
        prefix={<SearchOutlined />}
        allowClear
      />

      {Object.entries(schemasByCategory).length > 0 ? (
        Object.entries(schemasByCategory).map(([category, schemas]) => (
          <div key={category} style={{ marginBottom: 24 }}>
            <Text strong style={{ fontSize: 16, marginBottom: 16, display: 'block' }}>
              {category}
            </Text>
            <Radio.Group 
              value={selectedSchema?.id}
              onChange={(e) => {
                const schema = metaSchemas.find(s => s.id === e.target.value);
                if (schema) onSelect(schema);
              }}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {schemas.map(schema => (
                  <Radio.Button
                    key={schema.id}
                    value={schema.id}
                    style={{ width: '100%', height: 'auto', padding: 0 }}
                  >
                    <Card
                      hoverable
                      className={selectedSchema?.id === schema.id ? 'selected-schema-card' : ''}
                      style={{
                        borderColor: selectedSchema?.id === schema.id ? '#1890ff' : undefined,
                        background: selectedSchema?.id === schema.id ? '#f0f7ff' : undefined,
                      }}
                    >
                      <Space direction="vertical" size={2} style={{ width: '100%' }}>
                        <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
                          <Space>
                            <DatabaseOutlined style={{ color: '#1890ff' }} />
                            <Text strong>{schema.name}</Text>
                          </Space>
                          {selectedSchema?.id === schema.id && (
                            <CheckCircleFilled style={{ color: '#1890ff' }} />
                          )}
                        </Space>
                        <Space wrap>
                          <Tag color="blue">{schema.fieldCount} fields</Tag>
                          <Tag color="cyan">{schema.category}</Tag>
                        </Space>
                        <Text type="secondary" style={{ display: 'block' }}>
                          {schema.description}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Last updated: {schema.lastUpdated}
                        </Text>
                      </Space>
                    </Card>
                  </Radio.Button>
                ))}
              </Space>
            </Radio.Group>
          </div>
        ))
      ) : (
        <Empty 
          description="No meta schemas found" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  );
};