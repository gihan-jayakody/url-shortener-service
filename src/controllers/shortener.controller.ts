import { Request, Response, NextFunction } from 'express';
import shortid from 'shortid';
import {
  fetchDataByLongUrl,
  fetchDataByShortenedUrl,
  createShortenedUrl,
  getAllShortenedUrls,
} from '../services/url.service';
import logger from '../middleware/logger';

/**
 * This controller method will create url data in the db based on the given url data
 * @param req
 * @param res
 * @param _next
 */
const createShortenerUrl = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    logger.info('controller createShortenerUrl - req.body >>', req.body);
    const longUrlParam = req.body.longUrl;
    logger.info(
      'controller createShortenerUrl - longUrlParam >>',
      longUrlParam
    );
    let urlDetails: any = await fetchDataByLongUrl({ longUrlParam });

    type UrlData = {
      longUrl: string;
      shortenedUrl: string;
    };

    if (Object.keys(urlDetails).length === 0) {
      const params: UrlData = {
        longUrl: longUrlParam,
        shortenedUrl: shortid.generate(),
      };
      logger.info('controller createShortenerUrl - params >>', params);
      urlDetails = await createShortenedUrl(params);
      logger.info('controller createShortenerUrl - urlDetails >>', urlDetails);
    }

    const result = {
      longUrl: urlDetails.longUrl,
      shortenedUrl: urlDetails.shortenedUrl,
    };
    logger.info('controller createShortenerUrl - result >>', result);
    logger.info('info', `Successfully completed createShortenerUrl: ${result}`);
    res.status(200).json(result || {});
  } catch (error) {
    logger.error(
      'error',
      `Error ocurred at createShortenerUrl: ${error.message}`
    );
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

/**
 * This controller method will retrieve data by given parameters from the db
 * @param req
 * @param res
 * @param _next
 */
const retrieveUrlDetails = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const shortenedUrlParam = req.query['shortenedUrl']!;
    const urlDetails: any = await fetchDataByShortenedUrl({
      shortenedUrlParam,
    });
    logger.info('controller retrieveUrlDetails - urlDetails >>', urlDetails);

    const result =
      Object.keys(urlDetails).length > 0
        ? {
            longUrl: urlDetails.longUrl,
            shortenedUrl: urlDetails.shortenedUrl,
            // combinedUrl: `${process.env['HOST']}/${urlDetails!.longUrl}`,
          }
        : {};

    logger.info('controller retrieveUrlDetails - result >>', result);

    res.status(200).json(result || {});
  } catch (error) {
    logger.error(
      'error',
      `Error ocurred at retrieveUrlDetails: ${error.message}`
    );
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

/**
 * This GET method will redirect the request to the actual url
 * based on given shortened url data
 * @param req
 * @param res
 * @param _next
 */
const redirectToOriginalUrl = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const shortenedUrlParam = req.query['shortenedUrl']!;
    logger.info(
      'controller redirectToOriginalUrl - shortenedUrlParam >>',
      shortenedUrlParam
    );
    const urlData: any = await fetchDataByShortenedUrl({ shortenedUrlParam });
    logger.info('controller redirectToOriginalUrl - urlData >>', urlData);
    res.redirect(301, urlData.longUrl);
    // res.status(200).json(urlData || {});
  } catch (error) {
    logger.log(
      'error',
      `Error ocurred at redirectToOriginalUrl: ${error.message}`
    );
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

/**
 * This method will provide list of available records in the db
 * @param _req
 * @param res
 * @param _next
 */
const getAllShortenedUrlRecords = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    logger.info('starting data fetching >> controller');
    const urlDetails: any = await getAllShortenedUrls();
    logger.info('starting data fetching >> controller urlDetails', urlDetails);
    res.status(200).json(urlDetails || {});
  } catch (error) {
    logger.log(
      'error',
      `Error ocurred at getAllShortenedUrlRecords: ${error.message}`
    );
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export {
  createShortenerUrl,
  retrieveUrlDetails,
  redirectToOriginalUrl,
  getAllShortenedUrlRecords,
};
