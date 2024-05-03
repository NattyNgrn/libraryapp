
# Welcome to Nat's Public Library

![ezgif-5-7a68553207](https://github.com/NattyNgrn/libraryapp/assets/132034444/560417fe-8b18-42f9-9d68-6e3bbe64a872)

![catalogue-gif](https://github.com/NattyNgrn/libraryapp/assets/132034444/4b019438-cb7d-4510-9360-dba929d7d577)

![adding-updating](https://github.com/NattyNgrn/libraryapp/assets/132034444/c70c8b01-8de1-4461-a09a-76ba729798be)

![account-thing](https://github.com/NattyNgrn/libraryapp/assets/132034444/12d40ead-b6ce-4949-95de-c228ec4163aa)

## Features
- A user can check out a book from the Catalog that another user has not checked out to add it to their library.
- A user can check in a book from their personal library to make it available to check out for others.
- A user can reserve a book that another user has not reserved.
- Users can filter books by title and author in their personal library and in the catalog.
- Users can filter out unavailable books to only see books that are available to check out or reserve.
- If a user checks in a book, and another user has reserved it, the book will automatically be checked out for the user who reserved it.
- An admin can delete users and make other users an admin through the Admin Users page, only accessible by admins.
- An admin can add, update, and delete books from the library. (a book will only be added/updated if the date is put in date (xx/xx/xxxx) format)

## Initialization and Setup
First create a database called LibraryManagement with postgresql. Then by put the pg_dump found in mydb.sql into LibraryManagement on port 5432. Set up a user called me with with the password "password".
If you want to use your own user you can change it at line 4 and line 8 of server/helpers.js
```
psql -U me -d LibraryManagement < mydb.sql
```

Then setup the server
Create a .env file in the server folder.
In it, put CLERK_API_KEY={the key i send you}
If you don't have the key, you can message me for it.
```
cd server
npm install
npm run start
```
Then open another terminal window in the same folder to setup the client.
Create a .env.local file in the client folder.
In it, put VITE_CLERK_PUBLISHABLE_KEY={the key i send you for this}
They're two different keys so assure that they're set correctly.
```
cd client
npm install
npm run dev
```
To test with an account with admin access sign in with
- email - nattylizn@gmail.com
- password - meowmeow0219

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

## Database
The database dump is located in mydb.sql for detail on how to set it up. It contains two tables books and users. 

The books table has 9 columns. id, title, author, date, description are self explanatory. Borrowed is true or false based on whether the book has been checked out. Reserved is true or false based on if the book was checked out. userreserved contains the user id of the last user who reserved the book.

The users table has 4 columns. id and name are for the user's id in Clerk and the user's name. The checked column is an array of book ids that the user has checked out. The reserved column is an array of book ids the user has reserved.


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


