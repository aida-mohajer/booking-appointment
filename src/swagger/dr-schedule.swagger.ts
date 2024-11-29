/**
 * @swagger
 * tags:
 *   name: Doctor Schedule
 *   description: Dr schedule management operations
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
 * /api/drs-schedule/create/hospital/{hospitalId}/{doctorId}:
 *   post:
 *     summary: Create a schedule for a doctor at a hospital
 *     description: This endpoint allows an admin or doctor to create a schedule for a specific doctor at a specified hospital.
 *     tags: [Doctor Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         description: The ID of the hospital where the schedule is to be created.
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: doctorId
 *         required: false
 *         description: The ID of the doctor for whom the schedule is created. Required for Admin role.
 *         schema:
 *           type: integer
 *           example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weekDay:
 *                 type: string
 *                 enum: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
 *                 description: The day of the week for the schedule.
 *               startTime:
 *                 type: string
 *                 format: time
 *                 example: 10:30
 *                 description: The start time for the schedule.
 *               endTime:
 *                 type: string
 *                 format: time
 *                 example: 10:30
 *                 description: The end time for the schedule.
 *               startDate:
 *                 type: string
 *                 format: Date
 *                 example: 2024-11-01
 *                 description: The start date for the schedule.
 *               endDate:
 *                 type: string
 *                 format: Date
 *                 example: 2024-11-01
 *                 description: The end date for the schedule.
 *               duration:
 *                 type: integer
 *                 format: number
 *                 example: 15
 *                 description: The duration for make time slots.
 *               price:
 *                 type: number
 *                 format: number
 *                 example: 150
 *                 description: The price of appointment.
 *     responses:
 *       '201':
 *         description: Schedule created successfully.
 *       '400':
 *         description: Bad request. Invalid doctor ID or schedule data.
 *       '401':
 *         description: Unauthorized. User is not authenticated.
 *       '403':
 *         description: Forbidden. User does not have permission to perform this action.
 */

/**
 * @swagger
 * /api/drs-schedule/hospital/{hospitalId}/doctor/{doctorId}:
 *   get:
 *     summary: Get schedule by doctor
 *     description: This endpoint retrieves the schedule for a particular doctor at a specified hospital.
 *     tags: [Doctor Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: hospitalId
 *         in: path
 *         required: true
 *         description: ID of the hospital to fetch the doctor's schedule from
 *         schema:
 *           type: integer
 *       - name: doctorId
 *         in: path
 *         required: false
 *         description: ID of the doctor whose schedule is being fetched
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Schedule retrieved successfully
 *       400:
 *         description: Bad Request - Invalid doctor ID or other validation errors
 *       404:
 *         description: Not Found - The specified doctor or hospital does not exist
 *       500:
 *         description: Internal Server Error - An error occurred while retrieving the schedule
 */
/**
 * @swagger
 * /api/drs-schedule/available-slots/hospital/{hospitalId}/doctor/{doctorId}:
 *   get:
 *     summary: Get available slots for a specific doctor in a hospital
 *     description: This endpoint retrieves available slots for a given doctor in a specified hospital.
 *     tags: [Doctor Schedule]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         description: The date to give slots.
 *         schema:
 *           type: string
 *           example: 2024-12-1
 *       - name: hospitalId
 *         in: path
 *         required: true
 *         description: ID of the hospital to check available slots in
 *         schema:
 *           type: integer
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor to retrieve available slots for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of available slots for the doctor at the hospital
 *       400:
 *         description: Bad Request - Doctor ID is required and must be valid or other validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Doctor ID is required and must be valid"
 *       404:
 *         description: Not Found - The specified hospital or doctor does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Hospital not found"
 *       500:
 *         description: Internal Server Error - An error occurred while retrieving available slots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred"
 */

/**
 * @swagger
 * /api/drs-schedule/update/{scheduleId}/doctor/{doctorId}:
 *   put:
 *     summary: Update a doctor's schedule
 *     description: This endpoint allows users to update a doctor's schedule by providing the schedule ID and optional doctor ID.
 *     tags: [Doctor Schedule]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: scheduleId
 *         in: path
 *         required: true
 *         description: ID of the schedule to update
 *         schema:
 *           type: string  # Assuming scheduleId is a string, change to number if necessary
 *       - name: doctorId
 *         in: path
 *         required: false
 *         description: ID of the doctor associated with the schedule (optional)
 *         schema:
 *           type: string  # Assuming doctorId is a string, change to number if necessary
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weekDay:
 *                 type: string
 *                 enum:
 *                   - Saturday
 *                   - Sunday
 *                   - Monday
 *                   - Tuesday
 *                   - Wednesday
 *                   - Thursday
 *                   - Friday
 *                 description: The day of the week for the schedule (optional).
 *               startTime:
 *                 type: string
 *                 description: Start time in HH:mm format (optional).
 *                 example: 10:00
 *               endTime:
 *                 type: string
 *                 description: End time in HH:mm format (optional).
 *                 example: 11:00
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date in custom date string format (optional).
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date in custom date string format (optional).
 *               duration:
 *                 type: integer
 *                 description: Duration in minutes (optional).
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Schedule not found
 */

/**
 * @swagger
 * /api/drs-schedule/remove/schedule/{scheduleId}/doctor/{doctorId}:
 *   delete:
 *     summary: Remove an schedule
 *     description: This endpoint allows admins & authenticated users to remove an schedule by ID.
 *     tags: [Doctor Schedule]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: scheduleId
 *         in: path
 *         required: true
 *         description: ID of the schedule to remove
 *         schema:
 *           type: number
 *       - name: doctorId
 *         in: path
 *         required: false
 *         description: ID of the doctor to remove schedule
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Schedule removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Schedule not found
 */
