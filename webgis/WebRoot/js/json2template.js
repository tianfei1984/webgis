/// <reference path="../vsdoc/jquery.vsdoc.js" />

// json2template.js is a jQuery plugin
// created by Radim Köhler
// see http://catarsa.com for more details and documentation http://catarsa.com/Articles/Code/json2template-documentation


//InnerXHTML Written by Steve Tucker, 2006, http://www.stevetucker.co.uk
//Full documentation can be found at http://www.stevetucker.co.uk/page-innerxhtml.php
//Released under the Creative Commons Attribution-Share Alike 3.0  License, http://creativecommons.org/licenses/by-sa/3.0/
eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) { d[e(c)] = k[c] || e(c) } k = [function (e) { return d[e] } ]; e = function () { return '\\w+' }; c = 1 }; while (c--) { if (k[c]) { p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]) } } return p } ('p=x(9){6(y(9)==\'w\')9=s.t(9);6(!(9.j==1))o u;5 2=9.v;5 4=\'\';m(5 c=0;c<2.n;c++){6(2[c].j==3){5 $7=2[c].r;$7=$7.l(/</g,\'<\');$7=$7.l(/>/g,\'>\');4+=$7}d 6(2[c].j==1&&2[c].i.A(0,1)=="/"){}d 6(2[c].j==8){}d{4+=\'<\'+2[c].i.e();5 $b=2[c].b;m(5 a=0;a<$b.n;a++){5 $f=$b[a].i.e();5 $k=$b[a].r;6($f==\'h\'&&2[c].h.q){4+=\' h="\'+2[c].h.q.e()+\'"\'}d 6($k&&$f!=\'z\'){4+=\' \'+$f+\'="\'+$k+\'"\'}}4+=\'>\'+p(2[c]);4+=\'</\'+2[c].i.e()+\'>\'}}o 4}', 37, 37, '||_children||_html|var|if|text_content||source||attributes||else|toLowerCase|attName||style|nodeName|nodeType|attValue|replace|for|length|return|innerXHTML|cssText|nodeValue|document|getElementById|false|childNodes|string|function|typeof|contenteditable|substr'.split('|'), 0, {}))

// http: //jacwri   ght.com/projects/javascript/date_format
// Simulates PHP's date function
Date.prototype.format = function (format) { var returnStr = ''; var replace = Date.replaceChars; for (var i = 0; i < format.length; i++) { var curChar = format.charAt(i); if (replace[curChar]) { returnStr += replace[curChar].call(this); } else { returnStr += curChar; } } return returnStr; }; Date.replaceChars = { shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], d: function () { return (this.getDate() < 10 ? '0' : '') + this.getDate(); }, D: function () { return Date.replaceChars.shortDays[this.getDay()]; }, j: function () { return this.getDate(); }, l: function () { return Date.replaceChars.longDays[this.getDay()]; }, N: function () { return this.getDay() + 1; }, S: function () { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); }, w: function () { return this.getDay(); }, z: function () { return "Not Yet Supported"; }, W: function () { return "Not Yet Supported"; }, F: function () { return Date.replaceChars.longMonths[this.getMonth()]; }, m: function () { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); }, M: function () { return Date.replaceChars.shortMonths[this.getMonth()]; }, n: function () { return this.getMonth() + 1; }, t: function () { return "Not Yet Supported"; }, L: function () { return (((this.getFullYear() % 4 == 0) && (this.getFullYear() % 100 != 0)) || (this.getFullYear() % 400 == 0)) ? '1' : '0'; }, o: function () { return "Not Supported"; }, Y: function () { return this.getFullYear(); }, y: function () { return ('' + this.getFullYear()).substr(2); }, a: function () { return this.getHours() < 12 ? 'am' : 'pm'; }, A: function () { return this.getHours() < 12 ? 'AM' : 'PM'; }, B: function () { return "Not Yet Supported"; }, g: function () { return this.getHours() % 12 || 12; }, G: function () { return this.getHours(); }, h: function () { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); }, H: function () { return (this.getHours() < 10 ? '0' : '') + this.getHours(); }, i: function () { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); }, s: function () { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); }, e: function () { return "Not Yet Supported"; }, I: function () { return "Not Supported"; }, O: function () { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; }, P: function () { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':' + (Math.abs(this.getTimezoneOffset() % 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() % 60)); }, T: function () { var m = this.getMonth(); this.setMonth(0); var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); this.setMonth(m); return result; }, Z: function () { return -this.getTimezoneOffset() * 60; }, c: function () { return this.format("Y-m-d") + "T" + this.format("H:i:sP"); }, r: function () { return this.toString(); }, U: function () { return this.getTime() / 1000; } };

