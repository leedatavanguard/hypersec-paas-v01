import React from 'react';
import { Table, Input, Tag, Space, Button, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Search } = Input;
const { Text } = Typography;

interface Tenant {
  id: string;
  name: string;
  environment: string;
  region: string;
  status: 'active' | 'inactive';
}

interface TenantSelectorProps {
  selectedTenants: string[];
  onTenantsChange: (tenants: string[]) => void;
}

// Sample tenants data
const tenants: Tenant[] = [
  {
    id: '1',
    name: 'Production US',
    environment: 'production',
    region: 'us-east-1',
    status: 'active',
  },
  {
    id: '2',
    name: 'Production EU',
    environment: 'production',
    region: 'eu-west-1',
    status: 'active',
  },
  {
    id: '3',
    name: 'Staging',
    environment: 'staging',
    region: 'us-east-1',
    status: 'active',
  },
  {
    id: '4',
    name: 'Development',
    environment: 'development',
    region: 'us-east-1',
    status: 'active',
  },
];

export const TenantSelector: React.FC<TenantSelectorProps> = ({
  selectedTenants,
  onTenantsChange,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredTenants, setFilteredTenants] = React.useState(tenants);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = tenants.filter(tenant =>
      tenant.name.toLowerCase().includes(value.toLowerCase()) ||
      tenant.environment.toLowerCase().includes(value.toLowerCase()) ||
      tenant.region.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTenants(filtered);
  };

  const columns: ColumnsType<Tenant> = [
    {
      title: 'Tenant Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Environment',
      dataIndex: 'environment',
      key: 'environment',
      render: (text: string) => (
        <Tag color={
          text === 'production' ? 'green' :
          text === 'staging' ? 'orange' :
          'blue'
        }>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'active' | 'inactive') => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status}
        </Tag>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedTenants,
    onChange: (selectedRowKeys: React.Key[]) => {
      onTenantsChange(selectedRowKeys as string[]);
    },
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Search
            placeholder="Search tenants..."
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <Space>
            <Button
              type="link"
              onClick={() => onTenantsChange(
                tenants
                  .filter(t => t.environment === 'production')
                  .map(t => t.id)
              )}
            >
              Select Production
            </Button>
            <Button
              type="link"
              onClick={() => onTenantsChange([])}
            >
              Clear Selection
            </Button>
          </Space>
        </Space>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredTenants}
        rowKey="id"
        pagination={false}
        scroll={{ y: 400 }}
      />

      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <Text type="secondary">
          {selectedTenants.length} of {tenants.length} tenants selected
        </Text>
      </div>
    </div>
  );
};