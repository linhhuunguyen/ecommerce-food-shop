/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const isNil = (value: any): value is undefined | null =>
  typeof value === 'undefined' || value === null;

export const isEmpty = (value: any): boolean => {
  if (isNil(value)) {
    return true;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return value.length === 0;
};

export const mergeParam = (currentPath: string, input: any) => {
  let newString = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [fieldName, value] of Object.entries(input)) {
    if (!isEmpty(value)) {
      newString.push(`${fieldName}=${value}`);
    }
  }
  return `${currentPath}?${newString.join('&')}`;
};
