/**
 * @swagger
 * tags:
 *   name: Hospital
 *   description: Operations for managing hospitals
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
 * /api/hospitals/create:
 *   post:
 *     summary: Create a new hospital
 *     description: Create a hospital. Requires admin role.
 *     tags: [Hospital]
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
 *                 description: Name of the hospital
 *               location:
 *                 type: string
 *                 description: Location of the hospital
 *               contactNumber:
 *                 type: string
 *                 description: Contact number of the hospital
 *               email:
 *                 type: string
 *                 description: Email of the hospital
 *     responses:
 *       201:
 *         description: Hospital created successfully
 *       400:
 *         description: Validation error or insufficient permissions
 */

/**
 * @swagger
 * /api/hospitals:
 *   get:
 *     summary: Get all hospitals
 *     description: Retrieve a list of all hospitals.
 *     tags: [Hospital]
 *     responses:
 *       200:
 *         description: List of hospitals retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *                   contactNumber:
 *                     type: string
 *                   email:
 *                     type: string
 *       400:
 *         description: Failed to retrieve hospitals
 */

/**
 * @swagger
 * /api/hospitals/update/{hospitalId}:
 *   put:
 *     summary: Update hospital details
 *     description: Update the information of an existing hospital. Requires admin role.
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the hospital to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the hospital
 *               location:
 *                 type: string
 *                 description: Updated location of the hospital
 *               contactNumber:
 *                 type: string
 *                 description: Updated contact number of the hospital
 *               email:
 *                 type: string
 *                 description: Updated email of the hospital
 *     responses:
 *       200:
 *         description: Hospital updated successfully
 *       400:
 *         description: Validation error or insufficient permissions
 *       404:
 *         description: Hospital not found
 */

/**
 * @swagger
 * /api/hospitals/remove/{hospitalId}:
 *   delete:
 *     summary: Remove a hospital by ID
 *     description: Delete a hospital by ID. Requires admin role.
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the hospital to delete
 *     responses:
 *       200:
 *         description: Hospital removed successfully
 *       400:
 *         description: Validation error or insufficient permissions
 */

/**
 * @swagger
 * /api/hospitals/add-to-dr/{doctorId}:
 *   post:
 *     summary: Add hospitals to a doctor
 *     description: Associate hospitals with a doctor. Requires admin or doctor role.
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the doctor to whom hospitals are being added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array of hospital IDs to add to the doctor
 *     responses:
 *       201:
 *         description: Hospitals added to doctor successfully
 *       400:
 *         description: Validation error or insufficient permissions
 */

/**
 * @swagger
 * /api/hospitals/remove-from-dr/{doctorId}/hospital/{hospitalId}:
 *   delete:
 *     summary: Remove a hospital from a doctor
 *     description: Disassociate a hospital from a doctor. Requires admin or doctor role.
 *     tags: [Hospital]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the doctor
 *       - in: path
 *         name: hospitalId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the hospital to remove from the doctor
 *     responses:
 *       200:
 *         description: Hospital removed from doctor successfully
 *       400:
 *         description: Validation error or insufficient permissions
 */
