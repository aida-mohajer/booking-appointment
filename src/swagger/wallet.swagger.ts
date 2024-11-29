/**
 * @swagger
 * tags:
 *   name: Wallet
 *   description: Wallet management operations
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
 * /api/wallet/create-patient-wallet:
 *   post:
 *     summary: Create a patient wallet
 *     description: Creates a wallet for the authenticated patient.
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Patient wallet created successfully
 *       400:
 *         description: Missing patient ID or invalid input
 */

/**
 * @swagger
 * /api/wallet/create-doctor-wallet:
 *   post:
 *     summary: Create a doctor wallet
 *     description: Creates a wallet for the authenticated doctor.
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Doctor wallet created successfully
 *       400:
 *         description: Missing doctor ID or invalid input
 */

/**
 * @swagger
 * /api/wallet/charge:
 *   post:
 *     summary: Charge a patient wallet
 *     description: Adds balance to a patient's wallet. Only available to authenticated patients.
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *                 description: The ID of the patient
 *                 example: 101
 *               amount:
 *                 type: number
 *                 description: The amount to add to the wallet
 *                 example: 100
 *     responses:
 *       200:
 *         description: Wallet charged successfully
 *       400:
 *         description: Validation error or insufficient input
 */

/**
 * @swagger
 * /api/wallet/get-patient-wallet:
 *   get:
 *     summary: Get patient wallet
 *     description: Retrieve the wallet details for the currently authenticated patient.
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet details retrieved successfully
 *       400:
 *         description: Patient ID is required
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Wallet not found
 */

/**
 * @swagger
 * /api/wallet/get-dr-wallet:
 *   get:
 *     summary: Get doctor wallet
 *     description: Retrieve the wallet details for the currently authenticated doctor.
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet details retrieved successfully
 *       400:
 *         description: Patient ID is required
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Wallet not found
 */