(function ($)
{
    $.fn.bindTemplate = function (data)
    {
        ///	<summary>
        ///		This function expects the 'data' object with the source: JSON and optional settings.
        ///     Source will be bounded into the template markup.
        ///	</summary>
        ///	<param name="data" type="object">
        ///		1) source: - A JSON object representing the data source<param>more</param>
        ///		2) template: - optional! When null then the target $(selector) inner HTML is used as a template.
        ///		2a: template: - An element $(selector) to be used as a template (inner HTML).
        ///		2b: template: - A string of HTML to be used as a template.
        ///		3) tagOpen: - optional! A string representing the markup prefix. Default value "{{".
        ///		4) tagClose: - optional! A string representing the markup sufix. Default value "}}".
        ///		5) dateFormat: - optional! A string representing the PHP date format. e.g. 'd.m.Y'.
        ///         When not provided toLocalDate() + toLocalTime() is used for dates.
        ///	</param>
        ///	<returns type="jQuery" />

        var binder = $.json2template;

        var target = $(this);

        binder.settings.tag.open = data.tagOpen || binder.settings.tag.defaultOpen;
        binder.settings.tag.close = data.tagClose || binder.settings.tag.defaultClose;

        binder.settings.dateFormat = data.dateFormat;

        var template = target.html();
        if (data.template == null)
        {
            target.html(""); // target is template: so clear it!
        }
        else
        {
            template = data.template;        // template is a string
            if (typeof template == 'object') // template was the jQuery element
            {
                template = innerXHTML(template.get(0));

                var pattern = binder.settings.tag.equalSign
                            + binder.settings.tag.quotation
                            + binder.settings.tag.open
                            + binder.settings.tag.content
                            + binder.settings.tag.close
                            + binder.settings.tag.quotation;
                template = template.replace(RegExp(pattern, "g")
                                , function (m) { return m.substr(0, m.length - 1) + ' "'; });
            }
        }

        binder.execute(data.source, template, target);

        return $(this);
    };

    $.json2template =
    {
        jQuery: $,
        settings:
        {
            prototype:
            {
                errorIncorrectSource: '<p>Incorrect datasource (null value)!</p>'
               , errorIncorrectTemplate: '<p>Incorrect template or target (null value)!</p>'
            },
            tag:
            {
                open: '{{'
               , close: '}}'
               , defaultOpen: '{{'
               , defaultClose: '}}'
               , quotation: '"'
               , equalSign: '='
               , space: ' '
               , content: '[A-Z0-9a-z\.\$_-]+' // expected (and supported) json properties syntax
            }
            , dateFormat: null
            , templateAttributes: ['class*', 'template'] // one of the classes, or dummy attribute template
        },
        execute: function (item, template, placeHolder)
        {
            // set the local variables, to assure that we work with the right (expected) objects
            var $ = jQuery, _this = $.json2template, settings = _this.settings

            if (item == null) // no source
            {
                ($(settings.prototype.errorIncorrectSource).appendTo(placeHolder));
                return;
            }
            if (template == null) // no template
            {
                ($(settings.prototype.errorIncorrectTemplate).appendTo(placeHolder));
                return;
            }
            var tag = this.getWrapper(template); // table rows must be wrapped in TABLE tag

            // template could be missing the root container, so create one
            var html = _this.iterate(item, '<' + tag + '>' + template + '</' + tag + '>');

            html = _this.replaceValue(html, settings.tag.content, "");

            // pam-pa-da-daaaaaa ... let's convert the result into the DOM element
            var result = $(html);

            if (placeHolder != null)
            {
                $(placeHolder).html("");
            }

            result.children().each(function ()
            {
                ($(this).appendTo(placeHolder || 'BODY'));
            });
        },
        outerHTML: function (obj)
        {
            // set the local variables, to assure that we work with the right (expected) objects
            var $ = jQuery, _this = $.json2template, settings = _this.settings

            var parent = jQuery("<div></div>");
            parent.append($(obj).clone());

            var result = $(parent).html();

            return result;
        },
        getWrapper: function(template)
        {
            if ( this.startWith(template, "<tbody")
            || this.startWith(template, "<thead")
            || this.startWith(template, "<tfoot")
            || this.startWith(template, "<tr"))
            {
                return "table";
            }
            return "div";
        },

        startWith: function(str, val)
        {
            return jQuery.trim(str).match("^"+val)==val;
        },

        iterate: function (item, template, identifier)
        {
            // set the local variables, to assure that we work with the right (expected) objects
            var $ = jQuery, _this = $.json2template, settings = _this.settings

            identifier = identifier || new Array();

            var properties = _this.orderProperties(item);

            for (var i = 0; i < properties.length; i++)
            {
                var property = properties[i];
                var value = item[property];
                if (value == null)
                {
                    continue; // nothing to be processed
                }
                if (typeof value != 'object' || value instanceof Date)
                {
                    template = _this.processValue(value, template, identifier.concat(property));
                    continue;   // process value type (string, number, date)
                }
                if (value.length != null)
                {
                    template = _this.processArray(value, template, identifier.concat(property));
                    continue;   // process array
                }
                template = _this.iterate(value, template, identifier.concat(property));
            }
            return template;
        },

        processArray: function (item, template, identifier)
        {
            // set the local variables, to assure that we work with the right (expected) objects
            var $ = jQuery, _this = $.json2template, settings = _this.settings

            var templateDocument = $(template);

            _this.findTemplates(templateDocument, identifier)  // now let's search the Array templates
            .each(function ()
            {
                var nodeTemplate = _this.outerHTML(this);

                var nodes = "";
                for (var property in item)
                {
                    var node = _this.iterate(item[property], nodeTemplate, identifier);
                    var re = new RegExp(settings.tag.open + settings.tag.content + settings.tag.close, "g")
                    nodes += node; //.replace(re, ""); // cleanup the rest of of the template markup
                }

                $(this).replaceWith($(nodes));
            });
            return _this.outerHTML(templateDocument);
        },
        // replaces the {{valueTypeName}} with the 'object.valueTypeName' value
        // tries to find {{valueTypeName}}; {{object.valueTypeName}}; {{parent.object.valueTypeName}} ...
        processValue: function (value, template, identifier)
        {
            // set the local variables, to assure that we work with the right (expected) objects
            var $ = jQuery, _this = $.json2template, settings = _this.settings

            var formatted = _this.format(value);
            var search = identifier[identifier.length - 1];

            for (var deep = identifier.length - 1; deep >= 0; deep--)
            {
                template = _this.replaceValue(template, search, formatted)

                search = identifier[deep - 1] + "." + search;
            }
            return template;
        },
        replaceValue: function (template, search, replacement)
        {
            // set the local variables, to assure that we work with the right (expected) objects
            var $ = jQuery, _this = $.json2template, settings = _this.settings
            var tag = settings.tag;

            var mark = tag.open + search + tag.close;
            var attrMark = tag.equalSign
                         + tag.quotation
                         + mark
                         + tag.space
                         + tag.quotation;
            var escapeMark = tag.equalSign
                         + tag.quotation
                         + escape(mark
                         + tag.space)
                         + tag.quotation;
            var attrRepla = tag.equalSign
                         + tag.quotation
                         + replacement
                         + tag.quotation;

            // IE 6.0 pre-filled the template attributes href and src ... with the window.location
            template = template.replace(RegExp(window.location.href.substring(0
                                     , window.location.href.lastIndexOf("/") + 1)
                                   , "g")
                                , "");

            template = template.replace(RegExp(attrMark, "g"), attrRepla); // fix IE missing quot for attributes (title="title")
            template = template.replace(RegExp(escapeMark, "g"), attrRepla);

            template = template.replace(RegExp(mark, "g"), replacement);
            template = template.replace(RegExp(escape(mark), "g"), replacement); // fix FF url 'fix'

            return template;
        },
        // puts the property-arrays (e.g. Items[]) at the beginning of the processing que
        // of all object properties
        // also puts the object properties at the end (and valueTypes in the middle)
        orderProperties: function (obj)
        {
            // set the local variables, to assure that we work with the right (expected) objects
            var $ = jQuery, _this = $.json2template, settings = _this.settings

            var item = obj;
            var properties = new Array();
            var objects = new Array();
            for (var property in item)
            {
                if (item[property] != null
                  && typeof item[property] == 'object')
                {
                    if (item[property] instanceof Array)
                    {
                        properties.splice(0, 0, property);
                        continue;
                    }
                    if (!(item[property] instanceof Date))
                    {
                        objects.push(property);
                        continue;
                    }
                }
                properties.push(property);
            }
            return $.merge(properties, objects);
        },

        // iterates 'template' to find out the HTML snippets which should be filled with the property-array
        findTemplates: function (templateDocument, identifier)
        {
            // set the local variables, to assure that we work with the right (expected) objects
            var $ = jQuery, _this = $.json2template, settings = _this.settings
            var tag = $.json2template.settings.tag;

            var result = new Array()

            var search = identifier[identifier.length - 1];
            for (var deep = identifier.length - 1; deep >= 0; deep--)
            {
                for (var i = 0; i < settings.templateAttributes.length; i++)
                {
                    $.merge(result, $('[' + settings.templateAttributes[i]
                                    + '="'
                                          + tag.open + search + tag.close
                                    + '"]'
                                    , templateDocument));
                }
                search = identifier[deep - 1] + "." + search;
            }

            return $(result);
        },

        format: function (value)
        {
            // set the local variables, to assure that we work with the right (expected) objects
            var $ = jQuery, _this = $.json2template, settings = _this.settings

            if (parseFloat(value))
            {
                return value;
            }

            var date = null;
            if (value instanceof Date)
            {
                date = value;
            }
            else if (typeof value == "string")
            {
                if (value.length = 29 && value.substr(25, 29) == " GMT")
                {
                    var num = Date.parse(value);
                    if (!isNaN(num))
                    {
                        date = new Date(num);
                    }
                }
                else if (value.substr(0, 6) == "/Date(")
                {   // fix Microsoft "/Date(123)/" format, created for their parsers
                    num = new Date(parseInt(value.substr(6)));
                    if (!isNaN(num))
                    {
                        date = new Date(num);
                    }
                }
            }

            if (date == null)
            {
                return value.toString();
            }

            if (settings.dateFormat)
            {
                return date.format(settings.dateFormat);
            }
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();

        },
        _: function () { }
    };
}
)(jQuery);