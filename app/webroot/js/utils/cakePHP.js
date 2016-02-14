import {forEach} from 'lodash';

function encodeFormData(/*?any*/ formData, /*string*/formName) /*object*/ {
  let encodedData = {};
  forEach(formData, (value, key) => {
    let encodedField = encodeFormFieldName(key, formName);
    encodedData[encodedField] = value;
  });
  return encodedData;
}

/**
 * Takes an input named "distance" from a form named 'Workout' and
 * returns the string "data[Workout][distance]".
 */
function encodeFormFieldName(/*string*/ name, /*string*/ formName) /*string*/ {
  return `data[${formName}][${name}]`;
}

/**
 * Takes an input named "data[Workout][distance]" and returns
 * the string "distance".
 */
function decodeFormFieldName(/*string*/ name) /*string*/ {
  return name.split('[').pop().slice(0, -1);
}

/**
 * cakePHP.js
 *
 * Util functions for adapting JS to CakePHP quirks
 */
module.exports = {
  decodeFormFieldName,
  encodeFormData,
  encodeFormFieldName,
};
