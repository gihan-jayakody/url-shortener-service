import Joi from 'joi';

type UrlCreateType = {
  longUrl: string;
};

type UrlRetrieveType = {
  shortenedUrl: string;
};

const UrlCreateSchema = {
  body: Joi.object<UrlCreateType>().keys({
    longUrl: Joi.string().required(),
  }),
};

const UrlRetrieveSchema = {
  query: Joi.object<UrlRetrieveType>().keys({
    shortenedUrl: Joi.string().required(),
  }),
};

export { UrlCreateSchema, UrlRetrieveSchema };
