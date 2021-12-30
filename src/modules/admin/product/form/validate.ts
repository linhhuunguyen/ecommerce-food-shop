/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react';

import {
  Productclassification,
  ValidateProductclassification
} from 'types/Product';

export default function validateInfo(values: Productclassification[]) {
  const errors: Productclassification[] = [
    {
      _id: '',
      groupName: '',
      attributes: ['']
    },
    {
      _id: '',
      groupName: '',
      attributes: ['']
    }
  ];

  console.log('values', values);
  console.log('errors', errors);

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < errors.length; j++) {
      if (i === j && values[i].groupName === '') {
        errors[j].groupName = 'Group Name cannot be emppty';
      } else if (i === j && values[i].groupName.length < 3) {
        errors[j].groupName = 'Group Name needs to be 3 characters or more';
      }

      if (i === j && values[i].attributes.filter((item) => !item)) {
        console.log('heelo');
        errors[j].attributes.map(
          (item) => !item && item === 'Attribute Name not empty'
        );
      }
    }
  }

  // values.map((item, index) => {
  //   if (!item.groupName) {
  //     errors.groupName[0] = 'Group Name cannot be emppty';
  //   } else if (item.groupName.length < 3) {
  //     errors.groupName[1] = 'Group Name needs to be 3 characters or more';
  //   }
  // });

  return errors;
}
