/**
 * New node file
 */

module.exports = function () {
    console.log('Create Steps Loaded');
    this.World = require('../support/world');

    /* "<Then> I should see <input1> and <input2> in a registered order" */
    this.Then(/^I should see '(.*)' and '(.*)' in a registered order$/, function (input1, input2, callback) {

        this.waitForText("body", 3000, function (err) {

            if (err) {
                return callback.fail(new Error('Text was not loaded after 3s'));
            }

            this.getText("pre", function (err, text) {
            	console.log(text);
            	console.log(input1);
            	console.log(input2);
            	var regexp1 = new RegExp(".+: "+input1);
            	var regexp2 = new RegExp(".+: "+input2);
            	console.log(regexp1.test(text));
            	console.log(regexp2.test(text));

                // Failed test
                if ( regexp1.test(text) === false || regexp2.test(text) === false) {
                	return callback.fail(new Error('Wrong order'));
                }

                // Passed test
                console.log( '(Found ' + input1 + ' and ' + input2 + ')');
                return callback();
            });

        });
    });
};