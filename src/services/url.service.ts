import { PrismaClient } from '@prisma/client';
import logger from '../middleware/logger';

const prismaClient = new PrismaClient();
const urlClient = prismaClient.urls;

/**
 * This method will retrieve all available url records in the db
 * @returns Promise<any>
 */
async function getAllShortenedUrls(): Promise<any> {
  try {
    logger.info('starting data fetching  service>> getAllShortenedUrls');
    const urlData: any = await urlClient.findMany({
      select: {
        longUrl: true,
        shortenedUrl: true,
      },
    });
    logger.info(
      'starting data fetching  service>> getAllShortenedUrls > ',
      urlData
    );
    return urlData;
  } catch (error) {
    logger.error(
      'Error at data fetching  service>> getAllShortenedUrls > ',
      error.message
    );
    throw error.message;
  } finally {
    await prismaClient.$disconnect();
  }
}

/**
 * This method will fetch data by long actual url from the db
 * @param params
 * @returns Promise<any>
 */
const fetchDataByLongUrl = async (params: {
  [key: string]: any;
}): Promise<any> => {
  try {
    // const longUrlData = req.params["longUrl"]!;
    logger.info('service fetchLongUrlByShortenedUrl - params >>', params);
    const longUrlData: string = params.longUrlParam;
    logger.info(
      'service fetchLongUrlByShortenedUrl - longUrlData >>',
      longUrlData
    );

    const urlResult: any = !longUrlData
      ? {}
      : await urlClient.findRaw({
          filter: {
            longUrl: longUrlData,
          },
          // options: {
          //     projection: { _id: true }
          // },
        });
    logger.info('service fetchDataByLongUrl - urlResult >>', urlResult);
    return urlResult[0] || {};
  } catch (error) {
    logger.error(
      'Error at data fetching  service>> fetchDataByLongUrl > ',
      error.message
    );
    throw error.message;
  } finally {
    await prismaClient.$disconnect();
  }
};

/**
 * This method will fetch data by shortened url from the db
 * @param params
 * @returns Promise<any>
 */
const fetchDataByShortenedUrl = async (params: {
  [key: string]: any;
}): Promise<any> => {
  try {
    logger.info('service fetchLongUrlByShortenedUrl - params >>', params);
    const shortenedUrlData: string = params.shortenedUrlParam;
    logger.info(
      'service fetchLongUrlByShortenedUrl - shortenedUrlData >>',
      shortenedUrlData
    );
    const urlData: any = !shortenedUrlData
      ? {}
      : await urlClient.findRaw({
          filter: {
            shortenedUrl: shortenedUrlData,
          },
        });
    logger.info('service fetchLongUrlByShortenedUrl - urlData >>', urlData);
    return urlData[0] || {};
  } catch (error) {
    logger.error(
      'Error at data fetching  service>> fetchDataByShortenedUrl > ',
      error.message
    );
    throw error.message;
  } finally {
    await prismaClient.$disconnect();
  }
};

/**
 * This method will create shortened url record in the db
 * @param params
 * @returns Promise<any>
 */
const createShortenedUrl = async (params: {
  [key: string]: any;
}): Promise<any> => {
  try {
    logger.info('service createShortenedUrl - params >>', params);
    const longUrl: string = params.longUrl;
    const shortenedUrl: string = params.shortenedUrl;
    logger.info(
      'service createShortenedUrl - longUrl >',
      longUrl,
      'and shortenedUrl > ',
      shortenedUrl
    );
    const urlData =
      !longUrl || !shortenedUrl
        ? {}
        : await urlClient.create({
            data: {
              longUrl,
              shortenedUrl,
            },
          });
    logger.info('service createShortenedUrl - urlData >', urlData);
    return urlData;
  } catch (error) {
    logger.error(
      'Error at data fetching  service>> createShortenedUrl > ',
      error.message
    );
    throw error.message;
  }
};

export {
  getAllShortenedUrls,
  fetchDataByLongUrl,
  fetchDataByShortenedUrl,
  createShortenedUrl,
};
