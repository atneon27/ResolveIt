import mongoose from "mongoose";
import { DATABASE_URL } from "../secret";

mongoose.connect(`${DATABASE_URL}resolveit`);

const StudentsSchema = new mongoose.Schema({
    regno: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    details: {
        currentHostel: {
            type: String,
            required: true
        },
        currentWing: {
            type: String,
            required: true
        },
        currentRoom: {
            type: String,
            required: true
        }
    },
    activeComplains: {
        type: Array<String>,
        default: null
    },
    resolvedComplains: {
        type: Array<String>,
        default: null
    }
});

export const Students = mongoose.model('Students', StudentsSchema);

const ComplainSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true
    },
    raisedBy: {
        type: String,
        required: true
    },
    raisedOn: {
        type: Date,
        default: Date.now
    },
    body: {
        hostel: {
            type: String,
            required: true,
        },
        wing: {
            type: String,
            required: true,
        },
        room: {
            type: String,
            required: true,
        },
        complainSubject: {
            type: String,
            required: true,
        },
        complainBody: {
            type: String,
            required: true,
        }
    },
    isResolved: {
        type: Boolean,
        default: false,
    },
    resolvedBy: {
        type: String,
        default: null,
    },
    resolvedOn: {
        type: Date,
        default: null,
    }
});

export const Complain = mongoose.model('Complain', ComplainSchema);
