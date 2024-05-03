
import express  from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { DB, getUserActionQuery } from "./helpers.js";
import { config } from "dotenv";

const app = express();
const port = 8219;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

DB.connect();

config();
const CLERK_API_KEY = process.env.CLERK_API_KEY;

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

app.put("/addbook", async (req, res) => {
    try {
        const { title, author, date, description, image } = req.body;
        await DB.query(
            "INSERT INTO books (title, author, date, description, image) VALUES ($1, $2, $3, $4, $5)",
            [title, author, date, description, image]
        );
        console.log(`Added book ${title}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.delete("/deletebook/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await DB.query(`DELETE FROM books WHERE id = ${id}`);
        console.log(`Deleted book: ${id}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.put("/updatebook/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, date, description, image } = req.body;
        await DB.query(
            "UPDATE books SET title = $1, author = $2, date = $3, description = $4, image = $5 WHERE id = $6",
            [title, author, date, description, image, id]
        );
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

app.post("/checkinbook", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const { usersQuery, booksQuery } = getUserActionQuery(userId, bookId, "checkin");
        await DB.query(usersQuery);
        await DB.query(booksQuery);
        console.log(`Checking in book with id ${bookId} from user with id ${userId}`);
        const reservedBook = await DB.query(`SELECT reserved, userReserved FROM books WHERE id = ${bookId}`);
        const {reserved, userreserved} = reservedBook.rows[0];
        console.log("checked in book, checking out based on ", reserved, userreserved);
        if (reserved) {
            {
                const { usersQuery, booksQuery } = getUserActionQuery(userreserved, bookId, "checkout");
                await DB.query(usersQuery);
                await DB.query(booksQuery);
            }
            {
                const { usersQuery, booksQuery } = getUserActionQuery(userId, bookId, "unreserve");
                await DB.query(usersQuery);
                await DB.query(booksQuery);
            }
        }
        
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.post("/checkoutbook", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const { usersQuery, booksQuery } = getUserActionQuery(userId, bookId, "checkout");
        await DB.query(usersQuery);
        await DB.query(booksQuery);
        console.log(`Checking out book with id ${bookId} from user with id ${userId}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.post("/reservebook", async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const { usersQuery, booksQuery } = getUserActionQuery(userId, bookId, "reserve");
        await DB.query(usersQuery);
        await DB.query(booksQuery);
        await DB.query(`UPDATE books SET userReserved = '${userId}' WHERE id = ${bookId}`);
        console.log(`Reserving book with id ${bookId} from user with id ${userId}`);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.put("/checkadduser", async (req, res) => {
    try {
        const { id, name } = req.body;
        const checkUserResult = await DB.query(
            `SELECT * FROM users WHERE id = '${id}'`
        );
        if (checkUserResult.rowCount === 0) {
            console.log("new user");
            await DB.query(
                `INSERT INTO users (id, name) VALUES ('${id}', '${name}')` 
            );
        }
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.get("/getbooksforuser/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await DB.query(`SELECT checked from users WHERE id = '${id}'`);
        const bookIds = result.rows[0].checked;
        if (bookIds.length > 0) {
            const booksResult = await DB.query(`SELECT * FROM books WHERE id IN (${bookIds})`);
            res.send(booksResult.rows);
        } else {
            res.send([]);
        }
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.get("/getusers", async (req, res) => {
    try {
        const response = await fetch("https://api.clerk.com/v1/users",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLERK_API_KEY}`
            },
        });
        const users = await response.json();
        res.send(users);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.delete("/deleteuser/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await DB.query(`DELETE FROM users WHERE id = '${id}'`);
        await fetch(`https://api.clerk.com/v1/users/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLERK_API_KEY}`
            },
        });
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.post("/makeadmin/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await fetch(`https://api.clerk.com/v1/users/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLERK_API_KEY}`
            },
            body: JSON.stringify({
                "public_metadata": {
                    "role": "admin"
                }
            })
        });
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error});
    }
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
