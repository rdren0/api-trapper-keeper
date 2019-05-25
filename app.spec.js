const request = require("supertest");
const app = require("./app");

describe("App", () => {
  let notes;
  beforeEach(() => {
    notes = [
      {
        id: 1,
        title: "TODO",
        tasks: [
          {
            id: 1,
            text: "testing"
          }
        ]
      },
      {
        id: 2,
        title: "MORE",
        tasks: [
          {
            id: 3,
            text: "testing also"
          },
          {
            id: 4,
            text: "testing also again"
          }
        ]
      }
    ];
    app.locals.notes = notes;
  });

  describe("GET /api/v1/notes", () => {
    it("should have a status of 200", async () => {
      const response = await request(app).get("/api/v1/notes");
      expect(response.statusCode).toEqual(200);
    });

    it("should return an array of notes", async () => {
      const response = await request(app).get("/api/v1/notes");
      expect(response.body).toEqual(notes);
    });
  });

  describe("GET /api/v1/notes/:id", () => {
    it("should return a status of 200", async () => {
      const response = await request(app).get("/api/v1/notes/2");
      const expected = 200;
      expect(response.statusCode).toEqual(expected);
    });
    it("should return the correct note with id", async () => {
      const response = await request(app).get("/api/v1/notes/2");
      const expected = app.locals.notes[1];
      expect(response.body).toEqual(expected);
    });
    it("should return an error message", async () => {
      const response = await request(app).get("/api/v1/notes/7");
      const expected = { Error: "No note found with 7" };
      expect(response.body).toEqual(expected);
    });
    it("should return a status of 404 when pet not found", async () => {
      const response = await request(app).get("/api/v1/notes/7");
      const expected = 404;
      expect(response.statusCode).toEqual(expected);
    });
  });

  describe("POST /api/v1/notes", () => {
    let newNote;
    let brokenNote;
    beforeEach(() => {
      newNote = {
        title: "Cleaning",
        list: [{ id: 1, text: "testing" }, { id: 3, text: "testing again" }]
      };
      brokenNote = { title: "broken" };
    });
    it("should return a status of 201 & newNote", async () => {
      expect(app.locals.notes.length).toBe(2);
      const response = await request(app)
        .post("/api/v1/notes")
        .send(newNote);
      expect(response.status).toBe(201);
      // expect(response.body).toEqual({ ...newNote})
      expect(app.locals.notes.length).toBe(3);
    });
    it("should return 422 and error message", async () => {
      const response = await request(app)
        .post("/api/v1/notes")
        .send(brokenNote);
      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        Error: "Must have a title and list items"
      });
      expect(app.locals.notes.length).toBe(2);
    });
  });
  describe("PUT /api/v1/notes", () => {
    let newNote;
    let incompleteNote;
    beforeEach(() => {
      newNote = {
        title: "Cleaning",
        list: [{ id: 1, text: "testing" }, { id: 3, text: "testing again" }]
      };
      incompleteNote = { title: "broken" };
    });

    it("should update an existing note", async () => {
      const response = await request(app)
        .put("/api/v1/2")
        .send(newNote);
    });

    it("should return a status 204 when successful", async () => {
      const response = await request(app)
        .put("/api/v1/notes/2")
        .send(newNote);
      expect(response.status).toBe(204);
    });

    it("should return a status 404 and an Error message if note does not exist", async () => {
      const response = await request(app)
        .put("/api/v1/notes/5")
        .send(newNote);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ Error: "No note found with 5 " });
    });

    it("should return a status 422 if the correct params are not sent", async () => {
      const response = await request(app)
        .put("/api/v1/notes/2")
        .send(incompleteNote);
      expect(response.status).toBe(422);
    });
  });

  describe("DELETE /api/v1/notes", () => {
    it("should delete the correct note", async () => {
      const response = await request(app).delete("/api/v1/notes/2");
      expect(notes.length).toBe(1);
    });
    it("return a status of 200 when complete", async () => {
      const response = await request(app).delete("/api/v1/notes/2");
      expect(response.status).toBe(200);
    });

    it("should return a status of 404 if note doesnt exist", async () => {
      const response = await request(app).delete("/api/v1/notes/99");
      expect(response.status).toBe(404);
    });
  });
});
