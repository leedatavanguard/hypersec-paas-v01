import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Input, 
  Select, 
  Typography, 
  Space, 
  Divider,
  Upload,
  Radio,
  TimePicker,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  UploadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import Editor from '@monaco-editor/react';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const sampleSigmaRule = `title: Suspicious Authentication Pattern
id: 1234
status: experimental
description: Detects multiple failed login attempts followed by a successful one
logsource:
    category: authentication
    product: windows
detection:
    selection:
        EventID: 4625
    timeframe: 5m
    condition: selection | count() > 5
falsepositives:
    - Unknown
level: medium`;

const sampleSQLRule = `SELECT 
  event_time,
  user_id,
  ip_address,
  COUNT(*) as failed_attempts
FROM authentication_events
WHERE event_type = 'login_failed'
  AND event_time >= NOW() - INTERVAL '5 minutes'
GROUP BY user_id, ip_address
HAVING COUNT(*) > 5`;

function RuleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [ruleType, setRuleType] = React.useState('sigma');
  const [ruleContent, setRuleContent] = React.useState(sampleSigmaRule);

  const handleRuleTypeChange = (e: any) => {
    setRuleType(e.target.value);
    setRuleContent(e.target.value === 'sigma' ? sampleSigmaRule : sampleSQLRule);
  };

  const handlePreview = () => {
    message.success('Rule validation successful!');
  };

  const handleSave = () => {
    message.success('Rule saved successfully!');
    navigate('/rules');
  };

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/rules')}
          >
            Back
          </Button>
          <Title level={3} style={{ margin: 0 }}>
            {id ? 'Edit' : 'New'} Rule
          </Title>
        </Space>
        <Space>
          <Button icon={<EyeOutlined />} onClick={handlePreview}>
            Preview & Validate
          </Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Save Rule
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <Card title="Rule Details">
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  type: 'sigma',
                  priority: 'Medium',
                  schedule: 'hourly',
                }}
              >
                <Form.Item
                  label="Rule Type"
                  name="type"
                >
                  <Radio.Group onChange={handleRuleTypeChange}>
                    <Radio.Button value="sigma">Sigma Rule</Radio.Button>
                    <Radio.Button value="sql">SQL Rule</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input rule name!' }]}
                >
                  <Input placeholder="Enter rule name" />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Please input description!' }]}
                >
                  <TextArea rows={4} placeholder="Describe the purpose of this rule" />
                </Form.Item>

                <Form.Item
                  label="Tags"
                  name="tags"
                >
                  <Select mode="tags" placeholder="Add tags">
                    <Option value="authentication">Authentication</Option>
                    <Option value="network">Network</Option>
                    <Option value="security">Security</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Priority"
                  name="priority"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="High">High</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Card>

            <Card title="Schema & Schedule">
              <Form form={form} layout="vertical">
                <Form.Item
                  label="Bind to Schema"
                  name="schema"
                  rules={[{ required: true, message: 'Please select a schema!' }]}
                >
                  <Select>
                    <Option value="auth">Authentication Events</Option>
                    <Option value="network">Network Traffic</Option>
                  </Select>
                </Form.Item>

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
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Run Time"
                  name="runTime"
                  rules={[{ required: true }]}
                >
                  <TimePicker format="HH:mm" style={{ width: '100%' }} />
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </Col>

        <Col xs={24} lg={16}>
          <Card 
            title="Rule Definition" 
            extra={
              ruleType === 'sigma' && (
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload YAML</Button>
                </Upload>
              )
            }
          >
            <div className="code-editor">
              <Editor
                height="600px"
                defaultLanguage={ruleType === 'sigma' ? 'yaml' : 'sql'}
                value={ruleContent}
                onChange={(value) => setRuleContent(value || '')}
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

export default RuleEditor;