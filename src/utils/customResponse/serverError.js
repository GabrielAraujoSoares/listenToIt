export class ServerError {
  constructor(res, message, result) {
    return res.status(200).json({
      statusCode: 500,
      message,
      result,
    });
  }
}
