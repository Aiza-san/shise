import { type Context } from '../context'

export class Middleware {
	private fn: (ctx: Context, next: () => void) => Promise<void> | void

	constructor(fn: (ctx: Context, next: () => void) => Promise<void> | void) {
		this.fn = fn
	}

	async exec(ctx: Context) {
		return await new Promise(async (resolve, reject) => {
			try {
				await this.fn(ctx, resolve as () => void)
			} catch (error) {
				reject(error)
			}
		})
	}
}
