import React from 'react';
import { Table, Button } from 'antd';
import { Device } from '../api/devices';

interface DeviceTableProps {
  devices: Device[];
  loading: boolean;
  onConnect: (device: Device) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices, loading, onConnect }) => {
  const columns = [
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
      className: 'text-gray-100',  // 
    },
    {
      title: 'Hostname',
      dataIndex: 'hostname',
      key: 'hostname',
      className: 'text-gray-100',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={status === 'Online' ? 'text-green-400' : 'text-red-400'}>
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Device) => (
        <Button 
          type="primary" 
          onClick={() => onConnect(record)}
          className="bg-blue-600 hover:bg-blue-700 border-none"  // Tailwind button
        > 
          Connect
        </Button>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={devices} 
      loading={loading}
      rowClassName="hover:bg-gray-800"  // 
      className="bg-gray-800 rounded-lg"  // Background and border
      pagination={{ pageSize: 5 }}
      rowKey="key"
    />
  );
};


export default DeviceTable;