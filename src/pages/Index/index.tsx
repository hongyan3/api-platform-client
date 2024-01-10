import { getInterfaceInfoListUsingGet } from '@/services/api-platform/interfaceInfoAdminController';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import React from 'react';

const Index: React.FC = () => {
  return (
    <PageContainer>
      <ProList<API.InterfaceInfoVO>
        rowKey="name"
        headerTitle="接口列表"
        request={async (
          params: API.getInterfaceInfoListUsingGETParams & {
            current: number;
            pageSize: number;
          },
        ) => {
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
        pagination={{}}
        showActions="hover"
        metas={{
          title: {
            dataIndex: 'name',
            title: '接口名称',
          },
          description: {
            dataIndex: 'description',
            search: false,
          },
          subTitle: {
            dataIndex: 'method',
            render: (_, row) => {
              return (
                <Space size={0}>
                  <Tag color="blue" key={row.method}>
                    {row.method}
                  </Tag>
                </Space>
              );
            },
            search: false,
          },
          actions: {
            render: (text, row) => [
              <a href={`/interface_info/${row.id}`} target="_blank" rel="noopener noreferrer" key="view">
                查看文档
              </a>,
            ],
            search: false,
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
