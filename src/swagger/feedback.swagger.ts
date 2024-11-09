/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Feedback management operations
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
 * /api/feedbacks/{doctorId}:
 *   post:
 *     summary: Create feedback for a doctor
 *     description: This endpoint allows authenticated users to create feedback for a specific doctor.
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor for whom the feedback is being created
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Rating given to the doctor (1-5 scale)
 *               comment:
 *                 type: string
 *                 description: Feedback comment
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/feedbacks/{doctorId}:
 *   get:
 *     summary: Retrieve feedbacks for a doctor
 *     description: This endpoint retrieves all feedbacks for a specific doctor by ID.
 *     tags: [Feedback]
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor to retrieve feedbacks for
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Feedbacks retrieved successfully
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /api/feedbacks/{feedbackId}:
 *   put:
 *     summary: Update feedback
 *     description: This endpoint allows authenticated users to update existing feedback by feedback ID.
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: feedbackId
 *         in: path
 *         required: true
 *         description: ID of the feedback to update
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 description: Updated rating (1-5 scale)
 *               comment:
 *                 type: string
 *                 description: Updated feedback comment
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Feedback not found
 */

/**
 * @swagger
 * /api/feedbacks/{feedbackId}:
 *   delete:
 *     summary: Delete feedback
 *     description: This endpoint allows authenticated users to delete existing feedback by feedback ID.
 *     tags: [Feedback]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: feedbackId
 *         in: path
 *         required: true
 *         description: ID of the feedback to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Feedback deleted successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Feedback not found
 */
