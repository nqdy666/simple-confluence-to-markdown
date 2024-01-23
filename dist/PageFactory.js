// Generated by CoffeeScript 1.12.7
(function() {
  var PageFactory;

  PageFactory = (function() {
    var Page;

    Page = require('./Page');

    function PageFactory(formatter, utils) {
      this.formatter = formatter;
      this.utils = utils;
    }

    PageFactory.prototype.create = function(fullPath) {
      return new Page(fullPath, this.formatter, this.utils);
    };

    return PageFactory;

  })();

  module.exports = PageFactory;

}).call(this);