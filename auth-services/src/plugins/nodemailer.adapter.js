import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

export class NodemailerAdapter {
    static createTransport() {
        return nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: config.smtpEmail,
                pass: config.smtpPassword,
            }
        });
    }
}