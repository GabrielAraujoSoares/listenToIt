export class BadRequest {
  constructor(res, message, result) {
    return res.status(200).json({
      statusCode: 400,
      message,
      result,
    });
  }
}
