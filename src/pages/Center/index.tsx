import { uploadFileUsingPost } from '@/services/api-platform/fileController';
import {
  getCredentialsUsingGet,
  getLoginUserUsingGet,
  refreshCredentialsUsingPost,
  updateUserUsingPut1,
} from '@/services/api-platform/userController';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React, { useEffect, useState } from 'react';
const Center: React.FC = () => {
  const [credentials, setCredentials] = useState<API.UserCredentialsVO>();
  useEffect(() => {
    async function fetchCredentials() {
      try {
        const res = await getCredentialsUsingGet();
        if (res.data) {
          setCredentials(res.data);
        }
      } catch (error: any) {
        message.error('获取密钥失败, ' + error.message);
      }
    }
    fetchCredentials();
  }, []);
  const refreshCredentials = async () => {
    try {
      const res = await refreshCredentialsUsingPost();
      if (res.data) {
        setCredentials(res.data);
        message.success('刷新成功');
      }
    } catch (error: any) {
      message.error('刷新密钥失败, ' + error.message);
    }
  };
  return (
    <PageContainer>
      <ProCard headerBordered direction="column" gutter={[0, 16]} style={{ marginBlockStart: 8 }}>
        <ProCard type="inner" title="资料管理" bordered>
          <ProForm
            params={{}}
            request={async () => {
              const res = await getLoginUserUsingGet();
              return {
                userName: res.data?.userName,
                userAvatar: [
                  {
                    name: 'user_avatar',
                    uid: '0',
                    url: res.data?.userAvatar,
                    response: '',
                  },
                ],
                gender: res.data?.gender,
              };
            }}
            onFinish={async (formData) => {
              console.log(formData);
              try {
                const res = await updateUserUsingPut1({
                  userName: formData.userName,
                  userAvatar: formData.userAvatar[0].response,
                  gender: formData.gender,
                });
                if (res.code == 0) {
                  message.success('更新成功');
                }
              } catch (error: any) {
                message.error('更新失败, ' + error.message);
              }
            }}
          >
            <ProFormText
              width="md"
              name="userName"
              label="用户名"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
            />
            <ProFormUploadButton
              name="userAvatar"
              label="头像"
              max={1}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                customRequest: (options) => {
                  const { file, onSuccess, onError } = options;
                  const newFile = file as File;
                  async function uploadFile() {
                    try {
                      const res = await uploadFileUsingPost({ business: 'user_avatar' }, newFile);
                      if (res.data) {
                        message.success('上传成功');
                        onSuccess && onSuccess(res.data);
                      }
                    } catch (error: any) {
                      onError && onError(error.message);
                    }
                  }
                  uploadFile();
                },
              }}
            />
            <ProFormRadio.Group
              name="gender"
              label="性别"
              options={[
                {
                  label: '男',
                  value: 1,
                },
                {
                  label: '女',
                  value: 2,
                },
                {
                  label: '保密',
                  value: 3,
                },
              ]}
            />
          </ProForm>
        </ProCard>
        <ProCard
          type="inner"
          title="密钥管理"
          bordered
          extra={<Button onClick={refreshCredentials}>刷新密钥</Button>}
        >
          <Paragraph copyable={{ text: credentials?.accessKey }} strong>
            ACCESS_KEY: *************
          </Paragraph>
          <Paragraph copyable={{ text: credentials?.secretKey }} strong>
            SECRET_KEY: *************
          </Paragraph>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Center;
