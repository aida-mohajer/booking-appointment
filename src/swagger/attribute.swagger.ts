/**
 * @swagger
 * tags:
 *   name: Attribute
 *   description: Attribute management operations
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
 * /api/attributes/create:
 *   post:
 *     summary: Create a new attribute
 *     description: This endpoint allows authenticated users to create a new attribute.
 *     tags: [Attribute]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the attribute
 *     responses:
 *       201:
 *         description: Attribute created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/attributes:
 *   get:
 *     summary: Get all attributes
 *     description: This endpoint retrieves a list of all attributes.
 *     tags: [Attribute]
 *     responses:
 *       200:
 *         description: List of attributes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID of the attribute
 *                   name:
 *                     type: string
 *                     description: Name of the attribute
 *                   description:
 *                     type: string
 *                     description: Description of the attribute
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/attributes/delete/{id}:
 *   delete:
 *     summary: Delete an attribute
 *     description: This endpoint allows authenticated users to delete an attribute by its ID.
 *     tags: [Attribute]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the attribute to delete
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Attribute deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Attribute not found
 */
