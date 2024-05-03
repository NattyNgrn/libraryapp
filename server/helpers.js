import pg from 'pg';

export const DB = new pg.Client({
    user: 'me',
    host: 'localhost',
    database: 'LibraryManagement',
    password: 'password',
    port: 5432
});

// action: "checkin" | "checkout" | "reserve" | "unreserve"
export function getUserActionQuery(userId, bookId, action) {
    let arrayName = "", arrayAction = "", boolColumn = "", newBoolValue = "";
    switch(action) {
        case "checkin":
            arrayName = "checked";
            arrayAction = "array_remove";
            boolColumn = "borrowed";
            newBoolValue = "false";
            break;
        case "checkout":
            arrayName = "checked";
            arrayAction = "array_append";
            boolColumn = "borrowed";
            newBoolValue = "true";
            break;
        case "reserve":
            arrayName = "reserved";
            arrayAction = "array_append";
            boolColumn = "reserved";
            newBoolValue = "true";
            break;
        case "unreserve":
            arrayName = "reserved";
            arrayAction = "array_remove";
            boolColumn = "reserved";
            newBoolValue = "false";
            break;
        default:
            throw new Error("Invalid action");
    }
    return {
        usersQuery:`
            UPDATE users
            SET ${arrayName} = ${arrayAction}(${arrayName}, ${bookId})
            WHERE id = '${userId}'
        `,
        booksQuery: `
            UPDATE books
            SET ${boolColumn} = ${newBoolValue} WHERE id = ${bookId}
        `
    };
}
