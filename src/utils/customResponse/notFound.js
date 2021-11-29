export class NotFound {
  constructor(res, message, result) {
    return res.status(200).json({
      statusCode: 404,
      message,
      result,
    });
  }
}
