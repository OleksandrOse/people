import { client } from '../utils/httpClient';
import { User } from '../types/User';

export function login(user: User) {
  return client.post<string>('/login/', user)
    .then(res => res);
}
