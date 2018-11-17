const through = require('through2')
const Vinyl = require('vinyl')
const path = require('path')

module.exports = function () {
  const manifest = {}
  let firstFile = null
  let basePath = null

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

  return through.obj(function (file, enc, cb) {
    if (file.path) {
      if (!firstFile) {
        firstFile = file
        basePath = firstFile.revOrigBase || firstFile.base
      }

      const fname = relPath(basePath, file.path)
      if (file.revOrigPath) {
        manifest[relPath(basePath, file.revOrigPath)] = fname
      } else {
        manifest[fname] = fname
      }
    }

    cb()
  }, function (cb) {
    if (firstFile) {
      this.push(new Vinyl({
        cwd: firstFile.cwd,
        base: firstFile.base,
        path: path.join(firstFile.base, 'rev-manifest.json'),
        contents: Buffer.from(JSON.stringify(manifest, null, 2))
      }))

      this.end()
    }

    cb()
  })
}
