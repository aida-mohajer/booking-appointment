/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Appointment management operations
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
 * /api/appointments/create/{doctorId}/availability/{availabilityId}:
 *   post:
 *     summary: Create a new appointment
 *     description: This endpoint allows authenticated users to create a new appointment for a specific doctor and availability.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor for whom the appointment is created
 *         schema:
 *           type: number
 *       - name: availabilityId
 *         in: path
 *         required: true
 *         description: ID of the availability slot for the appointment
 *         schema:
 *           type: number
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Doctor or availability not found
 */

/**
 * @swagger
 * /api/appointments/by-dr:
 *   get:
 *     summary: Get appointments by doctor
 *     description: This endpoint retrieves all appointments for a specific doctor.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     responses:
 *       200:
 *         description: List of appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   appointmentId:
 *                     type: string
 *                     description: ID of the appointment
 *                   doctorId:
 *                     type: string
 *                     description: ID of the doctor
 *                   patientId:
 *                     type: string
 *                     description: ID of the patient
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time for the appointment
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/appointments/by-patient/{doctorId}:
 *   get:
 *     summary: Get appointments by patient for a specific doctor
 *     description: This endpoint retrieves all appointments made by a specific patient for a specific doctor.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor to retrieve appointments for
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   appointmentId:
 *                     type: number
 *                     description: ID of the appointment
 *                   doctorId:
 *                     type: number
 *                     description: ID of the doctor
 *                   patientId:
 *                     type: number
 *                     description: ID of the patient
 *                   date:
 *                     type: string
 *                     description: Date and time for the appointment
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /api/appointments/remove/{appointmentId}/calendar/{calendarId}:
 *   delete:
 *     summary: Cancel an appointment
 *     description: This endpoint allows authenticated users to cancel an appointment by its ID.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: appointmentId
 *         in: path
 *         required: true
 *         description: ID of the appointment to cancel
 *         schema:
 *           type: number
 *       - name: calendarId
 *         in: path
 *         required: true
 *         description: ID of the calendar for fixing status
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Appointment canceled successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Appointment not found
 */
