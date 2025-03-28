import { mailClient, sender } from "./mailtrap.js";
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } from "./emailTemplates.js";


export const sendVerivificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {

        const response = await mailClient.send({
            from: sender,
            to: recipient,
            subject: "Account Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Verification Account",
        });
        console.log("Verification email sent successfully", response);

    } catch (error) {

        console.error("Error sending verification", error);
        throw new Error("Failed to send verification email", error);
    }
};


export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    try {

        const response = await mailClient.send({
            from: sender,
            to: recipient,
            template_uuid: "e88f17fb-63fb-4514-a3c8-fb6a22210d26",
            template_variables: {
                "company_info_name": "mern auth",
                "name": name
            }
        });

        console.log("Welcome email sent successfully", response);

    } catch (error) {

        console.error("Error sending welcome email", error);
        throw new Error("Failed to send welcome email", error);
    }
};


export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    try {

        const response = await mailClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
        console.log("Password reset email sent successfully", response);

    } catch (error) {

        console.error("Error sending password reset email", error);
        throw new Error("Failed to send password reset email", error);
    }
}