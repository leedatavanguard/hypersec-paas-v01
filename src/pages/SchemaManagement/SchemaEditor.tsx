import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Input, Select, Typography, Space, Divider, Transfer } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';

const { Title, Text } = Typography;

// Sample meta schema fields for the transfer component
const metaSchemaFields = [
  { key: 'userId', title: 'User ID' },
  { key: 'timestamp', title: 'Timestamp' },
  { key: 'actionType', title: 'Action Type' },
  { key: 'deviceInfo', title: 'Device Info' },
  { key: 'sourceIp', title: 'Source IP' },
  { key: 'destIp', title: 'Destination IP' },
  { key: 'protocol', title: 'Protocol' },
  { key: 'port', title: 'Port' },
];

function SchemaEditor() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const schemaType = searchParams.get('type') || 'derived';
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedFields, setSelectedFields] = React.useState<string[]>([]);

  const [schemaContent, setSchemaContent] = React.useState(
    id ? '' : JSON.stringify({
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "The name of the event"
        }
      },
      "required": ["name"]
    }, null, 2)
  );

  const renderSchemaTypeSpecificFields = () => {
    switch (schemaType) {
      case 'meta':
        return (
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input schema description!' }]}
          >
            <Input.TextArea rows={4} placeholder="Describe the purpose of this meta schema" />
          </Form.Item>
        );
      case 'derived':
        return (
          <>
            <Form.Item
              label="Base Meta Schema"
              name="baseSchema"
              rules={[{ required: true, message: 'Please select base schema!' }]}
            >
              <Select>
                <Select.Option value="userActivity">User Activity</Select.Option>
                <Select.Option value="networkEvent">Network Event</Select.Option>
              </Select>
            </Form.Item>
            <Divider />
            <Form.Item label="Fields from Meta Schema">
              <Transfer
                dataSource={metaSchemaFields}
                titles={['Available Fields', 'Selected Fields']}
                targetKeys={selectedFields}
                onChange={setSelectedFields}
                render={item => item.title}
                listStyle={{
                  width: 250,
                  height: 300,
                }}
              />
            </Form.Item>
          </>
        );
      case 'header':
        return (
          <Form.Item
            label="Apply To"
            name="applyTo"
            rules={[{ required: true, message: 'Please select where to apply!' }]}
          >
            <Select mode="multiple">
              <Select.Option value="all">All Schemas</Select.Option>
              <Select.Option value="selected">Selected Schemas</Select.Option>
            </Select>
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/schemas')}
          >
            Back
          </Button>
          <Title level={3} style={{ margin: 0 }}>
            {id ? 'Edit' : 'New'} {schemaType === 'meta' ? 'Meta Schema' : 
              schemaType === 'derived' ? 'Schema' : 'Common Header'}
          </Title>
        </Space>
        <Button type="primary" icon={<SaveOutlined />}>
          Save Schema
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="Schema Details">
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                version: '1.0.0',
              }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input schema name!' }]}
              >
                <Input placeholder="Enter schema name" />
              </Form.Item>

              <Form.Item
                label="Version"
                name="version"
                rules={[{ required: true, message: 'Please input version!' }]}
              >
                <Input placeholder="1.0.0" />
              </Form.Item>

              {renderSchemaTypeSpecificFields()}
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Schema Definition">
            <div className="code-editor">
              <Editor
                height="600px"
                defaultLanguage="json"
                value={schemaContent}
                onChange={(value) => setSchemaContent(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SchemaEditor;