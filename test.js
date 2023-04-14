import { getContacts } from "./controller/contactAdminController.js";
import sinon from "sinon";
import Contacts from "./models/Contacts.js";

describe("getContacts", () => {
  it("should return all contacts", async () => {
    const mockContacts = [
      { name: "John Doe", email: "johndoe@example.com" },
      { name: "Jane Doe", email: "janedoe@example.com" },
    ];

    // Mock the mongoose `find` method
    sinon.stub(Contacts, "find").resolves(mockContacts);

    // Create mock req and res objects
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    // Call the function and wait for it to complete
    await getContacts(req, res);

    // Assert that the correct status and response were sent
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, { success: true, data: mockContacts });

    // Restore the `find` method to its original implementation
    Contacts.find.restore();
  });

  it("should handle errors", async () => {
    // Mock the mongoose `find` method to throw an error
    sinon.stub(Contacts, "find").throws(new Error("Database error"));

    // Create mock req and res objects
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    // Call the function and wait for it to complete
    await getContacts(req, res);

    // Assert that the correct status and error message were sent
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.send, {
      success: false,
      error: "Database error",
    });

    // Restore the `find` method to its original implementation
    Contacts.find.restore();
  });
});
