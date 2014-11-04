/**
 * Generic steps for feature tests
 */

var PROPERTIES = require('../../properties.json');

module.exports = function () {
//	var baseUrl = 'http://127.0.0.1:1337';
	var baseUrl = 'http://' + PROPERTIES.host + ':' + PROPERTIES.port;
    console.log('Generic Steps Loaded');
    this.World = require('../support/world.js');

    /* "<Given> I visit <url> page" */
    this.Given(/^I visit (\/.{1,}|\/) page$/, function (url, callback) {
        this.init().url(baseUrl+ url, callback);
    });

    /* "<When> I enter <text> into <inputId>" */
    this.When(/^I enter '(.*)' into '(.*)'$/, function (text, inputId, callback) {
    	
        inputId = '#' + inputId;

        this.waitFor(inputId, 2000, function (err, found) {

            if (!err) {
                this.setValue(inputId, text, callback);
                console.log('Set ' + inputId + ' to ' + text);
                return;
            }

            callback.fail(new Error('Element ' + inputId + ' was not found after 3s'));

        });
    });
    
    /* "<When> I click <inputId>" */
    this.When(/^I click '(.+)'$/, function (inputId, callback) {

        inputId = '#' + inputId;

        this.waitFor(inputId, 2000, function (err, found) {

            if (!err) {
                this.click(inputId);
                console.log('returning');
                return callback();
            }

            callback.fail(new Error('Element ' + inputId + ' was not found after 3s'));

        });
    });
};