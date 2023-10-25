export function getPreparedTable<T>(
  people: T[],
  sortField : keyof T | '',
) {
  let preparedTable = [...people];

  if (sortField) {
    preparedTable.sort((person1, person2) => {
      const value1 = person1[sortField];
      const value2 = person2[sortField];

      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value1 - value2;
      }

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.localeCompare(value2);
      }

      return 0;
    })
  }

  return preparedTable;
}

