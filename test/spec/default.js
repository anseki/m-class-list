
describe('mClassList', function() {
  'use strict';

  var div, div2, rect;

  beforeAll(function(done) {
    div = document.body.appendChild(document.createElement('div'));
    div2 = document.body.appendChild(document.createElement('div'));
    var SVG_NS = 'http://www.w3.org/2000/svg';
    rect = document.body.appendChild(document.createElementNS(SVG_NS, 'svg'))
      .appendChild(document.createElementNS(SVG_NS, 'rect'));

    // Count updates
    var setAttributeDiv = div.setAttribute;
    div.setAttribute = function() {
      div.updates++;
      setAttributeDiv.apply(div, arguments);
    };
    var setAttributeRect = rect.setAttribute;
    rect.setAttribute = function() {
      rect.updates++;
      setAttributeRect.apply(rect, arguments);
    };

    done();
  });

  describe('.ignoreNative', function() {

    it('forces shim (HTML)', function(done) {
      if (div.classList) {
        expect(mClassList(div)).toBe(div.classList);
        mClassList.ignoreNative = true;
        expect(mClassList(div)).not.toBe(div.classList);
        mClassList.ignoreNative = false;
      }
      done();
    });

    it('forces shim (SVG)', function(done) {
      if (rect.classList) {
        expect(mClassList(rect)).toBe(rect.classList);
        mClassList.ignoreNative = true;
        expect(mClassList(rect)).not.toBe(rect.classList);
        mClassList.ignoreNative = false;
      }
      done();
    });

  });

  describe('.length', function() {

    it('returns 0 if no class (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = '';
      expect(mClassList(div).length).toBe(0);
      div.removeAttribute('class');
      expect(mClassList(div).length).toBe(0);

      done();
    });

    it('returns 0 if no class (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = '';
      expect(mClassList(rect).length).toBe(0);
      rect.removeAttribute('class');
      expect(mClassList(rect).length).toBe(0);

      done();
    });

    it('returns number of classes (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = 'c1';
      expect(mClassList(div).length).toBe(1);
      div.className = 'c1 c2';
      expect(mClassList(div).length).toBe(2);

      div.className = '  c1  ';
      expect(mClassList(div).length).toBe(1);
      div.className = '  c1  c2  ';
      expect(mClassList(div).length).toBe(2);

      div.className = '';
      expect(mClassList(div).length).toBe(0);

      done();
    });

    it('returns number of classes (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = 'c1';
      expect(mClassList(rect).length).toBe(1);
      rect.className.baseVal = 'c1 c2';
      expect(mClassList(rect).length).toBe(2);

      rect.className.baseVal = '  c1  ';
      expect(mClassList(rect).length).toBe(1);
      rect.className.baseVal = '  c1  c2  ';
      expect(mClassList(rect).length).toBe(2);

      rect.className.baseVal = '';
      expect(mClassList(rect).length).toBe(0);

      done();
    });

  });

  describe('.item', function() {

    it('returns token by index (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = 'c1';
      expect(mClassList(div).item(0)).toBe('c1');
      div.className = 'c1 c2';
      expect(mClassList(div).item(0)).toBe('c1');
      expect(mClassList(div).item(1)).toBe('c2');
      expect(mClassList(div).item(2) == null).toBe(true);

      div.className = '  c1  ';
      expect(mClassList(div).item(0)).toBe('c1');
      div.className = '  c1  c2  ';
      expect(mClassList(div).item(0)).toBe('c1');
      expect(mClassList(div).item(1)).toBe('c2');
      expect(mClassList(div).item(2) == null).toBe(true);

      div.className = '';
      expect(mClassList(div).item(0) == null).toBe(true);

      done();
    });

    it('returns token by index (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = 'c1';
      expect(mClassList(rect).item(0)).toBe('c1');
      rect.className.baseVal = 'c1 c2';
      expect(mClassList(rect).item(0)).toBe('c1');
      expect(mClassList(rect).item(1)).toBe('c2');
      expect(mClassList(rect).item(2) == null).toBe(true);

      rect.className.baseVal = '  c1  ';
      expect(mClassList(rect).item(0)).toBe('c1');
      rect.className.baseVal = '  c1  c2  ';
      expect(mClassList(rect).item(0)).toBe('c1');
      expect(mClassList(rect).item(1)).toBe('c2');
      expect(mClassList(rect).item(2) == null).toBe(true);

      rect.className.baseVal = '';
      expect(mClassList(rect).item(0) == null).toBe(true);

      done();
    });

  });

  describe('.contains', function() {

    it('returns true if token is in the list (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = 'c1';
      expect(mClassList(div).contains('c1')).toBe(true);
      expect(mClassList(div).contains('c2')).toBe(false);
      div.className = 'c1 c2';
      expect(mClassList(div).contains('c1')).toBe(true);
      expect(mClassList(div).contains('c2')).toBe(true);
      expect(mClassList(div).contains('c3')).toBe(false);

      div.className = '  c1  ';
      expect(mClassList(div).contains('  c1')).toBe(true);
      expect(mClassList(div).contains('  c2')).toBe(false);
      div.className = '  c1  c2  ';
      expect(mClassList(div).contains('  c1')).toBe(true);
      expect(mClassList(div).contains('  c2')).toBe(true);
      expect(mClassList(div).contains('  c3')).toBe(false);

      div.className = '';
      expect(mClassList(div).contains('c1')).toBe(false);

      done();
    });

    it('returns true if token is in the list (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = 'c1';
      expect(mClassList(rect).contains('c1')).toBe(true);
      expect(mClassList(rect).contains('c2')).toBe(false);
      rect.className.baseVal = 'c1 c2';
      expect(mClassList(rect).contains('c1')).toBe(true);
      expect(mClassList(rect).contains('c2')).toBe(true);
      expect(mClassList(rect).contains('c3')).toBe(false);

      rect.className.baseVal = '  c1  ';
      expect(mClassList(rect).contains('  c1')).toBe(true);
      expect(mClassList(rect).contains('  c2')).toBe(false);
      rect.className.baseVal = '  c1  c2  ';
      expect(mClassList(rect).contains('  c1')).toBe(true);
      expect(mClassList(rect).contains('  c2')).toBe(true);
      expect(mClassList(rect).contains('  c3')).toBe(false);

      rect.className.baseVal = '';
      expect(mClassList(rect).contains('c1')).toBe(false);

      done();
    });

  });

  describe('.add', function() {

    it('appends tokens if each one is not in the list (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = '';
      div.updates = 0;
      mClassList(div).add('c1');
      expect(div.className).toBe('c1');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).add('c2');
      expect(div.className).toBe('c1 c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).add('c1');
      expect(div.className).toBe('c1 c2');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).add('c1a', 'c2a');
      expect(div.className).toBe('c1 c2 c1a c2a');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).add('c1a', 'c3a');
      expect(div.className).toBe('c1 c2 c1a c2a c3a');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).add('');
      expect(div.className).toBe('c1 c2 c1a c2a c3a');
      expect(div.updates).toBe(0);

      div.className = '';
      div.updates = 0;
      mClassList(div).add('  c1');
      expect(div.className).toBe('c1');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).add('  c2');
      expect(div.className).toBe('c1 c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).add('  c1');
      expect(div.className).toBe('c1 c2');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).add('  c1a', '  c2a');
      expect(div.className).toBe('c1 c2 c1a c2a');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).add('  c1a', '  c3a');
      expect(div.className).toBe('c1 c2 c1a c2a c3a');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).add('  ');
      expect(div.className).toBe('c1 c2 c1a c2a c3a');
      expect(div.updates).toBe(0);

      done();
    });

    it('appends tokens if each one is not in the list (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = '';
      rect.updates = 0;
      mClassList(rect).add('c1');
      expect(rect.className.baseVal).toBe('c1');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).add('c2');
      expect(rect.className.baseVal).toBe('c1 c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).add('c1');
      expect(rect.className.baseVal).toBe('c1 c2');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).add('c1a', 'c2a');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).add('c1a', 'c3a');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a c3a');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).add('');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a c3a');
      expect(rect.updates).toBe(0);

      rect.className.baseVal = '';
      rect.updates = 0;
      mClassList(rect).add('  c1');
      expect(rect.className.baseVal).toBe('c1');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).add('  c2');
      expect(rect.className.baseVal).toBe('c1 c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).add('  c1');
      expect(rect.className.baseVal).toBe('c1 c2');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).add('  c1a', '  c2a');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).add('  c1a', '  c3a');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a c3a');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).add('  ');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a c3a');
      expect(rect.updates).toBe(0);

      done();
    });

  });

  describe('.remove', function() {

    it('removes tokens if each one is in the list (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = 'c1 c2';
      div.updates = 0;
      mClassList(div).remove('c1');
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).remove('c2');
      expect(div.className).toBe('');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).remove('c1');
      expect(div.className).toBe('');
      expect(div.updates).toBe(0);
      div.className = 'c1 c2 c4 c5';
      div.updates = 0;
      mClassList(div).remove('c4', 'c5');
      expect(div.className).toBe('c1 c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).remove('c1', 'c3');
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).remove('c1a', 'c3a');
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).remove('');
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(0);

      div.className = 'c1 c2';
      div.updates = 0;
      mClassList(div).remove('  c1');
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).remove('  c2');
      expect(div.className).toBe('');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).remove('  c1');
      expect(div.className).toBe('');
      expect(div.updates).toBe(0);
      div.className = 'c1 c2 c4 c5';
      div.updates = 0;
      mClassList(div).remove('  c4', '  c5');
      expect(div.className).toBe('c1 c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).remove('  c1', '  c3');
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).remove('  c1a', '  c3a');
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).remove('  ');
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(0);

      done();
    });

    it('removes tokens if each one is in the list (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = 'c1 c2';
      rect.updates = 0;
      mClassList(rect).remove('c1');
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).remove('c2');
      expect(rect.className.baseVal).toBe('');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).remove('c1');
      expect(rect.className.baseVal).toBe('');
      expect(rect.updates).toBe(0);
      rect.className.baseVal = 'c1 c2 c4 c5';
      rect.updates = 0;
      mClassList(rect).remove('c4', 'c5');
      expect(rect.className.baseVal).toBe('c1 c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).remove('c1', 'c3');
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).remove('c1a', 'c3a');
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).remove('');
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(0);

      rect.className.baseVal = 'c1 c2';
      rect.updates = 0;
      mClassList(rect).remove('  c1');
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).remove('  c2');
      expect(rect.className.baseVal).toBe('');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).remove('  c1');
      expect(rect.className.baseVal).toBe('');
      expect(rect.updates).toBe(0);
      rect.className.baseVal = 'c1 c2 c4 c5';
      rect.updates = 0;
      mClassList(rect).remove('  c4', '  c5');
      expect(rect.className.baseVal).toBe('c1 c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).remove('  c1', '  c3');
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).remove('  c1a', '  c3a');
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).remove('  ');
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(0);

      done();
    });

  });

  describe('.toggle', function() {

    it('adds or removes token (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = 'c1 c2';
      div.updates = 0;
      expect(mClassList(div).toggle('c1')).toBe(false);
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      expect(mClassList(div).toggle('c2', true)).toBe(true);
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(0);
      div.updates = 0;
      expect(mClassList(div).toggle('c1', false)).toBe(false);
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(0);
      div.updates = 0;
      expect(mClassList(div).toggle('c1')).toBe(true);
      expect(div.className).toBe('c2 c1');
      expect(div.updates).toBe(1);

      div.className = 'c1 c2';
      div.updates = 0;
      expect(mClassList(div).toggle('  c1')).toBe(false);
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(1);
      div.updates = 0;
      expect(mClassList(div).toggle('  c2', true)).toBe(true);
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(0);
      div.updates = 0;
      expect(mClassList(div).toggle('  c1', false)).toBe(false);
      expect(div.className).toBe('c2');
      expect(div.updates).toBe(0);
      div.updates = 0;
      expect(mClassList(div).toggle('  c1')).toBe(true);
      expect(div.className).toBe('c2 c1');
      expect(div.updates).toBe(1);

      done();
    });

    it('adds or removes token (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = 'c1 c2';
      rect.updates = 0;
      expect(mClassList(rect).toggle('c1')).toBe(false);
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      expect(mClassList(rect).toggle('c2', true)).toBe(true);
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      expect(mClassList(rect).toggle('c1', false)).toBe(false);
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      expect(mClassList(rect).toggle('c1')).toBe(true);
      expect(rect.className.baseVal).toBe('c2 c1');
      expect(rect.updates).toBe(1);

      rect.className.baseVal = 'c1 c2';
      rect.updates = 0;
      expect(mClassList(rect).toggle('  c1')).toBe(false);
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      expect(mClassList(rect).toggle('  c2', true)).toBe(true);
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      expect(mClassList(rect).toggle('  c1', false)).toBe(false);
      expect(rect.className.baseVal).toBe('c2');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      expect(mClassList(rect).toggle('  c1')).toBe(true);
      expect(rect.className.baseVal).toBe('c2 c1');
      expect(rect.updates).toBe(1);

      done();
    });

  });

  describe('.replace', function() {

    it('replaces token with new token (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = 'c1 c2';
      div.updates = 0;
      mClassList(div).replace('c1', 'c1a');
      expect(div.className).toBe('c2 c1a');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).replace('c1', 'c1a');
      expect(div.className).toBe('c2 c1a');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).replace('c2', 'c1a');
      expect(div.className).toBe('c1a');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).replace('', 'c1b');
      expect(div.className).toBe('c1a');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).replace('c1a', '');
      expect(div.className).toBe('c1a');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).replace('c1a', 'c1a');
      expect(div.className).toBe('c1a');
      expect(div.updates).toBe(0);

      div.className = 'c1 c2';
      div.updates = 0;
      mClassList(div).replace('  c1', '  c1a');
      expect(div.className).toBe('c2 c1a');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).replace('  c1', '  c1a');
      expect(div.className).toBe('c2 c1a');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).replace('  c2', '  c1a');
      expect(div.className).toBe('c1a');
      expect(div.updates).toBe(1);
      div.updates = 0;
      mClassList(div).replace('  ', '  c1b');
      expect(div.className).toBe('c1a');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).replace('  c1a', '  ');
      expect(div.className).toBe('c1a');
      expect(div.updates).toBe(0);
      div.updates = 0;
      mClassList(div).replace('  c1a', '  c1a');
      expect(div.className).toBe('c1a');
      expect(div.updates).toBe(0);

      done();
    });

    it('replaces token with new token (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = 'c1 c2';
      rect.updates = 0;
      mClassList(rect).replace('c1', 'c1a');
      expect(rect.className.baseVal).toBe('c2 c1a');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).replace('c1', 'c1a');
      expect(rect.className.baseVal).toBe('c2 c1a');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).replace('c2', 'c1a');
      expect(rect.className.baseVal).toBe('c1a');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).replace('', 'c1b');
      expect(rect.className.baseVal).toBe('c1a');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).replace('c1a', '');
      expect(rect.className.baseVal).toBe('c1a');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).replace('c1a', 'c1a');
      expect(rect.className.baseVal).toBe('c1a');
      expect(rect.updates).toBe(0);

      rect.className.baseVal = 'c1 c2';
      rect.updates = 0;
      mClassList(rect).replace('  c1', '  c1a');
      expect(rect.className.baseVal).toBe('c2 c1a');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).replace('  c1', '  c1a');
      expect(rect.className.baseVal).toBe('c2 c1a');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).replace('  c2', '  c1a');
      expect(rect.className.baseVal).toBe('c1a');
      expect(rect.updates).toBe(1);
      rect.updates = 0;
      mClassList(rect).replace('  ', '  c1b');
      expect(rect.className.baseVal).toBe('c1a');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).replace('  c1a', '  ');
      expect(rect.className.baseVal).toBe('c1a');
      expect(rect.updates).toBe(0);
      rect.updates = 0;
      mClassList(rect).replace('  c1a', '  c1a');
      expect(rect.className.baseVal).toBe('c1a');
      expect(rect.updates).toBe(0);

      done();
    });

  });

  describe('.methodChain', function() {

    it('should be true by default', function(done) {
      expect(mClassList.methodChain).toBe(true);
      done();
    });

    it('.add', function(done) {
      mClassList.ignoreNative = true;
      mClassList.methodChain = true;
      expect(mClassList.methodChain).toBe(true);

      div.className = 'xxx';
      var ins = mClassList(div),
        returnValue = ins.add('c1');
      expect(div.className).toBe('xxx c1');
      expect(returnValue).toBe(ins);

      mClassList.methodChain = false;
      expect(mClassList.methodChain).toBe(false);
      returnValue = ins.add('c2');
      expect(div.className).toBe('xxx c1 c2');
      expect(returnValue).toBeUndefined();

      done();
    });

    it('.remove', function(done) {
      mClassList.ignoreNative = true;
      mClassList.methodChain = true;
      expect(mClassList.methodChain).toBe(true);

      div.className = 'xxx c1 c2';
      var ins = mClassList(div),
        returnValue = ins.remove('c1');
      expect(div.className).toBe('xxx c2');
      expect(returnValue).toBe(ins);

      mClassList.methodChain = false;
      expect(mClassList.methodChain).toBe(false);
      returnValue = ins.remove('c2');
      expect(div.className).toBe('xxx');
      expect(returnValue).toBeUndefined();

      done();
    });

    it('.replace', function(done) {
      mClassList.ignoreNative = true;
      mClassList.methodChain = true;
      expect(mClassList.methodChain).toBe(true);

      div.className = 'xxx c1 c2';
      var ins = mClassList(div),
        returnValue = ins.replace('c1', 'c1x');
      expect(div.className).toBe('xxx c2 c1x');
      expect(returnValue).toBe(ins);

      mClassList.methodChain = false;
      expect(mClassList.methodChain).toBe(false);
      returnValue = ins.replace('c2', 'c2x');
      expect(div.className).toBe('xxx c1x c2x');
      expect(returnValue).toBeUndefined();

      done();
    });

  });

  describe('hookApply', function() {
    var callList, callElement;

    it('is called when class property is changed', function(done) {
      mClassList.ignoreNative = true;

      mClassList.hookApply(function(list, element) {
        callList = list;
        callElement = element;
      });

      div.className = '';

      callList = callElement = null;
      mClassList(div).add('c1');
      expect(callList).toEqual(['c1']);
      expect(callElement).toBe(div);

      callList = callElement = null;
      mClassList(div).add('c2');
      expect(callList).toEqual(['c1', 'c2']);
      expect(callElement).toBe(div);

      callList = callElement = null;
      mClassList(div).add('c2');
      expect(callList == null).toBe(true);
      expect(callElement == null).toBe(true);

      callList = callElement = null;
      mClassList(div2).add('c2');
      expect(callList).toEqual(['c2']);
      expect(callElement).toBe(div2);

      callList = callElement = null;
      mClassList(div2).remove('c2');
      expect(callList).toEqual([]);
      expect(callElement).toBe(div2);

      done();
    });

    it('can be removed', function(done) {
      mClassList.ignoreNative = true;

      mClassList.hookApply();

      div.className = '';

      callList = callElement = null;
      mClassList(div).add('c1');
      expect(callList == null).toBe(true);
      expect(callElement == null).toBe(true);

      callList = callElement = null;
      mClassList(div2).add('c2');
      expect(callList == null).toBe(true);
      expect(callElement == null).toBe(true);

      done();
    });

  });

});
