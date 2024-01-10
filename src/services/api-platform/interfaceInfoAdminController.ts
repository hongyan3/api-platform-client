// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getInterfaceInfoList GET /api/admin/interface_info */
export async function getInterfaceInfoListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfoVO>('/api/admin/interface_info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateInterfaceInfo PUT /api/admin/interface_info */
export async function updateInterfaceInfoUsingPut(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/admin/interface_info', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addInterfaceInfo POST /api/admin/interface_info */
export async function addInterfaceInfoUsingPost(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/admin/interface_info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceInfo DELETE /api/admin/interface_info/${param0} */
export async function deleteInterfaceInfoUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteInterfaceInfoUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { interfaceId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/admin/interface_info/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** offlineInterfaceInfo PUT /api/admin/interface_info/${param0}/offline */
export async function offlineInterfaceInfoUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.offlineInterfaceInfoUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { interfaceId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/admin/interface_info/${param0}/offline`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** onlineInterfaceInfo PUT /api/admin/interface_info/${param0}/online */
export async function onlineInterfaceInfoUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.onlineInterfaceInfoUsingPUTParams,
  options?: { [key: string]: any },
) {
  const { interfaceId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/admin/interface_info/${param0}/online`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}
