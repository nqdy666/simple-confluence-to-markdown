// Generated by CoffeeScript 1.12.7
(function() {
  require('./init');

  describe('Formatter', function() {
    it('fixHeadline()', function() {
      var $content, formatter, logger, text, utils;
      logger = new Logger(Logger.WARNING);
      utils = new Utils(_fs, _path, _ncp, logger);
      formatter = new Formatter(_cheerio, utils, logger);
      text = '<h1 id="CodingStandards-Odsadzovanieašírkakódu"><span class="mw-headline">Odsadzovanie a šírka kódu</span></h1>';
      $content = formatter.load(text).root();
      $content = formatter.fixHeadline($content);
      return assert.equal(formatter.getText($content), 'Odsadzovanie a šírka kódu');
    });
    it('fixIcon()', function() {
      var $content, formatter, logger, text, utils;
      logger = new Logger(Logger.WARNING);
      utils = new Utils(_fs, _path, _ncp, logger);
      formatter = new Formatter(_cheerio, utils, logger);
      text = '<div class="confluence-information-macro confluence-information-macro-information"><span class="aui-icon aui-icon-small aui-iconfont-info confluence-information-macro-icon"></span><div class="confluence-information-macro-body"><p>čitatelnosť kódu</p></div></div>';
      $content = formatter.load(text).root();
      assert.equal($content.find('span.aui-icon').length, 1);
      $content = formatter.fixIcon($content);
      assert.equal(formatter.getText($content), 'čitatelnosť kódu');
      return assert.equal($content.find('span.aui-icon').length, 0);
    });
    it('fixEmptyLink() should remove empty link', function() {
      var $content, formatter, logger, text, utils;
      logger = new Logger(Logger.WARNING);
      utils = new Utils(_fs, _path, _ncp, logger);
      formatter = new Formatter(_cheerio, utils, logger);
      text = '<h1 class="firstHeading" id="CodingStandards-">foo<a name="HTML_v_templatech" rel="nofollow"></a></h1>';
      $content = formatter.load(text).root();
      $content = formatter.fixEmptyLink($content);
      return assert.equal($content.find('a').length, 0);
    });
    it('fixEmptyLink() should keep non-empty link', function() {
      var $content, formatter, logger, text, utils;
      logger = new Logger(Logger.WARNING);
      utils = new Utils(_fs, _path, _ncp, logger);
      formatter = new Formatter(_cheerio, utils, logger);
      text = '<h1 class="firstHeading" id="CodingStandards-">foo<a name="HTML_v_templatech" rel="nofollow">bar</a></h1>';
      $content = formatter.load(text).root();
      $content = formatter.fixEmptyLink($content);
      return assert.equal($content.find('a').length, 1);
    });
    it('fixEmptyLink() should remove empty heading', function() {
      var $content, formatter, logger, text, utils;
      logger = new Logger(Logger.WARNING);
      utils = new Utils(_fs, _path, _ncp, logger);
      formatter = new Formatter(_cheerio, utils, logger);
      text = '<h1 class="firstHeading" id="CodingStandards-"><a name="HTML_v_templatech" rel="nofollow"></a></h1>';
      $content = formatter.load(text).root();
      $content = formatter.fixEmptyLink($content);
      return assert.equal($content.find('a').length, 0);
    });
    it('fixPreformattedText() should give php class the \<pre\> tag', function() {
      var $content, formatter, logger, text, utils;
      logger = new Logger(Logger.WARNING);
      utils = new Utils(_fs, _path, _ncp, logger);
      formatter = new Formatter(_cheerio, utils, logger);
      text = '<pre class="syntaxhighlighter-pre" data-syntaxhighlighter-params="brush: php; gutter: false; theme: Confluence" data-theme="Confluence">echo "foo";</pre>';
      $content = formatter.load(text).root();
      $content = formatter.fixPreformattedText($content);
      return assert.equal($content.find('pre').attr('class'), 'php');
    });
    it('fixPreformattedText() should give no class to the \<pre\> tag when no brush is set', function() {
      var $content, formatter, logger, text, utils;
      logger = new Logger(Logger.WARNING);
      utils = new Utils(_fs, _path, _ncp, logger);
      formatter = new Formatter(_cheerio, utils, logger);
      text = '<pre class="syntaxhighlighter-pre" data-theme="Confluence">echo "foo";</pre>';
      $content = formatter.load(text).root();
      $content = formatter.fixPreformattedText($content);
      return assert.equal($content.find('pre').attr('class'), void 0);
    });
    return it('fixImageWithinSpan() should give ...', function() {
      var $content, formatter, logger, text, utils;
      logger = new Logger(Logger.WARNING);
      utils = new Utils(_fs, _path, _ncp, logger);
      formatter = new Formatter(_cheerio, utils, logger);
      text = '<pre class="syntaxhighlighter-pre" data-theme="Confluence">echo "foo";</pre>';
      $content = formatter.load(text).root();
      $content = formatter.fixPreformattedText($content);
      return assert.equal($content.find('pre').attr('class'), void 0);
    });
  });

}).call(this);
