// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getUserInterfaceInfoList GET /api/admin/user_interface_info */
export async function getUserInterfaceInfoListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceInfoListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceInfoVO>('/api/admin/user_interface_info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateUserInterfaceInfo PUT /api/admin/user_interface_info */
export async function updateUserInterfaceInfoUsingPut(
  body: API.UserInterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/admin/user_interface_info', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addUserInterfaceInfo POST /api/admin/user_interface_info */
export async function addUserInterfaceInfoUsingPost(
  body: API.UserInterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/admin/user_interface_info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUserInterfaceInfo DELETE /api/admin/user_interface_info/${param0} */
export async function deleteUserInterfaceInfoUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserInterfaceInfoUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { interfaceId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/admin/user_interface_info/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}
