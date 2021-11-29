export class Forbidden {
  constructor(res, message, result) {
    return res.status(200).json({
      statusCode: 403,
      message,
      result,
    });
  }
}
