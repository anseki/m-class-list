
describe('mClassList', function() {
  'use strict';

  var div, rect;

  beforeAll(function(done) {
    div = document.body.appendChild(document.createElement('div'));
    var SVG_NS = 'http://www.w3.org/2000/svg';
    rect = document.body.appendChild(document.createElementNS(SVG_NS, 'svg'))
      .appendChild(document.createElementNS(SVG_NS, 'rect'));
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
      mClassList(div).add('c1');
      expect(div.className).toBe('c1');
      mClassList(div).add('c2');
      expect(div.className).toBe('c1 c2');
      mClassList(div).add('c1');
      expect(div.className).toBe('c1 c2');
      mClassList(div).add('c1a', 'c2a');
      expect(div.className).toBe('c1 c2 c1a c2a');
      mClassList(div).add('c1a', 'c3a');
      expect(div.className).toBe('c1 c2 c1a c2a c3a');
      mClassList(div).add('');
      expect(div.className).toBe('c1 c2 c1a c2a c3a');

      div.className = '';
      mClassList(div).add('  c1');
      expect(div.className).toBe('c1');
      mClassList(div).add('  c2');
      expect(div.className).toBe('c1 c2');
      mClassList(div).add('  c1');
      expect(div.className).toBe('c1 c2');
      mClassList(div).add('  c1a', '  c2a');
      expect(div.className).toBe('c1 c2 c1a c2a');
      mClassList(div).add('  c1a', '  c3a');
      expect(div.className).toBe('c1 c2 c1a c2a c3a');
      mClassList(div).add('  ');
      expect(div.className).toBe('c1 c2 c1a c2a c3a');

      done();
    });

    it('appends tokens if each one is not in the list (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = '';
      mClassList(rect).add('c1');
      expect(rect.className.baseVal).toBe('c1');
      mClassList(rect).add('c2');
      expect(rect.className.baseVal).toBe('c1 c2');
      mClassList(rect).add('c1');
      expect(rect.className.baseVal).toBe('c1 c2');
      mClassList(rect).add('c1a', 'c2a');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a');
      mClassList(rect).add('c1a', 'c3a');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a c3a');
      mClassList(rect).add('');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a c3a');

      rect.className.baseVal = '';
      mClassList(rect).add('  c1');
      expect(rect.className.baseVal).toBe('c1');
      mClassList(rect).add('  c2');
      expect(rect.className.baseVal).toBe('c1 c2');
      mClassList(rect).add('  c1');
      expect(rect.className.baseVal).toBe('c1 c2');
      mClassList(rect).add('  c1a', '  c2a');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a');
      mClassList(rect).add('  c1a', '  c3a');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a c3a');
      mClassList(rect).add('  ');
      expect(rect.className.baseVal).toBe('c1 c2 c1a c2a c3a');

      done();
    });

  });

  describe('.remove', function() {

    it('removes tokens if each one is in the list (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = 'c1 c2';
      mClassList(div).remove('c1');
      expect(div.className).toBe('c2');
      mClassList(div).remove('c2');
      expect(div.className).toBe('');
      mClassList(div).remove('c1');
      expect(div.className).toBe('');
      div.className = 'c1 c2 c4 c5';
      mClassList(div).remove('c4', 'c5');
      expect(div.className).toBe('c1 c2');
      mClassList(div).remove('c1', 'c3');
      expect(div.className).toBe('c2');
      mClassList(div).remove('c1a', 'c3a');
      expect(div.className).toBe('c2');
      mClassList(div).remove('');
      expect(div.className).toBe('c2');

      div.className = 'c1 c2';
      mClassList(div).remove('  c1');
      expect(div.className).toBe('c2');
      mClassList(div).remove('  c2');
      expect(div.className).toBe('');
      mClassList(div).remove('  c1');
      expect(div.className).toBe('');
      div.className = 'c1 c2 c4 c5';
      mClassList(div).remove('  c4', '  c5');
      expect(div.className).toBe('c1 c2');
      mClassList(div).remove('  c1', '  c3');
      expect(div.className).toBe('c2');
      mClassList(div).remove('  c1a', '  c3a');
      expect(div.className).toBe('c2');
      mClassList(div).remove('  ');
      expect(div.className).toBe('c2');

      done();
    });

    it('removes tokens if each one is in the list (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = 'c1 c2';
      mClassList(rect).remove('c1');
      expect(rect.className.baseVal).toBe('c2');
      mClassList(rect).remove('c2');
      expect(rect.className.baseVal).toBe('');
      mClassList(rect).remove('c1');
      expect(rect.className.baseVal).toBe('');
      rect.className.baseVal = 'c1 c2 c4 c5';
      mClassList(rect).remove('c4', 'c5');
      expect(rect.className.baseVal).toBe('c1 c2');
      mClassList(rect).remove('c1', 'c3');
      expect(rect.className.baseVal).toBe('c2');
      mClassList(rect).remove('c1a', 'c3a');
      expect(rect.className.baseVal).toBe('c2');
      mClassList(rect).remove('');
      expect(rect.className.baseVal).toBe('c2');

      rect.className.baseVal = 'c1 c2';
      mClassList(rect).remove('  c1');
      expect(rect.className.baseVal).toBe('c2');
      mClassList(rect).remove('  c2');
      expect(rect.className.baseVal).toBe('');
      mClassList(rect).remove('  c1');
      expect(rect.className.baseVal).toBe('');
      rect.className.baseVal = 'c1 c2 c4 c5';
      mClassList(rect).remove('  c4', '  c5');
      expect(rect.className.baseVal).toBe('c1 c2');
      mClassList(rect).remove('  c1', '  c3');
      expect(rect.className.baseVal).toBe('c2');
      mClassList(rect).remove('  c1a', '  c3a');
      expect(rect.className.baseVal).toBe('c2');
      mClassList(rect).remove('  ');
      expect(rect.className.baseVal).toBe('c2');

      done();
    });

  });

  describe('.toggle', function() {

    it('adds or removes token (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = 'c1 c2';
      expect(mClassList(div).toggle('c1')).toBe(false);
      expect(div.className).toBe('c2');
      expect(mClassList(div).toggle('c2', true)).toBe(true);
      expect(div.className).toBe('c2');
      expect(mClassList(div).toggle('c1', false)).toBe(false);
      expect(div.className).toBe('c2');
      expect(mClassList(div).toggle('c1')).toBe(true);
      expect(div.className).toBe('c2 c1');

      div.className = 'c1 c2';
      expect(mClassList(div).toggle('  c1')).toBe(false);
      expect(div.className).toBe('c2');
      expect(mClassList(div).toggle('  c2', true)).toBe(true);
      expect(div.className).toBe('c2');
      expect(mClassList(div).toggle('  c1', false)).toBe(false);
      expect(div.className).toBe('c2');
      expect(mClassList(div).toggle('  c1')).toBe(true);
      expect(div.className).toBe('c2 c1');

      done();
    });

    it('adds or removes token (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = 'c1 c2';
      expect(mClassList(rect).toggle('c1')).toBe(false);
      expect(rect.className.baseVal).toBe('c2');
      expect(mClassList(rect).toggle('c2', true)).toBe(true);
      expect(rect.className.baseVal).toBe('c2');
      expect(mClassList(rect).toggle('c1', false)).toBe(false);
      expect(rect.className.baseVal).toBe('c2');
      expect(mClassList(rect).toggle('c1')).toBe(true);
      expect(rect.className.baseVal).toBe('c2 c1');

      rect.className.baseVal = 'c1 c2';
      expect(mClassList(rect).toggle('  c1')).toBe(false);
      expect(rect.className.baseVal).toBe('c2');
      expect(mClassList(rect).toggle('  c2', true)).toBe(true);
      expect(rect.className.baseVal).toBe('c2');
      expect(mClassList(rect).toggle('  c1', false)).toBe(false);
      expect(rect.className.baseVal).toBe('c2');
      expect(mClassList(rect).toggle('  c1')).toBe(true);
      expect(rect.className.baseVal).toBe('c2 c1');

      done();
    });

  });

  describe('.replace', function() {

    it('replaces token with new token (HTML)', function(done) {
      mClassList.ignoreNative = true;

      div.className = 'c1 c2';
      mClassList(div).replace('c1', 'c1a');
      expect(div.className).toBe('c2 c1a');
      mClassList(div).replace('c1', 'c1a');
      expect(div.className).toBe('c2 c1a');
      mClassList(div).replace('c2', 'c1a');
      expect(div.className).toBe('c1a');
      mClassList(div).replace('', 'c1b');
      expect(div.className).toBe('c1a');
      mClassList(div).replace('c1a', '');
      expect(div.className).toBe('c1a');
      mClassList(div).replace('c1a', 'c1a');
      expect(div.className).toBe('c1a');

      div.className = 'c1 c2';
      mClassList(div).replace('  c1', '  c1a');
      expect(div.className).toBe('c2 c1a');
      mClassList(div).replace('  c1', '  c1a');
      expect(div.className).toBe('c2 c1a');
      mClassList(div).replace('  c2', '  c1a');
      expect(div.className).toBe('c1a');
      mClassList(div).replace('  ', '  c1b');
      expect(div.className).toBe('c1a');
      mClassList(div).replace('  c1a', '  ');
      expect(div.className).toBe('c1a');
      mClassList(div).replace('  c1a', '  c1a');
      expect(div.className).toBe('c1a');

      done();
    });

    it('replaces token with new token (SVG)', function(done) {
      mClassList.ignoreNative = true;

      rect.className.baseVal = 'c1 c2';
      mClassList(rect).replace('c1', 'c1a');
      expect(rect.className.baseVal).toBe('c2 c1a');
      mClassList(rect).replace('c1', 'c1a');
      expect(rect.className.baseVal).toBe('c2 c1a');
      mClassList(rect).replace('c2', 'c1a');
      expect(rect.className.baseVal).toBe('c1a');
      mClassList(rect).replace('', 'c1b');
      expect(rect.className.baseVal).toBe('c1a');
      mClassList(rect).replace('c1a', '');
      expect(rect.className.baseVal).toBe('c1a');
      mClassList(rect).replace('c1a', 'c1a');
      expect(rect.className.baseVal).toBe('c1a');

      rect.className.baseVal = 'c1 c2';
      mClassList(rect).replace('  c1', '  c1a');
      expect(rect.className.baseVal).toBe('c2 c1a');
      mClassList(rect).replace('  c1', '  c1a');
      expect(rect.className.baseVal).toBe('c2 c1a');
      mClassList(rect).replace('  c2', '  c1a');
      expect(rect.className.baseVal).toBe('c1a');
      mClassList(rect).replace('  ', '  c1b');
      expect(rect.className.baseVal).toBe('c1a');
      mClassList(rect).replace('  c1a', '  ');
      expect(rect.className.baseVal).toBe('c1a');
      mClassList(rect).replace('  c1a', '  c1a');
      expect(rect.className.baseVal).toBe('c1a');

      done();
    });

  });

});
