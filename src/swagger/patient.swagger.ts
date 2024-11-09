/**
 * @swagger
 * tags:
 *   name: Patient
 *   description: Patient management and authentication
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
 * /api/patients/register:
 *   post:
 *     summary: Register a new patient
 *     description: This endpoint allows users to register a new patient.
 *     tags: [Patient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The first name of the patient
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The last name of the patient
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the patient
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the patient (minimum 8 characters)
 *                 example: Passw0rd!
 *               contactNumber:
 *                 type: string
 *                 description: The contact number of the patient
 *                 example: +1234567890
 *               age:
 *                 type: number
 *                 description: The age of the patient, must be between 18 and 100
 *                 example: 25
 *               gender:
 *                 type: string
 *                 description: The gender of the patient, either "man" or "woman"
 *                 example: man
 *     responses:
 *       201:
 *         description: Patient registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/patients/login:
 *   post:
 *     summary: Patient login
 *     description: Allows a patient to log in to the system using their email and password.
 *     tags: [Patient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the patient.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the patient.
 *                 example: Passw0rd!
 *     responses:
 *       200:
 *         description: Patient logged in successfully.
 *       400:
 *         description: Validation error in input.
 *       401:
 *         description: Invalid credentials or unauthorized access.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/patients/profile/{patientId}:
 *   get:
 *     summary: Retrieve a patient's profile
 *     description: This endpoint allows an authenticated patient or admin to retrieve the profile details of a patient. Admins can specify the `patientId` as a parameter to retrieve any patient's profile, while patients can retrieve only their own profile.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the patient. Admin users can specify this to retrieve any patient's profile. Patients do not need to specify it, as they can only access their own profile.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved patient profile
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Access is restricted to the patient's own profile or to admin users
 *       404:
 *         description: Not Found - Patient not found
 */

/**
 * @swagger
 * /api/patients/with-appointments/doctor/{doctorId}:
 *   get:
 *     summary: Retrieve patients with appointments for a specific doctor
 *     description: Fetches a list of patients who have appointments with a specified doctor, with optional filters for date and pagination.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the doctor whose patients with appointments are to be retrieved.
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           minimum: 2010
 *           maximum: 2025
 *         required: false
 *         description: Filter patients by the year of the appointment.
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         required: false
 *         description: Filter patients by the month of the appointment (1-12).
 *       - in: query
 *         name: day
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 31
 *         required: false
 *         description: Filter patients by the day of the appointment.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: true
 *         description: The maximum number of patients to retrieve per page.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Search for patients by name.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients with appointments retrieved successfully
 *       400:
 *         description: Bad request - Invalid query parameters
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Access is restricted to admin or doctor users
 *       404:
 *         description: Not Found - No patients found for the specified filters
 */

/**
 * @swagger
 * /api/patients/update/{patientId}:
 *   put:
 *     summary: Update patient details
 *     description: This endpoint allows users to update details of an existing patient.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: false
 *         description: The ID of the patient to update
 *         schema:
 *           type: string
 *         example: 12345
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The first name of the patient
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The last name of the patient
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the patient
 *                 example: john.doe@example.com
 *               contactNumber:
 *                 type: string
 *                 description: The contact number of the patient
 *                 example: +1234567890
 *               age:
 *                 type: number
 *                 description: The age of the patient, must be between 18 and 100
 *                 example: 30
 *               gender:
 *                 type: string
 *                 description: The gender of the patient, either "man" or "woman"
 *                 example: man
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient details updated successfully
 *       400:
 *         description: Validation error or invalid data
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user does not have the required role
 *       404:
 *         description: Patient not found with the provided ID
 */

/**
 * @swagger
 * /api/patients/logout/{patientId}:
 *   post:
 *     summary: Log out a patient
 *     description: This endpoint allows a patient or an admin to log out a patient.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: false
 *         description: The ID of the patient to log out
 *         schema:
 *           type: string
 *         example: 12345
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient logged out successfully
 *       400:
 *         description: Invalid patient ID or request format
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user does not have the required role
 *       404:
 *         description: Patient not found with the provided ID
 */

/**
 * @swagger
 * /api/patients/remove/{patientId}:
 *   delete:
 *     summary: Remove a patient
 *     description: This endpoint allows a patient or an admin to remove a patient from the system.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: false
 *         description: The ID of the patient to remove
 *         schema:
 *           type: string
 *         example: 12345
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient removed successfully
 *       400:
 *         description: Invalid patient ID or request format
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, user does not have the required role
 *       404:
 *         description: Patient not found with the provided ID
 */
