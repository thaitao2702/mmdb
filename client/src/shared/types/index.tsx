export type OmitFirstFuncParam<T> = T extends (firstArg: any, ...rest: infer RestParams) => any ? RestParams : never;


export type IApiMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';