import mongoose from "mongoose";
import DATABASE_URL from "./secret";

mongoose.connect(`${DATABASE_URL}resolveit`);

const ComplainSchema = new mongoose.Schema({
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
