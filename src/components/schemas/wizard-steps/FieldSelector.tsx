import React from 'react';
import { Input, Table, Tag, Space, Button, Tooltip, Typography, Card, Checkbox } from 'antd';
import { SearchOutlined, InfoCircleOutlined, FilterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Search } = Input;
const { Text } = Typography;

interface Field {
  name: string;
  type: string;
  required: boolean;
  description: string;
  category: string;
  validation?: string;
  example?: string;
}

interface FieldSelectorProps {
  metaSchema: any;
  selectedFields: string[];
  onFieldsChange: (fields: string[]) => void;
}

// Enhanced sample fields data
const fields: Field[] = [
  {
    name: 'userId',
    type: 'string',
    required: true,
    description: 'Unique identifier for the user',
    category: 'Identity',
    validation: 'UUID v4',
    example: '123e4567-e89b-12d3-a456-426614174000',
  },
  {
    name: 'timestamp',
    type: 'datetime',
    required: true,
    description: 'Time when the event occurred',
    category: 'Metadata',
    validation: 'ISO 8601',
    example: '2024-03-10T15:30:00Z',
  },
  {
    name: 'eventType',
    type: 'string',
    required: true,
    description: 'Type of authentication event',
    category: 'Event',
    validation: 'Enum',
    example: 'login_success, login_failure',
  },
  {
    name: 'ipAddress',
    type: 'string',
    required: false,
    description: 'IP address of the client',
    category: 'Network',
    validation: 'IPv4/IPv6',
    example: '192.168.1.1',
  },
  // Add more sample fields as needed
];

const fieldCategories = Array.from(new Set(fields.map(f => f.category)));

export const FieldSelector: React.FC<FieldSelectorProps> = ({
  metaSchema,
  selectedFields,
  onFieldsChange,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(fieldCategories);
  const [showRequired, setShowRequired] = React.useState(false);

  const filteredFields = React.useMemo(() => {
    return fields.filter(field => {
      const matchesSearch = 
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.includes(field.category);
      const matchesRequired = showRequired ? field.required : true;

      return matchesSearch && matchesCategory && matchesRequired;
    });
  }, [searchTerm, selectedCategories, showRequired]);

  const columns: ColumnsType<Field> = [
    {
      title: 'Field Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text: string, record: Field) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          {record.required && <Tag color="red">Required</Tag>}
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: Field) => (
        <Space direction="vertical" size={2}>
          <Text>{text}</Text>
          {record.validation && (
            <Space size={8}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Validation: {record.validation}
              </Text>
              {record.example && (
                <Tooltip title={`Example: ${record.example}`}>
                  <InfoCircleOutlined style={{ color: '#1890ff' }} />
                </Tooltip>
              )}
            </Space>
          )}
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedFields,
    onChange: (selectedRowKeys: React.Key[]) => {
      onFieldsChange(selectedRowKeys as string[]);
    },
  };

  return (
    <div>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Search
              placeholder="Search fields by name, description, or category..."
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
            
            <Space wrap>
              <Text>Categories:</Text>
              {fieldCategories.map(category => (
                <Checkbox
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    }
                  }}
                >
                  {category}
                </Checkbox>
              ))}
              <Checkbox
                checked={showRequired}
                onChange={(e) => setShowRequired(e.target.checked)}
              >
                Required Only
              </Checkbox>
            </Space>

            <Space>
              <Button
                type="link"
                onClick={() => onFieldsChange(fields.filter(f => f.required).map(f => f.name))}
              >
                Select Required Fields
              </Button>
              <Button
                type="link"
                onClick={() => onFieldsChange([])}
              >
                Clear Selection
              </Button>
            </Space>
          </Space>
        </Card>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredFields}
          rowKey="name"
          pagination={false}
          scroll={{ y: 400 }}
          size="middle"
        />

        <Card size="small">
          <Space>
            <Text>Selected:</Text>
            <Text strong>{selectedFields.length}</Text>
            <Text type="secondary">of</Text>
            <Text strong>{fields.length}</Text>
            <Text type="secondary">fields</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};