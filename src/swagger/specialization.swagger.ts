/**
 * @swagger
 * tags:
 *   name: Specialization
 *   description: Specialization management operations
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
 * /api/specializations/add/{attrId}:
 *   post:
 *     summary: Add a new specialization
 *     description: This endpoint allows authenticated users to add a new specialization associated with the specified attribute ID.
 *     tags: [Specialization]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: ID of the attribute to which the specialization will be added
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 description: The name of the specialization to add
 *     responses:
 *       201:
 *         description: Specialization added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/specializations/{attrId}:
 *   get:
 *     summary: Get specializations by attribute ID
 *     description: This endpoint retrieves specializations associated with the specified attribute ID.
 *     tags: [Specialization]
 *     parameters:
 *       - name: attrId
 *         in: path
 *         required: true
 *         description: ID of the attribute to retrieve associated specializations
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Specializations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   specializationId:
 *                     type: string
 *                     description: The ID of the specialization
 *                   value:
 *                     type: string
 *                     description: The name of the specialization
 *       404:
 *         description: No specializations found for the specified attribute ID
 */

/**
 * @swagger
 * /api/specializations/remove/{specializationId}:
 *   delete:
 *     summary: Remove a specialization
 *     description: This endpoint allows authenticated users to remove a specialization by its ID.
 *     tags: [Specialization]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: specializationId
 *         in: path
 *         required: true
 *         description: ID of the specialization to remove
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Specialization removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Specialization not found
 */
/**
 * @swagger
 * /api/specializations/add-to-dr/{doctorId}:
 *   post:
 *     summary: Add specializations to a doctor
 *     description: Allows a doctor or an admin to add specializations to a specific doctor by doctor ID. Requires authentication.
 *     tags: [Specialization]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor to add specializations
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specializationIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                   description: List of specialization IDs to be added to the doctor
 *     responses:
 *       201:
 *         description: Specializations added to doctor successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Doctor not found
 */

/**
 * @swagger
 * /api/specializations/remove-from-dr/{doctorId}/specialization/{specializationId}:
 *   delete:
 *     summary: Remove a specialization from a doctor
 *     description: Allows authenticated users to remove a specialization from a specific doctor by doctor ID and specialization ID.
 *     tags: [Specialization]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         description: ID of the doctor from whom to remove the specialization
 *         schema:
 *           type: number
 *       - name: specializationId
 *         in: path
 *         required: true
 *         description: ID of the specialization to remove from the doctor
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Specialization removed from doctor successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Specialization or doctor not found
 */
