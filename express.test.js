const request = require('supertest'); // Use supertest, not jest
const app = require('./express'); // Make sure this path is correct

describe('Statistical Operations', () => {

    test('GET /mean - should return the mean of the numbers', async () => {
        const response = await request(app).get('/mean?nums=1,2,3,4,5');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ operation: 'mean', value: 3 });
    });

    test('GET /median - should return the median of the numbers', async () => {
        const response = await request(app).get('/median?nums=1,2,3,4,5');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ operation: 'median', value: 3 });
    });

    test('GET /mode - should return the mode of the numbers', async () => {
        const response = await request(app).get('/mode?nums=1,2,2,3,4');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ operation: 'mode', value: 2 });
    });

    test('GET /mean - should handle non-numeric input', async () => {
        const response = await request(app).get('/mean?nums=1,2,foo');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'foo is not a number.' });
    });

    test('GET /mean - should handle empty input', async () => {
        const response = await request(app).get('/mean');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'nums are required.' });
    });

    // Add similar tests for /median and /mode as needed
});
