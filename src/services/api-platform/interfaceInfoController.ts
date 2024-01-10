// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getInterfaceInfoList GET /api/interface_info */
export async function getInterfaceInfoListUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoListUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfoVO>('/api/interface_info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getInterfaceInfoById GET /api/interface_info/${param0} */
export async function getInterfaceInfoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { interfaceId: param0, ...queryParams } = params;
  return request<API.BaseResponseInterfaceInfoVO>(`/api/interface_info/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** invokeInterface POST /api/interface_info/invoke */
export async function invokeInterfaceUsingPost(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/interface_info/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
