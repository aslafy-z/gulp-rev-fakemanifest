const test = require('ava')
const revFakeManifest = require('./')
const through = require('through2')
const Vinyl = require('vinyl')
const stream = require('stream')
const path = require('path')

const mockSrcs = ['bla', 'blu', 'blo']
const mockSrcsStream = new stream.Readable({
  objectMode: true,
  read: function (n) {
    mockSrcs.forEach(path => this.push(new Vinyl({
      path
    })))
    this.push(null)
  }
})

const buildFakeRevObject = files =>
  files.reduce((acc, cur) => {
    acc[cur] = cur
    return acc
  }, {})

test('returns a stream', t => {
  const Stream = require('stream')
  t.true(revFakeManifest() instanceof Stream)
})

test.cb('stream does contains rev file', t => {
  t.plan(1)
  return mockSrcsStream
    .pipe(revFakeManifest())
    .pipe(through.obj(function (file, enc, cb) {
      t.is(path.parse(file.path).base, 'rev-manifest.json')
      t.end()
    }))
})

test.cb('rev file is valid', t => {
  t.plan(1)
  return mockSrcsStream
    .pipe(revFakeManifest())
    .pipe(through.obj(function (file, enc, cb) {
      t.deepEqual(JSON.parse(file.contents.toString()), buildFakeRevObject(mockSrcs))
      t.end()
    }))
})

// TODO: empty manifest does not create a file
