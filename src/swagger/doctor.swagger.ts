// /**
//  * @swagger
//  * /api/doctors:
//  *   get:
//  *     summary: Retrieve a list of doctors
//  *     description: This endpoint retrieves a list of doctors with optional filtering by specialization IDs, city ID, and searching by doctor name. Supports pagination and sorting.
//  *     tags: [Doctors]
//  *     parameters:
//  *       - name: page
//  *         in: query
//  *         description: Page number for pagination
//  *         required: false
//  *         schema:
//  *           type: integer
//  *           default: 1
//  *       - name: limit
//  *         in: query
//  *         description: Number of products per page
//  *         required: false
//  *         schema:
//  *           type: integer
//  *           default: 10
//  *       - name: sortBy
//  *         in: query
//  *         required: false
//  *         description: Sorting options (e.g., "oldest", "newest", "highestRated", "lowestRated").
//  *         schema:
//  *           type: string
//  *           enum:
//  *             - oldest
//  *             - newest
//  *             - highestRated
//  *             - lowestRated
//  *       - name: specializationIds
//  *         in: query
//  *         required: false
//  *         description: Comma-separated list of specialization IDs to filter doctors.
//  *         schema:
//  *           type: array
//  *           items:
//  *             type: string
//  *           example: ["specId1", "specId2"]
//  *       - name: cityId
//  *         in: query
//  *         required: false
//  *         description: ID of the city to filter doctors.
//  *         schema:
//  *           type: string
//  *           example: "123"
//  *       - name: doctorName
//  *         in: query
//  *         required: false
//  *         description: Filter doctors by name.
//  *         schema:
//  *           type: string
//  *           example: "John"
//  *
//  *     responses:
//  *       '200':
//  *         description: Successfully retrieved list of doctors.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Doctors retrieved successfully"
//  *                 response:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       id:
//  *                         type: string
//  *                         example: "doctorId123"
//  *                       name:
//  *                         type: string
//  *                         example: "Dr. John Doe"
//  *                       rating:
//  *                         type: number
//  *                         format: float
//  *                         example: 4.5
//  *                       lastName:
//  *                         type: string
//  *                         example: "Doe"
//  *                       degree:
//  *                         type: string
//  *                         example: "Cardiology"
//  *                       city:
//  *                         type: string
//  *                         example: "New York"
//  *                       imageName:
//  *                         type: string
//  *                         nullable: true
//  *                         example : "image.png"
//  *
//  *       '400':
//  *         description : Invalid input data or validation error.
//  *       '404':
//  *         description : No doctors found matching the criteria.
//  */

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
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The password for the doctor
 *                 example: securepassword123
 *               contact_number:
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
 *               role:
 *                 type: string
 *                 enum: ["doctor", "admin"]
 *                 description: The role of the user (default is doctor)
 *                 example: "doctor"
 *               degree:
 *                 type: string
 *                 enum: ["specialist", "super specialist"]
 *                 description: The degree of the doctor
 *                 example: "specialist"
 *               city:
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
 *                 description: The email of the doctor
 *               password:
 *                 type: string
 *                 description: The password of the doctor
 *     responses:
 *       200:
 *         description: Doctor logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the logged-in doctor
 *       401:
 *         description: Unauthorized, invalid credentials
 */

/**
 * @swagger
 * /api/doctors/{doctorId}:
 *   get:
 *     summary: Get doctor details by ID
 *     description: This endpoint retrieves the details of a doctor associated with the specified ID.
 *     tags: [Doctor]
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctorId:
 *                   type: string
 *                   description: The ID of the doctor
 *                 name:
 *                   type: string
 *                   description: The name of the doctor
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email of the doctor
 *                 specializationId:
 *                   type: string
 *                   description: The specialization ID of the doctor
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get a list of doctors
 *     description: This endpoint retrieves a list of doctors with optional pagination, sorting, filtering by specialization, filtering by city, and searching by name.
 *     tags: [Doctor]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination (default is 1)
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of doctors to retrieve per page (default is 10)
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: sortBy
 *         in: query
 *         required: false
 *         description: |
 *           Sort the results by specific criteria.
 *           Options: oldest, newest, highestRated, lowestRated
 *         schema:
 *           type: string
 *           enum: [oldest, newest, highestRated, lowestRated]
 *       - name: specializationIds
 *         in: query
 *         required: false
 *         description: Filter doctors by specialization IDs (comma-separated)
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - name: cityId
 *         in: query
 *         required: false
 *         description: Filter doctors by city ID
 *         schema:
 *           type: string
 *       - name: doctorName
 *         in: query
 *         required: false
 *         description: Search term to filter doctors by name or last name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating retrieval status
 *                 response:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the doctor
 *                       name:
 *                         type: string
 *                         description: The name of the doctor
 *                       lastName:
 *                         type: string
 *                         description: The last name of the doctor
 *                       degree:
 *                         type: string
 *                         description: The degree of the doctor
 *                       rating:
 *                         type: number
 *                         format: float
 *                         description: The rating of the doctor
 *                       city:
 *                         type: string
 *                         description: The city where the doctor practices
 *                       imageName:
 *                         type: string
 *                         description: The image name of the doctor
 *                       specializations:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             value:
 *                               type: string
 *                               description: The specialization value
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                 totalDoctors:
 *                   type: integer
 *                   description: Total number of doctors retrieved
 *       204:
 *         description: No doctors found matching the search criteria
 *       400:
 *         description: Validation error, e.g., invalid City ID
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
 *                 example: john.doe@example.com
 *               address:
 *                 type: string
 *                 description: The updated address of the doctor
 *                 example: 123 Main St, Springfield
 *               password:
 *                 type: string
 *                 description: The updated password for the doctor's account
 *                 example: newpassword123
 *               contact_number:
 *                 type: string
 *                 description: The updated contact number of the doctor
 *                 example: +1234567890
 *               bio:
 *                 type: string
 *                 description: The updated biography or professional summary of the doctor
 *                 example: Dr. John Doe is a specialist in cardiology with over 10 years of experience.
 *               city:
 *                 type: number
 *                 description: The ID of the updated city where the doctor practices
 *                 example: 1
 *     responses:
 *       200:
 *         description: Doctor details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Doctor details updated successfully
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
 * /api/doctors/remove:
 *   delete:
 *     summary: Remove a doctor
 *     description: This endpoint allows authenticated users to remove their doctor profile.
 *     tags: [Doctor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Doctor removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */
