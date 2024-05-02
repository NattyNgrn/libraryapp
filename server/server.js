
import pg from "pg";
import express  from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { DB } from "./helpers.js";
const app = express();
const port = 8219;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

DB.connect();

app.get("/", (req, res) => {
    res.json("IT WORKS");
});

app.get("/books", async (req, res) => {
    try {
        const result = await DB.query("SELECT * FROM books");
        console.log(`Got ${result.rowCount} rows of books`);
        res.send(result.rows);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

//write a post method to add a book
app.post("/addbook", async (req, res) => {
    try {
        const { title, author, year } = req.body;
        const result = await DB.query("INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *", [title, author, year]);
        console.log(`Added book: ${result.rows[0].title}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

//write a delete method to delete a book
app.delete("/deletebook/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await DB.query("DELETE FROM books WHERE id = $1 RETURNING *", [id]);
        console.log(`Deleted book: ${result.rows[0].title}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

//write a put method to update a book
app.put("/updatebook/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, year } = req.body;
        const result = await DB.query("UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4 RETURNING *", [title, author, year, id]);
        console.log(`Updated book: ${result.rows[0].title}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.get("/users", async (req, res) => {
    try {
        const result = await DB.query("SELECT * FROM users");
        console.log(`Got ${result.rowCount} rows of users`);
        res.send(result.rows);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.post("/adduserifnoexist", async (req, res) => {
    try {
        const { id, name, email } = req.body;
        const checkUserResult = await DB.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );
        if (checkUserResult.rowCount === 0) {
            const addUserResult = await DB.query(
                "INSERT INTO users (id, name, email) VALUES ($1, $2, $3) RETURNING *", 
                [id, name, email]
            );
            console.log(`Added user: ${addUserResult.rows[0].name}`);
        }
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.delete("/checkinbook", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const { userQuery, bookQuery } = getUserActionQuery(userId, bookId, "checkin");
        await DB.query(userQuery);
        await DB.query(bookQuery);
        console.log(`Actioned book with id ${bookId} from user with id ${userId}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.post("/checkoutbook", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const { userQuery, bookQuery } = getUserActionQuery(userId, bookId, "checkout");
        await DB.query(userQuery);
        await DB.query(bookQuery);
        console.log(`Actioned book with id ${bookId} from user with id ${userId}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.post("/reservebook", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const { userQuery, bookQuery } = getUserActionQuery(userId, bookId, "reserve");
        await DB.query(userQuery);
        await DB.query(bookQuery);
        console.log(`Actioned book with id ${bookId} from user with id ${userId}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.post("/unreservebook", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const { userQuery, bookQuery } = getUserActionQuery(userId, bookId, "unreserve");
        await DB.query(userQuery);
        await DB.query(bookQuery);
        console.log(`Actioned book with id ${bookId} from user with id ${userId}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
