/* eslint-disable array-callback-return */
import { Productclassification } from 'types/Product';

export default function validateInfo(values: Productclassification[]) {
  const errors: Productclassification[] = [
    {
      groupName: '',
      attributes: [],
      _id: ''
    }
  ];

  //   values.map((item) => {
  //     if (!item.groupName) {
  //       errors.groupName = 'Group Name cannot be emppty';
  //     } else if (item.groupName.length < 3) {
  //       errors.groupName = 'Group Name needs to be 3 characters or more';
  //     }

  //     item.attributes.map((lii) => {
  //       if (!lii) {
  //         errors.attributes.push('Attribute Name cannot be emppty');
  //       }
  //     });
  //   });

  return errors;
}
