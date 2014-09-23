/*
* Copyright 2014 Hippo B.V. (http://www.onehippo.com)
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*  http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

(function () {
    'use strict';

    angular.module('hippo.theme').directive('pre', [
        '$window',
        function ($window) {
            return {
                restrict: 'E',
                link: function (scope, element, attr) {
                    var ignoreExpression = /\s/,
                    text = element.html(),
                    superfluousSpaceCount = 0,
                    currentChar = text.substring( 0, 1 ),
                    parts = text.split("\n"),
                    reformattedText = "",
                    length = parts.length;

                    while ( ignoreExpression.test( currentChar ) ) {
                        currentChar = text.substring( ++superfluousSpaceCount, superfluousSpaceCount + 1 );
                    }

                    for ( var i = 0; i < length; i++ ) {
                        reformattedText += parts[i].substring( superfluousSpaceCount ) + ( i == length - 1 ? "" : "\n" );
                    }

                    reformattedText = reformattedText.replace(/ /g, "&nbsp;");

                    element.html($window.prettyPrintOne(reformattedText, undefined, true));
                    element.addClass('pre-scrollable');
                }
            };
        }
    ]);
})();

