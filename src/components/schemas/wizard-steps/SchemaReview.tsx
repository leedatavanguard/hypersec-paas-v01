import React from 'react';
import { Form, Input, Card, Descriptions, Tag, Space, Typography } from 'antd';
import { DatabaseOutlined, FieldTimeOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

interface SchemaReviewProps {
  schemaData: {
    metaSchema: any;
    selectedFields: string[];
    selectedTenants: string[];
    schemaName: string;
    description: string;
  };
  onSchemaDataChange: (data: Partial<{
    schemaName: string;
    description: string;
  }>) => void;
}

export const SchemaReview: React.FC<SchemaReviewProps> = ({
  schemaData,
  onSchemaDataChange,
}) => {
  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Form layout="vertical">
          <Form.Item
            label="Schema Name"
            required
            tooltip="Choose a unique and descriptive name for your schema"
          >
            <Input
              value={schemaData.schemaName}
              onChange={(e) => onSchemaDataChange({ schemaName: e.target.value })}
              placeholder="Enter schema name"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            required
            tooltip="Provide a clear description of the schema's purpose"
          >
            <TextArea
              value={schemaData.description}
              onChange={(e) => onSchemaDataChange({ description: e.target.value })}
              placeholder="Enter schema description"
              rows={4}
            />
          </Form.Item>
        </Form>

        <Card title={<Space><DatabaseOutlined /> Schema Configuration</Space>}>
          <Descriptions column={1}>
            <Descriptions.Item label="Base Meta Schema">
              <Space>
                <Text strong>{schemaData.metaSchema?.name}</Text>
                <Tag color="blue">{schemaData.metaSchema?.fieldCount} fields available</Tag>
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Selected Fields">
              <Space wrap>
                {schemaData.selectedFields.map(field => (
                  <Tag key={field}>{field}</Tag>
                ))}
              </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Applied To">
              <Space wrap>
                {schemaData.selectedTenants.map(tenant => (
                  <Tag key={tenant} color="green">Tenant {tenant}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title={<Space><FieldTimeOutlined /> Schema Details</Space>}>
          <Space direction="vertical">
            <Text>
              This schema will be created with {schemaData.selectedFields.length} fields
              and applied to {schemaData.selectedTenants.length} tenants.
            </Text>
            <Text type="secondary">
              The schema will be versioned and can be modified later if needed.
            </Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
};