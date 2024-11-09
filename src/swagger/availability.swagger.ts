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
 * /api/availabilities/create/{doctorId}:
 *   post:
 *     summary: Create a new availability
 *     description: This endpoint allows an admin or doctor to create a new availability for a specific doctor. The available date must be in the format "YYYY-MM-DD HH:MM" and optionally include an availability status.
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: false
 *         description: The ID of the doctor for whom availability is being created (optional)
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
 *               availableDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time for the availability in the format "YYYY-MM-DD HH:MM"
 *                 example: "2024-05-15 14:30"
 *     responses:
 *       201:
 *         description: Availability created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Availability created successfully"
 *                 response:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     doctorId:
 *                       type: integer
 *                       example: 123
 *                     availableDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-05-15 14:30"
 *                     isAvailable:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Validation error (e.g., incorrect date format or missing required fields)
 *       404:
 *         description: Doctor not found
 *       403:
 *         description: Unauthorized access (user does not have the required role)
 */

/**
 * @swagger
 * /api/availabilities/by-dr/{doctorId}:
 *   get:
 *     summary: Get availabilities by doctor or admin
 *     description: |
 *       This endpoint retrieves the availability slots of a specific doctor.
 *     tags: [Availability]
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         description: The ID of the doctor whose availability is being retrieved. If not provided, it defaults to the authenticated user's doctor ID (for Admin role).
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: startDate
 *         in: query
 *         description: Startdate to filter.
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-11-02
 *       - name: endDate
 *         in: query
 *         description: EndDate to filter.
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-11-30
 *       - name: isAvailable
 *         in: query
 *         description: Predefined values (true,false).
 *         required: false
 *         schema:
 *           type: boolean
 *           enum: [true,false]
 *           example: true
 *       - name: limit
 *         in: query
 *         description: The number of results to return per page.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: page
 *         in: query
 *         description: The page number for pagination.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the doctor's availabilities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       date:
 *                         type: string
 *                         example: "2024-09-20T10:00:00Z"
 *                       status:
 *                         type: string
 *                         example: "available"
 *       400:
 *         description: Bad request due to invalid query parameters or missing required fields (e.g., year, month, day).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid query parameter(s): year"
 *       401:
 *         description: Unauthorized access. User must be authenticated.
 *       403:
 *         description: Forbidden. User must have the appropriate role.
 *       404:
 *         description: Doctor not found or availabilities could not be fetched.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/availabilities/{doctorId}:
 *   get:
 *     summary: Get availabilities by users
 *     description: |
 *       This endpoint retrieves the availability slots of a specific doctor.
 *     tags: [Availability]
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         description: The ID of the doctor whose availability is being retrieved.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: startDate
 *         in: query
 *         description: Startdate to filter.
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-11-02
 *       - name: endDate
 *         in: query
 *         description: EndDate to filter.
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-11-30
 *       - name: isAvailable
 *         in: query
 *         description: Predefined values (true,false).
 *         required: false
 *         schema:
 *           type: boolean
 *           enum: [true,false]
 *           example: true
 *       - name: limit
 *         in: query
 *         description: The number of results to return per page.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: page
 *         in: query
 *         description: The page number for pagination.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the doctor's availabilities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       date:
 *                         type: string
 *                         example: "2024-09-20T10:00:00Z"
 *                       status:
 *                         type: string
 *                         example: "available"
 *       400:
 *         description: Bad request due to invalid query parameters or missing required fields (e.g., year, month, day).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid query parameter(s): year"
 *       401:
 *         description: Unauthorized access. User must be authenticated.
 *       403:
 *         description: Forbidden. User must have the appropriate role.
 *       404:
 *         description: Doctor not found or availabilities could not be fetched.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /api/availabilities/remove/{availabilityId}/dr/{doctorId}:
 *   delete:
 *     summary: Remove an availability
 *     description: This endpoint allows admins & authenticated users to remove an availability by its ID.
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []  # Assuming you are using Bearer token for authentication
 *     parameters:
 *       - name: availabilityId
 *         in: path
 *         required: true
 *         description: ID of the availability to remove
 *         schema:
 *           type: number
 *       - name: doctorId
 *         in: path
 *         required: false
 *         description: ID of the availability to remove
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Availability removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Availability not found
 */
