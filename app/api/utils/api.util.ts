// import { enqueueSnackbar } from "notistack";

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";

type RequestOptions = {
  url: string;
  method?: MethodType;
  body?: object;
  errorMessage?: string;
};

type ErrorType = {
  status: number;
  statusText: string;
  error?: string;
  message?: string;
};

const statusCodes: number[] = [400, 401, 403, 404, 500, 502];

const api = {
  get: async <T>(url: string, errorMessage?: string) =>
    await handler<T>({ url, method: "GET", errorMessage }),
  post: async <T>(url: string, body: object, errorMessage?: string) =>
    await handler<T>({ url, method: "POST", body, errorMessage }),
  put: async <T>(url: string, body: object, errorMessage?: string) =>
    await handler<T>({ url, method: "PUT", body, errorMessage }),
  delete: async <T>(url: string, errorMessage?: string) =>
    await handler<T>({ url, method: "DELETE", errorMessage }),
};

const handler = async <T>({
  url,
  method = "GET",
  body,
  errorMessage,
}: RequestOptions): Promise<{ response: Response; data: T }> => {
  const urlByExternalFlag = url.includes("http") ? url : `/api${url}`;
  let options: RequestInit = {
    method,
    next: { revalidate: 0 },
  };

  if (body) {
    options = {
      ...options,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
  }

  const response = await fetch(urlByExternalFlag, options);

  let data: T = await response.json();

  handleApiError({
    status: response.status,
    statusText: response.statusText,
    error: (data as any).error,
    message: errorMessage,
  });

  return { response, data };
};

const handleApiError = ({ status, statusText, error, message }: ErrorType): void => {
  const errorCode = statusCodes.find((code) => code === status);

  if (errorCode) {
    const errorMessage = `${statusText}: ${message ? message : error ?? "Something went wrong!"}`;
    // enqueueSnackbar(errorMessage, {
    //   variant: "error",
    // });
    throw new Error(errorMessage);
  }
};

export { api };