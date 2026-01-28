import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

export class APIClient {
  protected client: AxiosInstance;
  private readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `/${endpoint}`;
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        Accept: "application/json",
      },
    });

    // for later usage when fetch api stops scaling
    // add rqst and response interceptors later

    this.client.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        console.log(error);

        if (error.response?.status === 0) {
          return Promise.reject("Server down! please try after sometime");
        }
        return Promise.reject(error);
      },
    );
  }

  private buildUrl(path: string = "") {
    return `${this.endpoint}${path ? `/${path}` : ""}`;
  }

  get = async <T>(path?: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await this.client.get<T>(this.buildUrl(path), config);
    return response.data;
  };

  post = async <T>(
    /*
    axios post method type parameters - 
    order T R D
    T: The type of the actual response object -> response.data
    R: The whole respone -> defaults obviously to AxiosResponse<T>
    D: The type of the data being sent in the request body -> can be inferred by axios automatically
    */
    data: unknown,
    path?: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await this.client.post<T>(
      this.buildUrl(path),
      data,
      config,
    );
    return response.data;
  };

  delete = async <T>(
    path?: string,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await this.client.delete<T>(this.buildUrl(path), config);
    return response.data;
  };
}

const organizationsClient = new APIClient("organizations");
export { organizationsClient };
