import React, { useState } from 'react';
import { Button, message } from 'antd';
import DeviceTable from '../components/DeviceTable';
import OperationModal from '../components/OperationModal';
import { useDevices } from '../hooks/useDevices';
import { Device } from '../api/devices';

const Dashboard: React.FC = () => {
  const { devices, loading, error, reload } = useDevices();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleConnect = (device: Device) => {
    setSelectedDevice(device);
    setModalVisible(true);
  };

  return (
    <div className="text-gray-100">  {/* 👈 Text color for dark mode */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Discovered Devices</h2>
        <Button 
          onClick={reload} 
          className="bg-blue-600 hover:bg-blue-700 text-white"  // Tailwind button
        >
          Refresh Scan
        </Button>
      </div>
      {error && <div className="text-red-400 mb-4">{error}</div>}  {/* Red for errors */}
      <DeviceTable devices={devices} loading={loading} onConnect={handleConnect} />
      {selectedDevice && (
        <OperationModal 
          visible={modalVisible} 
          device={selectedDevice} 
          onClose={() => setModalVisible(false)}
          onSuccess={(msg) => {
            message.success(msg);
            reload();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;