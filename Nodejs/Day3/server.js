const express = require("express"),
    app = express(),
    port = 8888,
    mongodb = require("mongodb"),
    bodyParser = require("body-parser");

let contactsCollection;
// Body Parser
app.use(bodyParser.json());

// MongoDB
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    // if error, print it
    if (err) return console.log(err);

    // if no error, set database
    db = client.db("phonebook");

    // set collection
    contactsCollection = db.collection("contacts");

    // listen for port
    app.listen(port, () => {
        console.log("Server running on port " + port);
    });
});

// route to get all contacts
app.get("/getcontacts", async (req, res) => {
    const response = {
        success: false,
        error: null,
        data: null,
    };

    // find all contacts in database, and convert the result to json
    await contactsCollection.find({}).toArray((err, result) => {
        // if there's an error
        if (err && !result) response.error = err;
        // if no error
        else {
            // if there's no contacts
            if (!result.length) {
                response.success = true;
                response.error = "There's no contacts to show.";
            }
            // if there's contacts
            else {
                response.success = true;
                response.data = result;
            }
        }
        res.send(response);
    });
});

// get a specific contact by id
app.get("/getcontact/:id", async (req, res) => {
    const response = {
        success: false,
        error: null,
        data: null,
    };

    try {
        // try find the contact in the database
        let contact = await contactsCollection.findOne({
            _id: mongodb.ObjectId(req.params.id),
        });

        // if contact found
        if (contact) {
            response.success = true;
            response.data = contact;
        }
        // if no contact found
        else {
            response.success = true;
            response.error = "There's no contact with this id.";
        }
    } catch (err) {
        // if user entered invalid id (not ObjectId)
        console.log(err);
        response.error = "Invalid ID";
    }
    res.send(response);
});

// add new contact
app.post("/addcontact", async (req, res) => {
    const response = {
        success: false,
        error: null,
        data: null,
    };

    // if user send required body fields
    if (req.body.name && req.body.phone) {
        // find if the contact already exists in the database
        let isExist = await contactsCollection.findOne({
            name: req.body.name,
            phone: req.body.phone,
        });

        // if contact is already in the database
        if (isExist) {
            response.success = true;
            response.error = "This contact is already exist.";
        }
        // if no match found in database
        else {
            try {
                // add the contact to the database
                await contactsCollection.insertOne(req.body);
                response.success = true;
                response.data = "Contact added successfully.";
            } catch (err) {
                // if some error happened while inserting contact in database
                response.error = err;
            }
        }
    }
    // if user sent invalid data
    else {
        response.error = "Invalid request, Please enter valid data.";
        response.success = false;
        response.data = null;
    }

    res.send(response);
});

// delete specific contact from database with id
app.delete("/deletecontact/:id", async (req, res) => {
    const response = {
        success: false,
        error: null,
        data: null,
    };
    try {
        // try to find user in database
        let contact = await contactsCollection.findOne({
            _id: mongodb.ObjectId(req.params.id),
        });

        // if contact found
        if (contact) {
            // delete it
            await contactsCollection.deleteOne({
                _id: mongodb.ObjectId(req.params.id),
            });
            response.success = true;
            response.data = "Contact deleted successfully.";
        }
        // if contact not found
        else {
            response.success = true;
            response.error = "There's no contact with this id.";
        }
    } catch (err) {
        // if invalid id was given by user
        console.log(err);
        response.error = "Invalid ID";
    }
    res.send(response);
});

// update specific contact in database
app.put("/updatecontact", async (req, res) => {
    const response = {
        success: false,
        error: null,
        data: null,
    };

    // if all data given
    if (req.body.id && req.body.name && req.body.phone) {
        try {
            // try to find contact in database
            let contact = await contactsCollection.findOne({
                _id: mongodb.ObjectId(req.body.id),
            });
            // if contact found
            if (contact) {
                // update it
                if (contact.name == req.body.name && contact.phone == req.body.phone) {
                    response.success = true;
                    response.error = "There's no changes to update.";
                } else {
                    let updatedContact = await contactsCollection.updateOne(contact, { $set: { name: req.body.name, phone: req.body.phone } });
                    if (updatedContact) {
                        response.success = true;
                        response.data = "Contact Updated successfully.";
                    } else {
                        response.success = true;
                        response.error = "Error while updating contact.";
                    }
                }
            }
            // if contact not found
            else {
                response.success = true;
                response.error = "There's no contact with this id.";
            }
        } catch (err) {
            // if invalid id was given by user
            console.log(err);
            response.error = "Invalid ID";
        }
    }
    // if not all data given
    else response.error = "Invalid request, Please enter valid data.";

    res.send(response);
});

// search for specific contact
app.get("/searchcontacts/:q", async (req, res) => {
    const response = {
        success: false,
        error: null,
        data: null,
    };

    // if all data given
    if (req.params.q) {
        // try to find contacts in database with the phone or name given
        let contacts = await contactsCollection
            .find({
                $or: [{ name: { $regex: req.params.q, $options: "i" } }, { phone: { $regex: req.params.q, $options: "i" } }],
            })
            .toArray();
        // if contact found
        if (contacts && contacts.length > 0) {
            // update it
            response.success = true;
            response.data = contacts;
        }

        // if contact not found
        else {
            response.success = true;
            response.error = "There's no contact with this search query.";
        }
    }
    // if not all data given
    else response.error = "Invalid request, Please enter valid search query.";

    res.send(response);
});
