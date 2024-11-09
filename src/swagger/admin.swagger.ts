/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management operations
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
 * /api/admins/register:
 *   post:
 *     summary: Register a new admin
 *     description: This endpoint allows admins to register.
 *     tags: [Admin]
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
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Login a admin
 *     description: This endpoint allows an admin to log in and receive a token.
 *     tags: [Admin]
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
 *                 description: The email of the admin
 *               password:
 *                 type: string
 *                 description: The password of the admin
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       401:
 *         description: Unauthorized, invalid credentials
 */

/**
 * @swagger
 * /api/admins:
 *   get:
 *     summary: Retrieve a list of admins
 *     description: This endpoint allows admins to fetch admins.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrive list of admins.
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/doctors/profile:
 *   get:
 *     summary: Get admin profile by it's owner
 *     description: This endpoint retrieves the details of an admin by it's owner.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin details retrieved successfully
 *       404:
 *         description: Admin not found
 */

/**
 * @swagger
 * /api/admins/update:
 *   put:
 *     summary: Update admin details
 *     description: This endpoint allows admin to update their details. All fields are optional, so only the fields provided in the request body will be updated.
 *     tags: [Admin]
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
 *                 description: The updated email of the admin
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: The updated password for the admin's account
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Admin details updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/admins/logout:
 *   post:
 *     summary: Logout an admin
 *     description: This endpoint allows a admin to log out and invalidate their token.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin logged out successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */

/**
 * @swagger
 * /api/admins/remove:
 *   delete:
 *     summary: Remove an admin
 *     description: This endpoint allows admin to remove their account.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Admin removed successfully
 *       401:
 *         description: Unauthorized, user not authenticated
 */
