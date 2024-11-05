/**
 * @swagger
 * tags:
 *   name: Calendar
 *   description: Calendar management operations
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
 * /api/calendars/create:
 *   post:
 *     summary: Create a new calendar
 *     description: This endpoint allows authenticated users to create a new calendar for a doctor.
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date for which the calendar entry is created.
 *                 example: "2024-03-01"
 *     responses:
 *       201:
 *         description: Calendar created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Calendar created successfully"
 *
 *       400:
 *         description: Validation error.
 *
 *       401:
 *         description: Unauthorized, user not authenticated.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/calendars/{doctorId}:
 *   get:
 *     summary: Get calendar by doctor ID
 *     description: This endpoint retrieves the calendar for a specific doctor by their ID.
 *     tags: [Calendar]
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor to retrieve the calendar for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor's calendar retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 calendarId:
 *                   type: string
 *                   description: ID of the calendar
 *                 doctorId:
 *                   type: string
 *                   description: ID of the doctor
 *                 availabilities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: The date of the availability
 *                       startTime:
 *                         type: string
 *                         format: time
 *                         description: The start time of the availability
 *                       endTime:
 *                         type: string
 *                         format: time
 *                         description: The end time of the availability
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /api/calendars/update/{calendarId}:
 *   put:
 *     summary: Update an existing calendar
 *     description: This endpoint allows authenticated users to update a calendar by its ID.
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: calendarId
 *         in: path
 *         required: true
 *         description: ID of the calendar to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                     status:
 *                       type: string
 *                       example: available or unavailable
 *                       description: Update status of a calender
 *
 *     responses:
 *       200:
 *         description: Calendar updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Calendar updated successfully"
 *
 *       400:
 *         description: Validation error.
 *
 *       401:
 *         description: Unauthorized, user not authenticated.
 *
 *       404:
 *         description: Calendar not found.
 *
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/calendars/remove/{calendarId}:
 *   delete:
 *     summary: Remove a calendar
 *     description: This endpoint allows authenticated users to remove a calendar by its ID.
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: calendarId
 *         in: path
 *         required: true
 *         description: ID of the calendar to remove
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Calendar removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Calendar not found
 */
