# get-files

Recursively get all the files in a directory.

```js
const getFiles = require('get-files');

(async function() {
	const files = await getFiles(`static`);
	// -> [ `global.css`, `fonts/font1.woff`, `images/background.png`, `images/web/small/loading.gif`]
})();
```

See [`test/index.js`](/test/index.js) for more information.

## API

### getFiles(directory?: string) => Promise<string[]>

The default directory is `process.cwd()`.

If the directory does not exist, an empty array is returned.

This package only returns the _files_ in a directory. Empty folders are ignored.

## License

[MIT](/LICENSE)
