export type ApiErrorResponse = {
  message: string;
  statusCode: number;
};

export type ApiResponse<TData> = {
  data: TData;
  message?: string;
};
