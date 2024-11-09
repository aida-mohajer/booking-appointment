/**
 * @swagger
 * tags:
 *   name: Image
 *   description: Image upload operations
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
 * /api/images/upload/{doctorId}:
 *   post:
 *     summary: Upload an image for a doctor
 *     description: This endpoint allows authenticated users to upload an image associated with a specific doctor ID.
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: false
 *         description: ID of the doctor for whom the image is being uploaded
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Doctor not found
 */
