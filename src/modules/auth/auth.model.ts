import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["active", "suspended", "deleted"],
        default: "active"
    },
    lastLoginAt: {
        type: Date,
        default: null
    },

    passwordResetToken: {
        type: String,
        default: null
    },
    passwordResetExpires: {
        type: Date,
        default: null
    },
    refreshToken: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
            expiresAt: {
                type: Date
            }
        }
    ]
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema)