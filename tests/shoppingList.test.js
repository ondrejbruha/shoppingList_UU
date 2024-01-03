const request = require('supertest');
const express = require('express');
const router = require('../routes/shoppingList');
const app = express();
app.use(express.json());
app.use('/', router);


const url = "http://localhost:8000/api/shoppingList";
const session = "738d331e55971cfbeb3c6c48b9fee8dc206022f28569903774f9e15627975a70";

let newID = "";

async function getShoppingList(id) {
    const response = await fetch(url + "/" + id, {
        method: "GET",
        headers: {
            session: session
        }
    });
    return await response.json();
}
async function postShoppingList(shoppingList) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            session: session,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(shoppingList)
    });
    return await response.json();
}

async function putShoppingList(id, shoppingList) {
    const response = await fetch(url + "/" + id, {
        method: "PUT",
        headers: {
            session: session,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(shoppingList)
    });
    return await response.json();
}

async function getNotAuthShoppingList(id) {
    const response = await fetch(url + "/" + id, {
        method: "GET",
    });
    return await response.json();
}


const expected = {
    "owner_id": "477f27c886ce18fa08c24b4607917f1b",
    "writerList": [
        "477f27c886ce18fa08c24b4607917f1b"
    ],
    "shoppingList_id": "b9b2c53a3259eb2bebe5cdc6d4596da1",
    "name": "Nakupni seznam 2",
    "items": [
        {
            "name": "cibule",
            "quantity": 1,
            "unit": "kg",
            "_id": "6575721623a9f850b61f1c4e"
        },
        {
            "item_id": "88c07688dccf583753d2fd25ed69d5ea",
            "name": "pomeranc",
            "quantity": 3,
            "unit": "ks",
            "_id": "657573f0fa5edb7ef528419b"
        }
    ],
}

describe('GET /:id', () => {
    it('ok', async () => {
        const res = await getShoppingList("b9b2c53a3259eb2bebe5cdc6d4596da1")

        expect(res.owner_id).toBe(expected.owner_id);
    });
});
describe('POST /:id', () => {
    it('ok', async () => {
        const res = await postShoppingList(expected)
        expect(res.owner_id).toBe(expected.owner_id);
    });
});
describe('PUT /:id', () => {
    it("ok", async () => {
        const res = await putShoppingList("b9b2c53a3259eb2bebe5cdc6d4596da1", expected)
        expect(res.owner_id).toBe(expected.owner_id);
    });
});
describe('GET /:id', () => {
    it('unauthorized', async () => {
        const res = await getNotAuthShoppingList("b9b2c53a3259eb2bebe5cdc6d4596da1")

        expect(res.message).toBe("Unauthorized");
    });
});
describe('GET /:id', () => {
    it('not found', async () => {
        const res = await getShoppingList("aaaa1")

        expect(res.message).toBe("Bad request");
    });
});



