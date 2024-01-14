import {
  getInterfaceInfoByIdUsingGet,
  invokeInterfaceUsingPost,
} from '@/services/api-platform/interfaceInfoController';
import { SendOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button, Form, Input, message, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const InterfaceDoc: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO>();
  const [invokeRes, setinvokeRes] = useState<string>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [form] = Form.useForm();
  useEffect(() => {
    async function fetchData() {
      if (!params.id) {
        message.error('参数错误');
        return;
      }
      setLoading(true);
      try {
        const res = await getInterfaceInfoByIdUsingGet({
          interfaceId: params.id,
        });
        setData(res.data);
        form.setFieldValue('requestParams', res.data?.requestParams);
        form.setFieldValue('requestHeader', res.data?.requestHeader);
      } catch (error: any) {
        message.error('请求失败' + error.message);
        return;
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [form]);
  const onFinsh = async (params: any) => {
    try {
      setInvokeLoading(true);
      const res = await invokeInterfaceUsingPost({
        id: data?.id,
        ...params,
      });
      setinvokeRes(res.data);
    } catch (error: any) {
      message.error('请求失败' + error.message);
    } finally {
      setInvokeLoading(false);
    }
  };
  return (
    <PageContainer>
      <ProCard
        bordered
        headerBordered
        direction="column"
        gutter={[0, 16]}
        style={{ marginBlockStart: 8 }}
      >
        <ProCard title={data?.name} bordered loading={loading} type="inner">
          <div>接口描述：{data?.description}</div>
          <div>接口状态：{data?.status === 1 ? '启用' : '禁用'}</div>
          <div>请求地址：{data?.url}</div>
          <div>
            请求方法：<Tag color="blue">{data?.method}</Tag>
          </div>
          <div>请求参数：{data?.requestParams}</div>
          <div>请求头部：{data?.requestHeader}</div>
          <div>响应头部：{data?.responseHeader}</div>
          <div>创建时间：{data?.createTime}</div>
          <div>更新时间：{data?.updateTime}</div>
        </ProCard>
        <ProCard title="在线测试" type="inner" bordered>
          <Form
            form={form}
            onFinish={async (values) => {
              onFinsh(values);
            }}
          >
            <Form.Item label="请求头部" name="requestHeader">
              <Input.TextArea autoSize></Input.TextArea>
            </Form.Item>
            <Form.Item label="请求参数" name="requestParams">
              <Input.TextArea autoSize></Input.TextArea>
            </Form.Item>
            <Form.Item>
              <Button
                icon={<SendOutlined />}
                type="primary"
                htmlType="submit"
                loading={invokeLoading}
              >
                调用
              </Button>
            </Form.Item>
          </Form>
        </ProCard>
        <ProCard title="响应结果" type="inner" bordered loading={invokeLoading}>
          <Typography>
            <pre>{invokeRes}</pre>
          </Typography>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default InterfaceDoc;
