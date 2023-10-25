import { client } from '../utils/httpClient';
import { Person } from '../types/Person';
import { TableResult } from '../types/TableResult';


export function getPeople(limit: number, offset: number): Promise<Person[]> {
  return client.get<TableResult>(`/table/?limit=${limit}&offset=${offset}/`)
    .then(data => data.results);
}

export function updatePerson(personId: number, personUpdate: Omit<Person, 'id' | 'email'>): Promise<Person> {
  return client.patch<Person>(`/table/${personId}/`, personUpdate);
}


