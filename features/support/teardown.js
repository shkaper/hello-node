/**
 * New node file
 */

module.exports = function () {
  
  this.After(function(callback) {

    console.log('Shutting down browser');
    
    this.end(callback);

  });

};