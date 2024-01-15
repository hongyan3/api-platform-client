import { getLoginUserUsingGet, updateUserUsingPut1 } from '@/services/api-platform/userController';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import React, { useRef } from 'react';
const Center: React.FC = () => {
  return (
    <PageContainer>
      <ProCard type="inner">
        <ProForm
          params={{}}
          request={async () => {
            const res = (await getLoginUserUsingGet());
            return {
              userName: res.data?.userName,
              userAvatar: [{
                name: 'user_avatar',
                uid: '0',
                url: res.data?.userAvatar
              }],
              gender: res.data?.gender
            };
          }}
          onFinish={async (formData) => {
            try {
              const res = await updateUserUsingPut1({
                userName: formData.userName,
                userAvatar: formData.userAvatar[0].url,
                gender: formData.gender
              })
              if (res.code == 0) {
                message.success('更新成功')
              }
              
            }catch(error: any) {
              message.error('更新失败, '+error.message)
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
    </PageContainer>
  );
};

export default Center;
