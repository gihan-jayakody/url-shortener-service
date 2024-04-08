import request from "supertest";
import app from "../src/app";

let shortenedUrlCreated: string;

describe("#1 Expect data when url contents are available", () => {

  test("it Should return an empty object for not exist record retrieval", async () => {
    const res = await request(app).get("/retrieve/?shortenedUrl=unknown").expect('Content-Type', /json/);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({});
    expect(res.body.shortenedUrl).toBe(undefined);
  });


  test("it Should return an empty object for invalid url parameters", async () => {
    const res = await request(app).get("/retrieve/?short=cfgN7hFHM").expect('Content-Type', /json/);
    expect(res.status).toBe(400);
  });


  test("Should return success for creating a new url request with actual parameters", async () => {
    const res = await request(app)
      .post("/create")
      .send({ "longUrl": "https://www.digitalocean.com/data" })
      .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({});
    expect(res.body.longUrl).toBe('https://www.digitalocean.com/data');
    shortenedUrlCreated = res.body.shortenedUrl;
  });


  test("Should return an array of one object for specific url request", async () => {
    const res = await request(app).get(`/retrieve/?shortenedUrl=${shortenedUrlCreated}`).expect('Content-Type', /json/);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({});
    expect(res.body.shortenedUrl).toBe(shortenedUrlCreated);
    expect(res.body.longUrl).toBe('https://www.digitalocean.com/data');
  });


  test("Should return an array of objects for all urls request", async () => {
    const res = await request(app).get("/urls").expect('Content-Type', /json/);
    expect(res.status).toBe(200);
    expect(res.body[0]).toMatchObject({});
  });


  test("Should return an error for creating a new url request with invalid body parameters", async () => {
    const res = await request(app)
      .post("/create")
      .send({ "loongUrl": "https://www.digitalocean.com/data" })
      .set('Accept', 'application/json');
    expect(res.status).toBe(400);
  });

});
