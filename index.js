const through = require('through2')
const Vinyl = require('vinyl')
const path = require('path')

function relPath (base, filePath) {
  if (filePath.indexOf(base) !== 0) {
    return filePath
  }
  const newPath = filePath.substr(base.length)
  if (newPath[0] === path.sep) {
    return newPath.substr(1)
  } else {
    return newPath
  }
}

module.exports = function (pth, opts) {
  if (typeof pth === 'string') {
    pth = {
      path: pth
    }
  }

  opts = Object.assign({
    path: 'rev-manifest.json',
    merge: false,
    transformer: JSON
  }, opts, pth)

  const manifest = {}

  return through.obj(function (file, enc, cb) {
    if (file.path) {
      const fname = relPath(file.base, file.path)
      manifest[fname] = fname
    }

    cb()
  }, function (cb) {
    // no need to write a manifest file if there's nothing to manifest
    if (Object.keys(manifest).length === 0) {
      cb()
      return
    }

    const revFile = new Vinyl(opts)
    revFile.contents = Buffer.from(opts.transformer.stringify(manifest, null, 2))
    this.push(revFile)
    this.end()

    cb()
  })
}
