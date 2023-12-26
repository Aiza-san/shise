import { type ServerResponse, type IncomingMessage } from 'http'
import { Context } from '../context'
import { type Middleware } from '../middlewares'
import { handleControllerErrors } from '../errors'

export type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'OPTIONS'
export type ControllerFn = (ctx: Context) => Promise<void> | void

export class ControllerBase {
	private middlewares: Middleware[] = []
	private fn: ControllerFn
	readonly method: Method

	constructor(method: Method, fn: ControllerFn, middlewares?: Middleware[]) {
		this.middlewares = middlewares ?? []
		this.fn = fn
		this.method = method
	}

	async exec(
		request: IncomingMessage,
		response: ServerResponse,
		params: Record<string, string>,
		pathnames: string[]
	) {
		await new Promise(async (resolve, reject) => {
			const ctx = new Context(request, response)
			try {
				ctx.response.on('finish', () => {
					resolve(null)
				})
				ctx.request.params = params
				ctx.pathname = `/${pathnames.join('/')}`
				for (const middleware of this.middlewares) {
					await middleware.exec(ctx)
				}
				await this.fn(ctx)
			} catch (error) {
				handleControllerErrors(ctx, error)
			}
		})
	}
}

export class Controller {
	private middlewares: Middleware[] = []

	constructor(middlewares?: Middleware[]) {
		this.middlewares = middlewares ?? []
	}

	use(...middlewares: Middleware[]) {
		return new Controller(middlewares)
	}

	get(fn: ControllerFn) {
		return new ControllerBase('GET', fn, this.middlewares)
	}

	post(fn: ControllerFn) {
		return new ControllerBase('POST', fn, this.middlewares)
	}

	put(fn: ControllerFn) {
		return new ControllerBase('PUT', fn, this.middlewares)
	}

	patch(fn: ControllerFn) {
		return new ControllerBase('PATCH', fn, this.middlewares)
	}

	delete(fn: ControllerFn) {
		return new ControllerBase('DELETE', fn, this.middlewares)
	}
}
