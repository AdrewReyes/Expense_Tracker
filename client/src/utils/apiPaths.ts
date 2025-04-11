export const BASE_URL = "http://localhost:5000";

// utils/apiPaths.js
interface AuthPaths {
  LOGIN: string;
  REGISTER: string;
  GET_USER_INFO: string;
}

interface DashboardPaths {
  GET_DATA: string;
}

interface IncomePaths {
  ADD_INCOME: string;
  GET_ALL_INCOME: string;
  DELETE_INCOME: (incomeId: string) => string;
  DOWNLOAD_INCOME: string;
}

interface ExpensePaths {
  ADD_EXPENSE: string;
  GET_ALL_EXPENSE: string;
  DELETE_EXPENSE: (expenseId: string) => string;
  DOWNLOAD_EXPENSE: string;
}

interface ImagePaths {
  UPLOAD_IMAGE: string;
}

interface ApiPaths {
  AUTH: AuthPaths;
  DASHBOARD: DashboardPaths;
  INCOME: IncomePaths;
  EXPENSE: ExpensePaths;
  IMAGE: ImagePaths;
}

export const API_PATHS: ApiPaths = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/image/upload-image",
  },
};
