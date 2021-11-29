export class Unauthorized {
  constructor(res, message, result) {
    return res.status(200).json({
      statusCode: 401,
      message,
      result,
    });
  }
}
