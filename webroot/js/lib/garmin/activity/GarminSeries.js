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
 * @fileoverview GarminSeries - A datastructure designed to contain a series of
 * GarminSample.
 *
 * @version 1.9
 */

/**
 * Contains a series of samples.  Could represent tracks, routes, waypoints, and
 * many other types of data.
 *
 * @class Garmin.Series
 * @constructor 
 * @param (String) type - the type of data this series contain. Should be determined by what
 * 							information is recorded by the samples this series contain.
 */
define(function() {

  var GarminSeries = function(seriesType) {
    this.seriesType = seriesType;
    this.samples = [];
  };

  GarminSeries.prototype = {
  	getSeriesType: function() {
  		return this.seriesType;
  	},
  
  	setSeriesType: function(seriesType) {
  		this.seriesType = seriesType;
  	},
  
  	getSamples: function() {
  		return this.samples;		
  	},

  	getSample: function(index) {
  		var targetSample = null;
  		if (index >= 0 && index < this.samples.length) {
  			targetSample = this.samples[index];
  		}
  		return targetSample;
  	},
  	
  	addSample: function(sample) {
  		if (sample != null) {
  			this.samples.push(sample);			
  		}
  	},
  	
  	getSamplesLength: function() {
  		return this.samples.length;
  	},
  
  	getFirstValidLocationSample: function() {
  		return this.findNearestValidLocationSample(0, 1);
  	},
  	
  	getLastValidLocationSample: function() {
  		return this.findNearestValidLocationSample(this.getSamplesLength()-1, -1);
  	},
      
    /** Find the nearest valid location point to the index given
     * 
     * @param index is the index
     * @param incDirection is an int in the direction we'd like to look positive 
     * 	nums are forward, negative nums are backwards
     * 
     * @type GarminSample 
     * @return The nearest point (possibly the index) that has a valid latitude and longitude
     */ 
    findNearestValidLocationSample: function(index, incDirection) {
		  return this._findNearestValidLocationSampleInternal(index, incDirection, 0);
    },
  	
  	_findNearestValidLocationSampleInternal: function(index, incDirection, count) {
  		// make sure we haven't looped through every element already
  		if (this.getSamplesLength() > 0 && count < this.getSamplesLength()) {
  			// make sure index requested is within bounds
  			if (index >= 0 && index < this.getSamplesLength()) {
  				var sample = this.getSample(index);
  				if (sample.isValidLocation()) {
  					return sample;	
  				} else {
  					return this._findNearestValidLocationSampleInternal(index + incDirection, incDirection, ++count);
  				}
  			} else if (index > this.getSamplesLength()) {
  				return this._findNearestValidLocationSampleInternal(this.getSamplesLength()-1, -1, count);
  			} else {
  				return this._findNearestValidLocationSampleInternal(0, 1, count);
  			}	
  		} else {
  			return null;
  		}		
  	},
  	
  	printMe: function(tabs) {
  		var output = tabs + "  [Series]\n";
  		output += tabs + "    seriesType: " + this.seriesType + "\n";	
  		output += tabs + "    samples:\n";
  		for (var i = 0; i < this.samples.length; i++) {
  			output += this.samples[i].printMe(tabs + "    ");
  		}
  		return output;
  	},
  	
  	toString: function() {
  		return "[Series]";
  	}
  };
  
  GarminSeries.TYPES = {
    history:    'history',
    route:      'route',
    waypoint:   'waypoint',
    course:     'course'
  };

  return GarminSeries;

});
