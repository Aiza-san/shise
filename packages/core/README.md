<img src="https://raw.githubusercontent.com/aiza-san/shise/main/shise.webp" alt="Shise Logo" style="max-width:30em;width:100%;margin-bottom:1rem;" />

> Fast, efficient and minimalist web framework

Easily create server applications with low cost and excellent speed. With Shise you can create server applications with ease, as it is designed for those projects that do not require a super complex system and are only interested in meeting their requirements in a short time.

With Shise you can start a project in a short time and the best thing is that Shise will grow as the project requires it, this through different complements from Shise or from the community.

### Table of Contents

- [Quick start](#quick-start)
- [Documentation](#documentation)
- [Core features](#core-features)
- [License](#license)

### Quick start

Create a new folder for the project

```bash
mkdir project-name
cd project-name
```

Initialize a node project

```bash
npm init -y
```

Install Shise

```bash
npm install shise
```

In your index file create a basic server

```js
const { App, Controller, Router } = require('shise')

const controller = new Controller()

const router = new Router({
	ping: controller..get(ctx => {
		console.log(ctx.state.name)
		ctx.response.status(200).json({
			message: 'Pong!',
		})
		ctx.response.end()
	}),
})

const app = new App(router)

app.listen(3000, () => {
	console.log('Server listen on port 3000')
})
```

Run the server

```bash
node index.js
```

### Documentation

You can find all Shise documentation [here](https://shise-js.com/).

### Core Features

- **Friendly development**: Shise is designed to be as simple and pleasant for the developer to use as possible.
- **Small bundle size**: The size of the Shise package is designed to be as light as possible, as well as using the fewest external modules.
- **Extendable**: Shise is designed to be as minimalist as possible, however, that does not mean that its range of options cannot be expanded easily.

### License

Licensed under [MIT](https://github.com/aiza-san/shise/blob/main/LICENSE.md).
