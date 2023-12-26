# @shise/assets

> Serve static files with Shise

### Installation

```bash
npm i @shise/assets
```

### Quick start

Install dependencies

```bash
npm install shise @shise/assets
```

Create a Shise application

```js
const { Controller, Router, App } = require('shise')

const controller = new Controller()

const app = new App(new Router({}))
app.listen(3000)
```

Use assets controller

```js
const assets = require('@shise/assets')
const path = require('path')

const app = new App(
	new Router({
		assets: assets({ dir: path.join(__dirname, '../public'), replace: 'assets' }),
	})
)
```

### Assets Options

```js
/**
 * assets(options, controller)
 *
 * @param {Object} [options]
 *  - {String} dir `Absolute location of file directory`
 *  - {String} raplace `Patname of the path where the files controller is located`
 * @return {Function} assets controller
 *
 */
```

### License

[MIT](https://github.com/aiza-san/shise/blob/main/LICENSE.md)
