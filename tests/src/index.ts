import { App, Controller, ErrorHandle, Middleware, Router } from 'shise'

const controller = new Controller().use(
	new Middleware(async (ctx, next) => {
		const { apikey } = ctx.request.headers
		if (apikey) throw new ErrorHandle(401, 'API Key required.')
		next()
	})
)

const routes = new Router({
	ping: controller.get(ctx => {
		ctx.response.send('Pong!')
		ctx.response.end()
	}),
})

const app = new App(routes)
app.listen(3000, () => {
	console.log('Server lintening on port 3000')
})
