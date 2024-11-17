/**
 * @swagger
 * tags:
 *   name: Doctor
 *   description: Doctor management operations
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
 * /api/doctors/register:
 *   post:
 *     summary: Register a new doctor
 *     description: This endpoint allows users to register a new doctor.
 *     tags: [Doctor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the doctor
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The last name of the doctor
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the doctor
 *                 example: john.doe@gmail.com
 *               password:
 *                 type: string
 *                 description: The password for the doctor
 *                 example: securepassword123
 *               contactNumber:
 *                 type: string
 *                 description: The contact number of the doctor
 *                 example: "+1234567890"
 *               HIN:
 *                 type: integer
 *                 description: The Health Identification Number of the doctor
 *                 example: 1234
 *               bio:
 *                 type: string
 *                 description: A short biography of the doctor
 *                 example: "Experienced cardiologist with a passion for patient care."
 *               address:
 *                 type: string
 *                 description: The address of the doctor
 *                 example: "123 Main St, City, Country"
 *               degree:
 *                 type: string
 *                 enum: ["specialist", "super specialist"]
 *                 description: The degree of the doctor
 *                 example: "specialist"
 *               cityId:
 *                 type: integer
 *                 description: The city ID where the doctor practices
 *                 example: 1
 *     responses:
 *       201:
 *         description: Doctor registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/doctors/login:
 *   post:
 *     summary: Login a doctor
 *     description: This endpoint allows a doctor to log in and receive a token.
 *     tags: [Doctor]
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
 *                 example: john.doe@gmail.com
 *                 description: The email of the doctor
 *               password:
 *                 type: string
 *                 description: The password of the doctor
 *     responses:
 *       200:
 *         description: Doctor logged in successfully
 *       401:
 *         description: Unauthorized, invalid credentials
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Retrieve a list of doctors based on filter criteria
 *     description: This endpoint allows users to fetch doctors based on various filters such as sorting, specialization, hospital and city.
 *     tags: [Doctor]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: The sorting criterion for the doctors list.
 *         schema:
 *           type: string
 *           enum: [oldest, newest, lowestRated, highestRated]
 *           example: "newest"
 *       - in: query
 *         name: specializations
 *         required: false
 *         description: A comma-separated list of specializations to filter the doctors by.
 *         schema:
 *           type: string
 *           example: "Dermatology,Cardiology"
 *       - in: query
 *         name: city
 *         required: false
 *         description: The name of the city where the doctors are located.
 *         schema:
 *           type: string
 *           enum: [Tehran, Karaj, Shiraz]
 *           example: "Tehran"
 *       - in: query
 *         name: hospital
 *         required: false
 *         description: The name of the hospital where the doctors are located.
 *         schema:
 *           type: string
 *           enum: [Mehr hospital, Sasan hospital , Milad hospital , Nikan hospital , Maryam hospital]
 *       - in: query
 *         name: page
 *         required: true
 *         description: The page number to retrieve (pagination).
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: true
 *         description: The number of doctors to return per page (pagination).
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *       - in: query
 *         name: name
 *         required: false
 *         description: Search term to filter doctors by name.
 *         schema:
 *           type: string
 *           example: "John"
 *     responses:
 *       200:
 *         description: A list of doctors that match the specified filters.
 *       400:
 *         description: Validation error for query parameters.
 */

/**
 * @swagger
 * /api/doctors/get-dr/{doctorId}:
 *   get:
 *     summary: Get doctor details by ID
 *     description: This endpoint retrieves the details of a doctor associated with the specified ID.
 *     tags: [Doctor]
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: false
 *         description: ID of the doctor to retrieve
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /api/doctors/profile:
 *   get:
 *     summary: Get doctor profile by doctor
 *     description: This endpoint retrieves the details of a doctor by doctor.
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /api/doctors/update:
 *   put:
 *     summary: Update doctor details
 *     description: This endpoint allows authenticated doctors to update their details. All fields are optional, so only the fields provided in the request body will be updated.
 *     tags: [Doctor]
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
 *                 description: The updated first name of the doctor
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: The updated last name of the doctor
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The updated email of the doctor
 *                 example: john.doe@gmail.com
 *               address:
 *                 type: string
 *                 description: The updated address of the doctor
 *                 example: 123 Main St, Springfield
 *               password:
 *                 type: string
 *                 description: The updated password for the doctor's account
 *                 example: newpassword123
 *               contactNumber:
 *                 type: string
 *                 description: The updated contact number of the doctor
 *                 example: +1234567890
 *               bio:
 *                 type: string
 *                 description: The updated biography or professional summary of the doctor
 *                 example: Dr. John Doe is a specialist in cardiology with over 10 years of experience.
 *               cityId:
 *                 type: number
 *                 description: The ID of the updated city where the doctor practices
 *                 example: 1
 *     responses:
 *       200:
 *         description: Doctor details updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/doctors/logout:
 *   post:
 *     summary: Logout a doctor
 *     description: This endpoint allows a doctor to log out and invalidate their token.
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor logged out successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/doctors/remove/{doctorId}:
 *   delete:
 *     summary: Remove a doctor
 *     description: This endpoint allows admin & authenticated users to remove their doctor profile.
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Doctor removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */
