import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  Button, 
  Typography, 
  Space, 
  Tabs, 
  Card,
  Drawer,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  HistoryOutlined,
  TeamOutlined,
  DatabaseOutlined,
  TableOutlined,
  UnorderedListOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { SchemaCreationWizard } from '../../components/schemas/SchemaCreationWizard';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Schema {
  id: string;
  name: string;
  type: string;
  version: string;
  tenants: number;
  lastUpdated: string;
}

const schemas: Schema[] = [
  {
    id: '1',
    name: 'Authentication Events',
    type: 'Alert Schema',
    version: '2.1.0',
    tenants: 3,
    lastUpdated: '2024-03-10',
  },
  {
    id: '2',
    name: 'Network Traffic',
    type: 'Meta Schema',
    version: '1.0.1',
    tenants: 5,
    lastUpdated: '2024-03-09',
  },
];

function SchemaList() {
  const navigate = useNavigate();
  const [editDrawerVisible, setEditDrawerVisible] = React.useState(false);
  const [createWizardVisible, setCreateWizardVisible] = React.useState(false);
  const [selectedSchema, setSelectedSchema] = React.useState<Schema | null>(null);
  const [activeTab, setActiveTab] = React.useState('meta');
  const [form] = Form.useForm();

  const handleEdit = (schema: Schema) => {
    setSelectedSchema(schema);
    setEditDrawerVisible(true);
  };

  const handleSave = () => {
    message.success('Schema updated successfully');
    setEditDrawerVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Schema) => (
        <div className="flex items-center">
          <DatabaseOutlined className="mr-3 text-gray-400" />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-sm text-gray-500">ID: {record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      render: (text: string) => `v${text}`,
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Schema) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            type="link"
            icon={<HistoryOutlined />}
            onClick={() => navigate(`${record.id}/versions`)}
          >
            History
          </Button>
          <Button type="link" icon={<TeamOutlined />}>
            Tenants ({record.tenants})
          </Button>
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: 'meta',
      label: (
        <span>
          <DatabaseOutlined />
          Meta Schemas
        </span>
      ),
      children: <Table rowKey="id" columns={columns} dataSource={schemas} />,
    },
    {
      key: 'derived',
      label: (
        <span>
          <TableOutlined />
          Derived Schemas
        </span>
      ),
      children: <Table rowKey="id" columns={columns} dataSource={schemas} />,
    },
    {
      key: 'header',
      label: (
        <span>
          <UnorderedListOutlined />
          Common Headers
        </span>
      ),
      children: <Table rowKey="id" columns={columns} dataSource={schemas} />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={3} style={{ margin: 0 }}>Schema Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateWizardVisible(true)}
          size="large"
        >
          New Schema
        </Button>
      </div>

      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          type="card"
          size="large"
          className="schema-tabs"
        />
      </Card>

      <Drawer
        title={
          <Space>
            <EditOutlined />
            <span>Edit {selectedSchema?.name}</span>
          </Space>
        }
        width={720}
        open={editDrawerVisible}
        onClose={() => setEditDrawerVisible(false)}
        styles={{ body: { padding: 24 } }}
        extra={
          <Space>
            <Button onClick={() => setEditDrawerVisible(false)} icon={<CloseOutlined />}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSave} icon={<SaveOutlined />}>
              Save Changes
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Select>
              <Option value="alert">Alert Schema</Option>
              <Option value="meta">Meta Schema</Option>
              <Option value="header">Common Headers</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Version" name="version" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        title="Create New Schema"
        width="80%"
        open={createWizardVisible}
        onClose={() => setCreateWizardVisible(false)}
        destroyOnClose
        footer={null}
        styles={{ body: { padding: 0 } }}
      >
        <SchemaCreationWizard onClose={() => setCreateWizardVisible(false)} />
      </Drawer>
    </div>
  );
}

export default SchemaList;