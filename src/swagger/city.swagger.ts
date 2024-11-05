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
 * /api/cities/add/{attrId}:
 *   post:
 *     summary: Add a new city
 *     description: This endpoint allows authenticated users to add a new city associated with the specified ID.
 *     tags: [City]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: AttrId associated with the city to be added
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 description: The name of the city to add
 *     responses:
 *       201:
 *         description: City added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/cities/{attrId}:
 *   get:
 *     summary: Get cities by attrId
 *     description: This endpoint retrieves the cities associated with the specified attrId.
 *     tags: [City]
 *     parameters:
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: attrId to retrieve the associated cities
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Cities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cityId:
 *                         type: string
 *                         description: The ID of the city
 *                       cityName:
 *                         type: string
 *                         description: The name of the city
 *                       additionalInfo:
 *                         type: object
 *                         description: Any additional information related to the city
 *       404:
 *         description: Cities not found for the specified ID
 */

/**
 * @swagger
 * /api/cities/remove/{cityId}:
 *   delete:
 *     summary: Remove a city
 *     description: This endpoint allows authenticated users to remove a city by its ID.
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
