export class Response {
	constructor(res, message, result) {
		return res.status(200).json({
			statusCode: 200,
			message,
			result,
		});
	}
}
