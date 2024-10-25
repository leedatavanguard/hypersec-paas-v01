import React from 'react';
import { Steps, Card, Button, message, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MetaSchemaSelector } from './wizard-steps/MetaSchemaSelector';
import { FieldSelector } from './wizard-steps/FieldSelector';
import { TenantSelector } from './wizard-steps/TenantSelector';
import { SchemaReview } from './wizard-steps/SchemaReview';
import { DatabaseOutlined, FieldBinaryOutlined, TeamOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

const steps = [
  {
    title: 'Meta Schema',
    description: 'Select base schema',
    icon: <DatabaseOutlined />,
  },
  {
    title: 'Fields',
    description: 'Choose fields to include',
    icon: <FieldBinaryOutlined />,
  },
  {
    title: 'Tenants',
    description: 'Select applicable tenants',
    icon: <TeamOutlined />,
  },
  {
    title: 'Review',
    description: 'Confirm and save',
    icon: <SaveOutlined />,
  },
];

export const SchemaCreationWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [schemaData, setSchemaData] = React.useState({
    metaSchema: null as any,
    selectedFields: [] as string[],
    selectedTenants: [] as string[],
    schemaName: '',
    description: '',
  });

  const handleNext = () => {
    setCurrentStep(current => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return current + 1;
    });
  };

  const handlePrev = () => {
    setCurrentStep(current => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return current - 1;
    });
  };

  const handleSave = async () => {
    try {
      // API call to save schema would go here
      message.success('Schema created successfully!');
      navigate('/schemas');
    } catch (error) {
      message.error('Failed to create schema');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <MetaSchemaSelector
            selectedSchema={schemaData.metaSchema}
            onSelect={(schema) => setSchemaData({ ...schemaData, metaSchema: schema })}
          />
        );
      case 1:
        return (
          <FieldSelector
            metaSchema={schemaData.metaSchema}
            selectedFields={schemaData.selectedFields}
            onFieldsChange={(fields) => setSchemaData({ ...schemaData, selectedFields: fields })}
          />
        );
      case 2:
        return (
          <TenantSelector
            selectedTenants={schemaData.selectedTenants}
            onTenantsChange={(tenants) => setSchemaData({ ...schemaData, selectedTenants: tenants })}
          />
        );
      case 3:
        return (
          <SchemaReview
            schemaData={schemaData}
            onSchemaDataChange={(data) => setSchemaData({ ...schemaData, ...data })}
          />
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return !!schemaData.metaSchema;
      case 1:
        return schemaData.selectedFields.length > 0;
      case 2:
        return schemaData.selectedTenants.length > 0;
      case 3:
        return !!schemaData.schemaName && !!schemaData.description;
      default:
        return false;
    }
  };

  return (
    <div className="schema-wizard">
      <Card>
        <Steps
          current={currentStep}
          items={steps}
          className="mb-8"
          size="small"
          labelPlacement="vertical"
        />

        <div style={{ marginBottom: 24 }}>
          <Title level={4}>{steps[currentStep].title}</Title>
          <Typography.Text type="secondary">
            {steps[currentStep].description}
          </Typography.Text>
        </div>

        <div className="step-content" style={{ minHeight: 400 }}>
          {renderStepContent()}
        </div>

        <div className="step-actions" style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Button onClick={() => navigate('/schemas')}>
              Cancel
            </Button>
            {currentStep > 0 && (
              <Button onClick={handlePrev}>
                Previous
              </Button>
            )}
          </Space>
          {currentStep < steps.length - 1 ? (
            <Button 
              type="primary" 
              onClick={handleNext} 
              disabled={!isStepValid()}
            >
              Next Step
            </Button>
          ) : (
            <Button 
              type="primary" 
              onClick={handleSave} 
              disabled={!isStepValid()}
              icon={<SaveOutlined />}
            >
              Create Schema
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};