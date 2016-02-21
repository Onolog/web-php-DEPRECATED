import {forEach} from 'lodash';

/**
 * Takes an input named "distance" from a form named 'Workout' and
 * returns the string "data[Workout][distance]".
 */
function encodeFormFieldName(/*string*/ name, /*string*/ formName) /*string*/ {
  return `data[${formName}][${name}]`;
}

/**
 * encodeData.js
 *
 * Takes a data object and encodes the field names in CakePHP format.
 */
function encodeData(/*?any*/ formData, /*string*/formName) /*object*/ {
  let encodedData = {};
  forEach(formData, (value, key) => {
    let encodedField = encodeFormFieldName(key, formName);
    encodedData[encodedField] = value;
  });
  return encodedData;
}

module.exports = encodeData;
