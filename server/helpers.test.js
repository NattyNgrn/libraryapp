
import { getUserActionQuery } from './helpers';

describe('getUserActionQuery', () => {
    it('should return the correct query for checkin action', () => {
        const userId = 1;
        const bookId = 123;
        const action = 'checkin';
        const expectedQuery = {
            booksQuery: `
            UPDATE books
            SET borrowed = false WHERE id = 123
        `, 
            usersQuery: `
            UPDATE users
            SET checked = array_remove(checked, 123)
            WHERE id = '1'
        `
        };
        const query = getUserActionQuery(userId, bookId, action);
        expect(query).toEqual(expectedQuery);
    });

    it('should return the correct query for checkout action', () => {
        const userId = 1;
        const bookId = 123;
        const action = 'checkout';
        const expectedQuery = {
            booksQuery: `
            UPDATE books
            SET borrowed = true WHERE id = 123
        `, 
            usersQuery: `
            UPDATE users
            SET checked = array_append(checked, 123)
            WHERE id = '1'
        `
        };
        const query = getUserActionQuery(userId, bookId, action);
        expect(query).toEqual(expectedQuery);
    });

    it('should return the correct query for reserve action', () => {
        const userId = 1;
        const bookId = 123;
        const action = 'reserve';
        const expectedQuery = {
            booksQuery: `
            UPDATE books
            SET reserved = true WHERE id = 123
        `, 
            usersQuery: `
            UPDATE users
            SET reserved = array_append(reserved, 123)
            WHERE id = '1'
        `
        };
        const query = getUserActionQuery(userId, bookId, action);
        expect(query).toEqual(expectedQuery);
    });

    it('should return the correct query for unreserve action', () => {
        const userId = 1;
        const bookId = 123;
        const action = 'unreserve';
        const expectedQuery = {
            booksQuery: `
            UPDATE books
            SET reserved = false WHERE id = 123
        `, 
            usersQuery: `
            UPDATE users
            SET reserved = array_remove(reserved, 123)
            WHERE id = '1'
        `
        };
        const query = getUserActionQuery(userId, bookId, action);
        expect(query).toEqual(expectedQuery);
    });
});
