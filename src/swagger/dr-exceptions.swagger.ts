/**
 * @swagger
 * /api/dr-exceptions/add/hospital/{hospitalId}:
 *   post:
 *     summary: Add exceptions for a hospital
 *     description: This endpoint allows doctors to add exceptions related to a specific hospital.
 *     tags: [Doctor Exceptions]
 *     security:
 *       - bearerAuth: []  # Assuming Bearer token for authentication
 *     parameters:
 *       - name: hospitalId
 *         in: path
 *         required: true
 *         description: ID of the hospital to which the exceptions are being added
 *         schema:
 *           type: string  # Adjust according to your data type for hospitalId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 example: 11:00
 *               endTime:
 *                 type: string
 *                 example: 12:00
 *               startDate:
 *                 type: string
 *                 example: 2024-11-17
 *               endDate:
 *                 type: string
 *                 example: 2024-11-30
 
 *     responses:
 *       201:
 *         description: Exception added successfully
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, insufficient role
 */

/**
 * @swagger
 * /api/dr-exceptions/hospital/{hospitalId}/doctor/{doctorId}:
 *   get:
 *     summary: Retrieve exceptions for a hospital
 *     description: This endpoint allows doctors to retrieve all exceptions related to a specific hospital.
 *     tags: [Doctor Exceptions]
//  *     security:
//  *       - bearerAuth: []  # Assuming Bearer token for authentication
 *     parameters:
 *       - name: hospitalId
 *         in: path
 *         required: true
 *         description: ID of the hospital to retrieve exceptions for
 *         schema:
 *           type: string  # Adjust according to your data type for hospitalId
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor to retrieve exceptions for
 *         schema:
 *           type: string  # Adjust according to your data type for doctorId
 *     responses:
 *       200:
 *         description: Exceptions retrieved successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, insufficient role
 *       404:
 *         description: Hospital not found
 */

/**
 * @swagger
 * /api/dr-exceptions/remove/{exceptionId}:
 *   delete:
 *     summary: Remove an exception
 *     description: This endpoint allows doctors to remove an exception by its ID.
 *     tags: [Doctor Exceptions]
 *     security:
 *       - bearerAuth: []  # Assuming Bearer token for authentication
 *     parameters:
 *       - name: exceptionId
 *         in: path
 *         required: true
 *         description: ID of the exception to remove
 *         schema:
 *           type: string  # Adjust according to your data type for exceptionId
 *     responses:
 *       204:
 *         description: Exception removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       403:
 *         description: Forbidden, insufficient role
 *       404:
 *         description: Exception not found
 */
