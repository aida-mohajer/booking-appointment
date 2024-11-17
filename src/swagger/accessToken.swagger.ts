/**
 * @swagger
 * tags:
 *   name: AccessToken
 *   description: Operations for managing access tokens
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
 * /api/access-token:
 *   post:
 *     summary: Create a new access token
 *     description: This endpoint allows authenticated users to create a new access token using a valid refresh token.
 *     tags: [AccessToken]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token of the user
 *     responses:
 *       201:
 *         description: Access token created successfully
 *       400:
 *         description: Validation error, invalid refresh token format or missing required fields
 *       401:
 *         description: Unauthorized, invalid or expired refresh token
 */
