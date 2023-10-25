const BASE_URL = 'https://technical-task-api.icapgroupgmbh.com/api';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';


export function httpClient<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return response.json();
    });
}

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }
  
  return fetch(BASE_URL + url, options)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          if (errorData.email) {
            throw new Error(errorData.email[0]);
          } else if (errorData.name){
            throw new Error(errorData.name[0]);
          } else if (errorData.phone_number){
            throw new Error(errorData.phone_number[0]);
          } else if (errorData.address){
            throw new Error(errorData.address[0]);
          } else {
            throw new Error(`${response.status} ${response.statusText}`);
          }
        });
      }

      return response.json()
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};

