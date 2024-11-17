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
 * /api/appointments/create/doctor/{doctorId}/hospital/{hospitalId}:
 *   post:
 *     summary: Create a new appointment
 *     description: This endpoint allows patients to create a new appointment with a specific doctor at a specified hospital.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor for whom the appointment is being created
 *         schema:
 *           type: integer
 *       - name: hospitalId
 *         in: path
 *         required: true
 *         description: ID of the hospital where the appointment will take place
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *                 description: The date of the appointment in ISO 8601 format
 *                 example: "2024-11-20"
 *               time:
 *                 type: string
 *                 description: The time of the appointment in HH:mm format
 *                 example: "14:30"
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Bad Request - Validation errors or missing Patient ID
 *       404:
 *         description: Not Found - The specified doctor or hospital does not exist
 *       500:
 *         description: Internal Server Error - An error occurred while creating the appointment
 */

/**
 * @swagger
 * /api/appointments/by-dr/hospital/{hospitalId}:
 *   get:
 *     summary: Retrieve appointments by doctor
 *     description: Retrieve a list of appointments for the authenticated doctor within a specified date range. Allows filtering by availability and supports pagination and search.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: hospitalId
 *         in: path
 *         required: true
 *         description: ID of the hospital to retrieve
 *         schema:
 *           type: number
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           example: "2024-12-01"
 *         description: Start date for filtering appointments (inclusive).
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           example: "2024-12-31"
 *         description: End date for filtering appointments (inclusive).
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page for pagination.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: "checkup"
 *         description: Optional search term for filtering appointments.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of appointments for the doctor.
 *       400:
 *         description: Bad Request - Invalid or missing parameters
 *       401:
 *         description: Unauthorized - Doctor ID is missing or invalid
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/appointments/by-patient:
 *   get:
 *     summary: Retrieve appointments by patient
 *     description: Retrieve a list of appointments for the authenticated user within a specified date range. Allows filtering by availability.
 *     tags: [Appointment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-12-01"
 *         description: Start date for filtering appointments (inclusive).
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *         description: End date for filtering appointments (inclusive).
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of appointments for the patient.
 *       400:
 *         description: Bad Request - Invalid or missing parameters
 *       401:
 *         description: Unauthorized - Patient ID is missing or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/appointments/remove/{appointmentId}:
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
 *     responses:
 *       204:
 *         description: Appointment canceled successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Appointment not found
 */
