/**
 * @swagger
 * tags:
 *   name: Availability
 *   description: Availability management operations
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
 * /api/availabilities/create/{calendarId}:
 *   post:
 *     summary: Create a new availability
 *     description: This endpoint allows authenticated users to create a new availability for a specific calendar.
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: calendarId
 *         in: path
 *         required: true
 *         description: ID of the calendar to which the availability belongs
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: string
 *                 description: The date of the availability
 *                 example: 11:00 AM
 *     responses:
 *       201:
 *         description: Availability created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Calendar not found
 */

/**
 * @swagger
 * /api/availabilities/{calendarId}:
 *   get:
 *     summary: Get availabilities by calendar ID
 *     description: This endpoint retrieves all availabilities for a specific calendar.
 *     tags: [Availability]
 *     parameters:
 *       - name: calendarId
 *         in: path
 *         required: true
 *         description: ID of the calendar to retrieve availabilities for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of availabilities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID of the availability
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: The date of the availability
 *                   startTime:
 *                     type: string
 *                     format: time
 *                     description: The start time of the availability
 *                   endTime:
 *                     type: string
 *                     format: time
 *                     description: The end time of the availability
 *       404:
 *         description: Calendar not found
 */

/**
 * @swagger
 * /api/availabilities/remove/{availabilityId}:
 *   delete:
 *     summary: Remove an availability
 *     description: This endpoint allows authenticated users to remove an availability by its ID.
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: availabilityId
 *         in: path
 *         required: true
 *         description: ID of the availability to remove
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Availability removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Availability not found
 */
