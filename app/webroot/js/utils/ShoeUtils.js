/**
 * ShoeUtils.js
 */
module.exports = {
  /**
   * Group the user's shoes into active and inactive sets.
   */
  groupByActivity: function(/*array*/ shoes) /*array*/ {
    var activeShoes = [];
    var inactiveShoes = [];

    shoes.forEach(function(shoe) {
      if (shoe.inactive) {
        inactiveShoes.push(shoe);
      } else {
        activeShoes.push(shoe);
      }
    });

    return {
      active: activeShoes,
      inactive: inactiveShoes
    };
  }
};
