/**
 * Created by mporter on 3/10/15.
 */
define([
        // libs
    ], function () {
        return {
            run: function () {
                test('dummyLib should return the sum of the two supplied numbers.', function () {
                    equal(1+1, 2, 'The return should be 2.');
                    equal(-2+1, -1, 'The return should be -1.');
                });
            }
        }
    }
);