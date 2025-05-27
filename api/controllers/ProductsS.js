import db from '../db.js';

export const getAllProductsS = async (req, res) => {
    const connection = await db.promise().getConnection();
    try {
        await connection.beginTransaction();

        const { search, categories, minPrice, maxPrice } = req.query;

        // Base query using INNER JOIN for Products and Categories
        let query = `
            SELECT 
                p.ProductID, 
                p.ProductName, 
                p.Description, 
                p.Price, 
                p.Stock, 
                p.Cover, 
                c.CategoryName
            FROM 
                ecommerce.Products p
            INNER JOIN 
                ecommerce.Categories c 
                ON p.CategoryID = c.CategoryID
            LEFT JOIN 
                ecommerce.Users u
                ON p.UserID = u.UserID
            WHERE 1=1
        `;

        // Add search filter
        if (search) {
            query += ` AND p.ProductName LIKE ?`;
        }

        // Add categories filter
        if (categories) {
            const categoryIDs = categories.split(',').map(Number).filter(Boolean);
            if (categoryIDs.length > 0) {
                query += ` AND p.CategoryID IN (${categoryIDs.join(',')})`;
            }
        }

        // Add price range filter
        if (minPrice && maxPrice) {
            query += ` AND p.Price BETWEEN ? AND ?`;
        }

        // Execute the query with parameters
        const values = [];
        if (search) values.push(`%${search}%`);
        if (minPrice && maxPrice) {
            values.push(Number(minPrice), Number(maxPrice));
        }

        const [products] = await connection.query(query, values);

        await connection.commit();

        res.status(200).json({
            products
        });
    } catch (error) {
        await connection.rollback();
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    } finally {
        connection.release();
    }
};
