import {
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfoVO>[]
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoAddRequest) => Promise<void>;
  visible: boolean;
  values: API.InterfaceInfoUpdateRequest
};

const UpdateModal: React.FC<Props> = (Props) => {
  const {columns,visible,onCancel,onSubmit,values} = Props
  const fromRef = useRef<ProFormInstance>()
  useEffect(() => {
    if (fromRef) {
      fromRef.current?.setFieldsValue(values);
    }
  },[values])
  return <Modal open={visible} onCancel={() => onCancel?.()} footer={null}>
    <ProTable 
      type='form' 
      columns={columns} 
      onSubmit={async (values) => {onSubmit?.(values)}}
      formRef={fromRef}
    />
  </Modal>;
}
export default UpdateModal;
