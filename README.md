# gulp-rev-fakemanifest [![Build Status](https://travis-ci.org/aslafy-z/gulp-rev-fakemanifest.svg?branch=master)](https://travis-ci.org/aslafy-z/gulp-rev-fakemanifest) [![Coverage Status](https://coveralls.io/repos/aslafy-z/gulp-rev-fakemanifest/badge.svg?branch=master&service=github)](https://coveralls.io/github/aslafy-z/gulp-rev-fakemanifest?branch=master) [![Dependency Status](https://david-dm.org/aslafy-z/gulp-rev-fakemanifest.svg)](https://david-dm.org/aslafy-z/gulp-rev-fakemanifest)

Generate a fake manifest where v=k. Provide a workaround for https://github.com/sindresorhus/gulp-rev/issues/40


## Installation

```
npm install gulp-rev-fakemanifest --save
```


## Usage

```javascript
const revFakeManifest = require('gulp-rev-fakemanifest');

(...).pipe(revFakeManifest().pipe(...)
```

### Example

	
```javascript
return gulp.src('dist', { base: 'assets' })
  .pipe(isProd ? rev() : noop())
  .pipe(
    isProd
    ? rev.manifest()
    : revFakeManifest()
  )
  .pipe(gulp.dest('assets'));
```

### TODO

- [ ] More tests
