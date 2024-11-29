/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management and authentication
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
 * /api/payment:
 *   post:
 *     summary: Process a payment for an appointment
 *     description: Allows a patient to pay for an appointment. The payment will be deducted from the patient's wallet and credited to the doctor's wallet.
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: integer
 *                 description: The ID of the patient.
 *               doctorId:
 *                 type: integer
 *                 description: The ID of the doctor.
 *               appointmentId:
 *                 type: integer
 *                 description: The ID of the appointment.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: Bad request. The payment was not processed due to an error.
 *       401:
 *         description: Unauthorized. User must be authenticated as a patient.
 *       403:
 *         description: Forbidden. User does not have the correct role (patient).
 *       500:
 *         description: Internal server error. The payment process failed.
 */

/**
 * @swagger
 * /api/payment/track-transactions:
 *   get:
 *     summary: Get transaction history for patient or doctor
 *     description: Retrieves the wallet history of a patient or doctor based on their role. The wallet history will show the balance changes for the selected user.
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet history retrieved successfully
 *       400:
 *         description: Bad request. Missing patientId or doctorId.
 *       401:
 *         description: Unauthorized. User must be authenticated.
 *       403:
 *         description: Forbidden. User does not have the correct role (patient or doctor).
 *       500:
 *         description: Internal server error. The wallet history retrieval failed.
 */
