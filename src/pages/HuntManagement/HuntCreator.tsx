import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Space,
  Typography,
  Row,
  Col,
  TimePicker,
  Switch,
  Divider,
  Alert,
  Tag,
} from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  ClockCircleOutlined,
  BellOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Sample data
const availableRules = [
  {
    id: '1',
    name: 'Suspicious Login Pattern',
    type: 'Sigma',
    description: 'Detects multiple failed login attempts followed by a successful one',
    schema: 'Authentication Events',
  },
  {
    id: '2',
    name: 'High Network Traffic',
    type: 'SQL',
    description: 'Identifies unusual spikes in network traffic',
    schema: 'Network Traffic',
  },
];

function HuntCreator() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedRule, setSelectedRule] = React.useState<any>(null);

  const handleRuleSelect = (ruleId: string) => {
    const rule = availableRules.find(r => r.id === ruleId);
    setSelectedRule(rule);
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    navigate('/hunts');
  };

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
          <Title level={3} style={{ margin: 0 }}>Create New Hunt</Title>
        </Space>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={() => form.submit()}
        >
          Create Hunt
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Hunt Configuration">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                schedule: 'hourly',
                notifications: true,
                alertThreshold: 100,
              }}
            >
              <Form.Item
                label="Hunt Name"
                name="name"
                rules={[{ required: true, message: 'Please input hunt name!' }]}
              >
                <Input placeholder="Enter a name for this hunt" />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input hunt description!' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Describe the purpose of this hunt"
                />
              </Form.Item>

              <Form.Item
                label="Select Rule"
                name="ruleId"
                rules={[{ required: true, message: 'Please select a rule!' }]}
              >
                <Select
                  placeholder="Choose a rule to apply"
                  onChange={handleRuleSelect}
                >
                  {availableRules.map(rule => (
                    <Option key={rule.id} value={rule.id}>
                      <Space>
                        {rule.name}
                        <Tag color="blue">{rule.type}</Tag>
                      </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {selectedRule && (
                <Alert
                  message="Rule Details"
                  description={
                    <Space direction="vertical">
                      <Text>{selectedRule.description}</Text>
                      <Text>Schema: <Tag color="cyan">{selectedRule.schema}</Tag></Text>
                    </Space>
                  }
                  type="info"
                  showIcon
                  style={{ marginBottom: 24 }}
                />
              )}

              <Divider />

              <Form.Item
                label="Schedule"
                name="schedule"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="5min">Every 5 minutes</Option>
                  <Option value="15min">Every 15 minutes</Option>
                  <Option value="hourly">Hourly</Option>
                  <Option value="daily">Daily</Option>
                  <Option value="weekly">Weekly</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Run Time"
                name="runTime"
                rules={[{ required: true }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="Time Zone"
                name="timezone"
                rules={[{ required: true }]}
              >
                <Select showSearch>
                  <Option value="UTC">UTC</Option>
                  <Option value="America/New_York">America/New_York</Option>
                  <Option value="Europe/London">Europe/London</Option>
                </Select>
              </Form.Item>

              <Divider />

              <Form.Item
                label="Enable Notifications"
                name="notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="Alert Threshold"
                name="alertThreshold"
                rules={[{ required: true }]}
              >
                <Input
                  type="number"
                  prefix={<BellOutlined />}
                  suffix="matches"
                />
              </Form.Item>

              <Form.Item
                label="Notification Channels"
                name="channels"
              >
                <Select mode="multiple" placeholder="Select notification channels">
                  <Option value="email">Email</Option>
                  <Option value="slack">Slack</Option>
                  <Option value="teams">Microsoft Teams</Option>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Card title="Hunt Preview">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text type="secondary">Selected Rule:</Text>
                {selectedRule ? (
                  <Tag color="blue">{selectedRule.name}</Tag>
                ) : (
                  <Text type="secondary">No rule selected</Text>
                )}

                <Divider />

                <Text type="secondary">Schedule:</Text>
                <Space>
                  <ClockCircleOutlined />
                  {form.getFieldValue('schedule') || 'Not set'}
                </Space>

                <Divider />

                <Text type="secondary">Notifications:</Text>
                <Space>
                  <BellOutlined />
                  {form.getFieldValue('notifications') ? 'Enabled' : 'Disabled'}
                </Space>
              </Space>
            </Card>

            <Card title="Help & Tips">
              <Space direction="vertical">
                <Text>
                  • Choose a descriptive name for easy identification
                </Text>
                <Text>
                  • Set appropriate alert thresholds to avoid alert fatigue
                </Text>
                <Text>
                  • Consider time zones when scheduling recurring hunts
                </Text>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default HuntCreator;