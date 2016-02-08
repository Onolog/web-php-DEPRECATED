/**
 * cakePHP.js
 *
 * Util functions for adapting JS to CakePHP quirks
 */
module.exports = {
  encodeFormData: function(formData, formName) {
    var encodedData = {};
    for (var key in formData) {
      if (formData.hasOwnProperty(key)) {
        var encodedField = this.encodeFormFieldName(key, formName);
        encodedData[encodedField] = formData[key];
      }
    }
    return encodedData;
  },
  /**
   * Takes an input named "distance" from a form named 'Workout' and
   * returns the string "data[Workout][distance]".
   */
  encodeFormFieldName: function(
    /*string*/ name,
    /*string*/ formName
  ) /*string*/ {
    return `data[${formName}][${name}]`;
  },

  /**
   * Takes an input named "data[Workout][distance]" and returns
   * the string "distance".
   */
  decodeFormFieldName: function(name) /*string*/ {
    return name.split('[').pop().slice(0, -1);
  },
};
