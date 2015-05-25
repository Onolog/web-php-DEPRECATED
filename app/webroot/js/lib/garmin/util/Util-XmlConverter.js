/**
 * Copyright &copy; 2007-2010 Garmin Ltd. or its subsidiaries.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License')
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @fileoverview Garmin.XmlConverter A class for converting between xml strings and DOM objects.
 * @version 1.9
 */
/**
 * @class Garmin.XmlConverter
 * Convert XML text to a DOM and back.
 * @constructor 
 */
define(function() {

  var GarminXmlConverter = function() {}; // just here for jsdoc
  GarminXmlConverter = {
    /**
     * Returns an xml document based on the string passed in
     * @param {String} fromString is the xml string to convert
     * @returns {Document}
     * @member Garmin.XmlConverter
     */
    toDocument: function(fromString) {
      // Internet Explorer
      if (window.ActiveXObject) {
        var doc = new ActiveXObject('Microsoft.XMLDOM');
        doc.async = "false";
        doc.loadXML(fromString);
        return doc;
      }

	    return new DOMParser().parseFromString(fromString, "text/xml");
    },
      
    /**
     * Converts a document to a string, and then returns the string
     * @param {Document} fromDocument is the DOM Object to convert
     * @returns {String}
     * @member Garmin.XmlConverter
     */  
    toString: function(fromDocument) {
  		if (window.ActiveXObject) {
  			return fromDocument.xml
  		} else {
  			var theXmlSerializer = new XMLSerializer();
  			return theXmlSerializer.serializeToString( fromDocument );
  		}
    }
  };

  return GarminXmlConverter;

});