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
 *                 example: john.doe@gmail.com
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
 *                 example: john.doe@gmail.com
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
 * /api/patients/profile:
 *   get:
 *     summary: Retrieve a patient's profile
 *     description: This endpoint allows an authenticated patient retrieve the profile details.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved patient profile
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - Access is restricted to the patient's own profile
 *       404:
 *         description: Not Found - Patient not found
 */

/**
 * @swagger
 * /api/patients/update:
 *   put:
 *     summary: Update patient details
 *     description: This endpoint allows users to update details of an existing patient.
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
 *                 example: john.doe@gmail.com
 *               password:
 *                 type: string
 *                 description: The password of the patient
 *                 example: 12wq
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
 * /api/patients/logout:
 *   post:
 *     summary: Log out a patient
 *     description: This endpoint allows a patient to log out a patient.
 *     tags: [Patient]
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
 * /api/patients/remove:
 *   delete:
 *     summary: Remove a patient
 *     description: This endpoint allows a patient to remove a patient from the system.
 *     tags: [Patient]
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
