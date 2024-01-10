import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingDelete,
  getInterfaceInfoListUsingGet,
  offlineInterfaceInfoUsingPut,
  onlineInterfaceInfoUsingPut,
  updateInterfaceInfoUsingPut,
} from '@/services/api-platform/interfaceInfoAdminController';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

const InterfaceInfoList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoUpdateRequest>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPost({ ...fields });
      hide();
      message.success('创建成功');
      actionRef.current?.reload();
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('创建失败,' + error);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
    const hide = message.loading('Configuring');
    try {
      await updateInterfaceInfoUsingPut({
        ...fields,
      });
      hide();

      message.success('更新成功');
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (record: API.InterfaceInfoVO) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingDelete({
        interfaceId: record.id,
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('删除失败,' + error);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 发布节点
   *
   * @param selectedRows
   */
  const handleOnline = async (record: API.InterfaceInfoVO) => {
    const hide = message.loading('正在执行');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPut({
        interfaceId: record.id,
      });
      hide();
      message.success('发布成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('发布失败,' + error);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 下线节点
   *
   * @param selectedRows
   */
  const handleOffline = async (record: API.InterfaceInfoVO) => {
    const hide = message.loading('正在执行');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPut({
        interfaceId: record.id,
      });
      hide();
      message.success('下线成功');
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('下线失败,' + error);
      return false;
    }
  };

  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: '接口ID',
      dataIndex: 'id',
      valueType: 'text',
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '接口名称为必填项',
          },
        ],
      },
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '接口url',
      dataIndex: 'url',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '接口名称为必填项',
          },
        ],
      },
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'textarea',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'text',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      valueEnum: {
        0: { text: '关闭', status: 'Error' },
        1: { text: '开启', status: 'Success' },
      },
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        record.status === 0 ? (
          <a
            key="config"
            onClick={() => {
              handleOnline(record);
            }}
          >
            发布
          </a>
        ) : (
          <a
            key="config"
            onClick={() => {
              handleOffline(record);
            }}
          >
            下线
          </a>
        ),
        <Button
          type="text"
          key="config"
          danger
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 'max-content' }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: API.getInterfaceInfoListUsingGETParams & {
            pageSize: number;
            current: number;
          },
          sort,
          filter,
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          const res = await getInterfaceInfoListUsingGet({
            ...params,
          });
          return {
            data: res.data?.records || [],
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: res.code == 0 ? true : false,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res.data?.total,
          };
        }}
        columns={columns}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      <CreateModal
        columns={columns}
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={(values: API.InterfaceInfoAddRequest) => {
          handleAdd(values);
        }}
        visible={createModalOpen}
      />
    </PageContainer>
  );
};

export default InterfaceInfoList;
