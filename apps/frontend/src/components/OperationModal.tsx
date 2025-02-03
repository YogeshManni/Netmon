import React, { useState } from 'react';
import { Modal, Button, Select, Input, message } from 'antd';
import { performOperation } from '../api/devices';

const { Option } = Select;

interface OperationModalProps {
  visible: boolean;
  device: { ip: string; hostname: string; key: string; status: string };
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

const OperationModal: React.FC<OperationModalProps> = ({ visible, device, onClose, onSuccess }) => {
  const [operation, setOperation] = useState<string>('');
  const [params, setParams] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleExecute = async () => {
    if (!operation) {
      message.warning("Please select an operation");
      return;
    }
    setLoading(true);
    try {
      const result = await performOperation(device.ip, operation, params);
      onSuccess(result);
    } catch (error) {
      message.error("Operation failed");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      title={`Operate on ${device.hostname} (${device.ip})`}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} className="text-gray-100">
          Cancel
        </Button>,
        <Button 
          key="execute" 
          type="primary" 
          loading={loading} 
          onClick={handleExecute}
          className="bg-blue-600 hover:bg-blue-700 border-none"
        >
          Execute
        </Button>
      ]}
      className="[&_.ant-modal-content]:bg-gray-800 [&_.ant-modal-title]:text-gray-100"  // 👈 Dark modal
    >
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-300">Select Operation:</label>
        <Select
          placeholder="Select an operation"
          className="w-full"
          onChange={(value) => setOperation(value)}
          value={operation || undefined}
          popupClassName="bg-gray-700"  // Dropdown background
        >
          <Option value="ping" className="text-gray-100 hover:bg-gray-600">Ping</Option>
          <Option value="restart" className="text-gray-100 hover:bg-gray-600">Restart</Option>
          <Option value="shutdown" className="text-gray-100 hover:bg-gray-600">Shutdown</Option>
        </Select>
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-300">Parameters:</label>
        <Input 
          placeholder="Additional parameters (if any)" 
          value={params} 
          onChange={(e) => setParams(e.target.value)}
          className="bg-gray-700 border-gray-600 text-gray-100"  // Input styling
        />
      </div>
    </Modal>
  );
};

export default OperationModal;