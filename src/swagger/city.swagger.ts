/**
 * @swagger
 * tags:
 *   name: City
 *   description: City management operations
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/cities/create:
 *   post:
 *     summary: create a new city
 *     description: This endpoint allows admins to create a new city.
 *     tags: [City]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 description: The name of the city to create
 *     responses:
 *       201:
 *         description: City created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/cities:
 *   get:
 *     summary: Get cities
 *     description: This endpoint retrieves the cities.
 *     tags: [City]
 *     responses:
 *       200:
 *         description: Cities retrieved successfully
 *       404:
 *         description: Cities not found
 */

/**
 * @swagger
 * /api/cities/remove/{cityId}:
 *   delete:
 *     summary: Remove a city
 *     description: This endpoint admins to remove a city by its ID.
 *     tags: [City]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: cityId
 *         in: path
 *         required: true
 *         description: ID of the city to remove
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: City removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: City not found
 */
