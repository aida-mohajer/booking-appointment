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
 *                 description: The name of the patient
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The last name of the patient
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the patient
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the patient (minimum 8 characters)
 *                 example: Passw0rd!
 *               contact_number:
 *                 type: string
 *                 description: The contact number of the patient
 *                 example: +1234567890
 *               age:
 *                 type: number
 *                 description: The age of the patient (between 18 and 100)
 *                 example: 25
 *               gender:
 *                 type: string
 *                 description: The gender of the patient (either "man" or "woman")
 *                 example: man
 *               role:
 *                 type: string
 *                 description: Optional role for the patient (either "patient" or "admin")
 *                 example: patient
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
 *     summary: Login a patient
 *     description: This endpoint allows patients to log in.
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
 *                 description: The email of the patient
 *               password:
 *                 type: string
 *                 description: The password for the patient
 *     responses:
 *       200:
 *         description: Patient logged in successfully
 *       400:
 *         description: Invalid email or password
 *
 */
/**
 * @swagger
 * /api/patients/patients-availability/{availabilityId}:
 *   get:
 *     summary: Get patient's availability
 *     description: This endpoint retrieves the availability of a patient by their availability ID.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: availabilityId
 *         in: path
 *         required: true
 *         description: The ID of the patient's availability
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Availability retrieved successfully
 *       404:
 *         description: Availability not found
 *       400:
 *         description: Validation error
 *
 */

/**
 * @swagger
 * /api/patients/{patientId}:
 *   get:
 *     summary: Get patient details by ID
 *     description: This endpoint allows an authenticated user to retrieve the details of a specific patient by their ID.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []  # Assuming Bearer token is used for authentication
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         description: The ID of the patient to retrieve
 *         schema:
 *           type: string
 *           example: 123
 *     responses:
 *       200:
 *         description: Patient details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The patient's ID
 *                   example: 123
 *                 name:
 *                   type: string
 *                   description: The patient's first name
 *                   example: John
 *                 lastName:
 *                   type: string
 *                   description: The patient's last name
 *                   example: Doe
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The patient's email
 *                   example: john.doe@example.com
 *                 contact_number:
 *                   type: string
 *                   description: The patient's contact number
 *                   example: +1234567890
 *                 age:
 *                   type: number
 *                   description: The patient's age
 *                   example: 25
 *                 gender:
 *                   type: string
 *                   description: The patient's gender
 *                   example: man
 *       400:
 *         description: Invalid patient ID or validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /api/patients/update:
 *   put:
 *     summary: Update patient information
 *     description: This endpoint allows authenticated users to update the details of a patient. All fields are optional, so only the fields that are provided in the request body will be updated.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated first name of the patient
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The updated last name of the patient
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The updated email of the patient
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The updated password for the patient
 *                 example: securepassword123
 *               contact_number:
 *                 type: string
 *                 description: The updated contact number of the patient
 *                 example: +1234567890
 *               age:
 *                 type: number
 *                 description: The updated age of the patient (must be between 18 and 100)
 *                 example: 30
 *               gender:
 *                 type: string
 *                 description: |
 *                   The updated gender of the patient. Allowed values:
 *                   - man
 *                   - woman
 *                 example: man
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Patient updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/patients/logout:
 *   post:
 *     summary: Logout a patient
 *     description: This endpoint logs out a patient.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient logged out successfully
 *       401:
 *         description: Unauthorized, patient not logged in
 *
 */
/**
 * @swagger
 * /api/patient/remove:
 *   delete:
 *     summary: Remove a patient
 *     description: This endpoint removes a patient's account.
 *     tags: [Patient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient removed successfully
 *       401:
 *         description: Unauthorized, patient not logged in
 */
