import {
  fetchDataByLongUrl,
  fetchDataByShortenedUrl,
  createShortenedUrl,
  getAllShortenedUrls,
} from '../src/services/url.service';


describe('#2 Service requst test scenarios', () => {

  test('Get data by longUrl should return empty object if data unavailable', async () => {
    const params = { longUrlParam: 'https://www.aaa.com/bbb' };
    const result: any = await fetchDataByLongUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toEqual(0);
  });


  test('Get data by shortenedUrl should return empty object if data unavailable', async () => {
    const params = { shortenedUrlParam: '11112222333' };
    const result = await fetchDataByShortenedUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toEqual(0);
  });


  test('Create record by actual Url data should return success ', async () => {
    const params = { longUrl: 'https://www.digitalocean.com/working-link', shortenedUrl: 'dRsaEEfsd' };
    const result = await createShortenedUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });


  test('Create record by invalid Url data parameter {loongUrl} should return success ', async () => {
    const params = { looongUrl: 'https://www.digitalocean.com/working-link', shortenedUrl: 'dRsaEEfsd' };
    const result = await createShortenedUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toEqual(0);
  });


  test('Create record by invalid Url data parameter {shooortenedUrl} should return success ', async () => {
    const params = { longUrl: 'https://www.digitalocean.com/working-link', shooortenedUrl: 'dRsaEEfsd' };
    const result = await createShortenedUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toEqual(0);
  });


  test('Create record by invalid Url data parameters both {looongUrl, shooortenedUrl} should return success ', async () => {
    const params = { looongUrl: 'https://www.digitalocean.com/working-link', shooortenedUrl: 'dRsaEEfsd' };
    const result = await createShortenedUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toEqual(0);
  });


  test('Get all data list should return array of url objects', async () => {
    const result = await getAllShortenedUrls();
    expect(result[0]).toMatchObject({});
    expect(Object.keys(result[0]).length).toBeGreaterThan(0);
  });


  test('Get data by longUrl should return url object when data available', async () => {
    const params = { longUrlParam: 'https://www.digitalocean.com/working-link' };
    const result = await fetchDataByLongUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toBeGreaterThan(0);
    expect(result.longUrl).toEqual('https://www.digitalocean.com/working-link');
    expect(result.shortenedUrl).toEqual('dRsaEEfsd');
  });


  test('Get data by shortenedUrl should return url object when data available', async () => {
    const params = { shortenedUrlParam: 'dRsaEEfsd' };
    const result = await fetchDataByShortenedUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toBeGreaterThan(0);
    expect(result.longUrl).toEqual('https://www.digitalocean.com/working-link');
    expect(result.shortenedUrl).toEqual('dRsaEEfsd');
  });


  test('Get data by longUrl with invalid parameters should return empty data', async () => {
    const params = { loongUrlParam: 'https://www.digitalocean.com/working-link' };
    const result = await fetchDataByLongUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toEqual(0);
  });


  test('Fetch data by shortenedUrl with invalid parameters should return empty data', async () => {
    const params = { shooortenedUrlParam: 'dRsaEEfsd' };
    const result = await fetchDataByShortenedUrl(params);
    expect(result).toMatchObject({});
    expect(Object.keys(result).length).toEqual(0);
  });


});