
# Welcome to Nat's Public Library

![ezgif-5-7a68553207](https://github.com/NattyNgrn/libraryapp/assets/132034444/560417fe-8b18-42f9-9d68-6e3bbe64a872)

![catalogue-gif](https://github.com/NattyNgrn/libraryapp/assets/132034444/4b019438-cb7d-4510-9360-dba929d7d577)

![adding-updating](https://github.com/NattyNgrn/libraryapp/assets/132034444/c70c8b01-8de1-4461-a09a-76ba729798be)

![account-thing](https://github.com/NattyNgrn/libraryapp/assets/132034444/12d40ead-b6ce-4949-95de-c228ec4163aa)

## Initialization and Setup
First setup the server
```
cd server
npm install
npm run start
```
Then open another terminal window in the same folder to setup the client
```
cd client
npm install
npm run dev
```
To test with an account with admin access sign in with
- email - nattylizn@gmail.com
- password - meowmeow0219

The database is already deployed so don't worry about that :)

## Dependencies

### User Authentication - Clerk
The user authentication, sign-up, and sign-in is handled by Clerk for security purposes. The application uses the clerk API for most user related things, but stores the user id's, names, and the books they have checked out/reserved in its own database.

### Frontend
- vite - for initial project template and building
- clerk - for user authentication
- cloudinary - for uploading images
- flowbite - for stylish UI components
- react - for UI
- react-dom - for routing between pages
- tailwind - for inline css styling

### Backend
- body-parser
- cloudinary
- cors
- dotenv - to access the .env files for clerk api secrets
- express - as the routing framework
- nodemon - for starting up the node backend
- pg - for connecting to postgresql database

## Database Setup


## Express Routes
1. ```/books```: Fetches all books from the database and sends them as a response.
2. ```/addbook```: Adds a new book to the database.
3. ```/deletebook/:id```: Deletes a book from the database.
4. ```/updatebook/:id```: Updates a book's details in the database.
5. ```/users```: Fetches all users from the users table and sends them as a response.
7. ```/checkinbook```: Checks in a book for a user. If another user has already reserved the book, it also automatically checks the book out for that other user.
8. ```/checkoutbook```: Checks out a book for a user.
9. ```/reservebook```: Reserves a book for a user.
10. ```/checkadduser```: Checks if a user exists in the users table, if not, it adds the user.
11. ```/getbooksforuser/:id```: Fetches all books checked out by a user.
12. ```/getusers```: Fetches all users by using the Clerk API.
13. ```/deleteuser/:id```: Deletes a user from the database and from Clerk.
14. ```/makeadmin/:id```: Updates a user's role to be admin in Clerk.

## Tests
You can run the tests with
```
cd server
npm run test
```
There are 4 server tests included that test a helper function called getUserActionQuery. It returns the queries needed for the books table and the users table based on whether the user is checking in, checking out, reserving, or unreserving the book.


