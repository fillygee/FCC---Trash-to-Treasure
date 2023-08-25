const request = require("supertest");
const fs = require("fs");
const app = require("../app");

describe("/posts", () => {
  const data = {
    item_name: "Name",
    item_category: "Category",
    item_description: "Description",
    address: "Address",
    postcode: "Postcode",
  };

  let id;

  test("GET /posts returns 200", async () => {
    const response = await request(app).get("/posts").expect(200);
  });

  test("GET /posts returns an array", async () => {
    const response = await request(app).get("/posts");
    expect(typeof response._body).toEqual("object");
  });

  test("POST /posts returns 201", async () => {
    const response = await request(app)
      .post("/posts")
      .set({ Authorization: "token=test" })
      .send(data)
      .expect(201);
  });

  test("POST /posts returns post object", async () => {
    const response = await request(app)
      .post("/posts")
      .set({ Authorization: "token=test" })
      .send(data);

    id = response._body.post_id;
    expect(response._body.item_name).toEqual("Name");
  });

  test("GET /posts/:id returns 200", async () => {
    const response = await request(app).get(`/posts/${id}`).expect(200);
  });

  test("GET /posts/:id returns an post", async () => {
    const response = await request(app).get(`/posts/${id}`);

    expect(response._body.item_name).toEqual("Name");
  });

  test("PUT /posts/:id returns updated name", async () => {
    data.item_name = "Name2";
    const response = await request(app)
      .put(`/posts/${id}`)
      .set({ Authorization: "token=test" })
      .send(data);

    expect(response._body.item_name).toEqual("Name2");
  });

  test("DELETE /posts/:id returns 204", async () => {
    const response = await request(app).delete(`/posts/${id}`).expect(204);
  });
});

describe("/users", () => {
  const data = {
    username: "Name123",
    password: "password123",
  };

  let id;

  test("GET /users returns 200", async () => {
    const response = await request(app).get("/users").expect(200);
  });

  test("GET /users returns an array", async () => {
    const response = await request(app).get("/users");

    expect(typeof response._body).toEqual("object");
  });

  test("POST /users/add returns", async () => {
    const response = await request(app)
      .post("/users/add")
      .send(data)
      .expect(201);

    id = response._body.user_id;
  });

  test("GET /users/id returns", async () => {
    const response = await request(app).get(`/users/${id}`);
  });

  test("DELETE /users/:id returns 204", async () => {
    const response = await request(app)
      .delete(`/users/delete/${id}`)
      .expect(204);
  });
});
