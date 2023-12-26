import { type Context } from '../context'

export class ErrorHandle extends Error {
	code: number

	constructor(code: number, message: string) {
		super(message)
		this.code = code
	}
}

export function handleControllerErrors(ctx: Context, error: any) {
	if (error instanceof ErrorHandle) {
		ctx.response.status(error.code)
		ctx.response.json({
			message: error.message,
		})
	} else {
		ctx.response.status(500)
		ctx.response.json({
			message: 'Internal server error.',
		})
	}
	ctx.response.end()
}
