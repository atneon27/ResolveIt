import mongoose from "mongoose";
import { DATABASE_URL } from "../secret";

mongoose.connect(`${DATABASE_URL}resolveit`);

const StudentsSchema = new mongoose.Schema({
    reg_no: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    HostelDetails: {
        currHostel: {
            type: String,
            required: true
        },
        currWing: {
            type: String,
            required: true
        },
        currRoom: {
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

const AdminSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
       type: String,
       required: true
    },
    lastname: {
       type: String,
       required: true 
    },
    dpt_name: {
        type: String,
        required: true
    },
    assignedHostel: {
        type: String,
        required: true
    }
});
export const Admins = mongoose.model('Admins', AdminSchema);

const WorkerSchema = new mongoose.Schema({
    worker_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    assignedHostel: {
        type: String,
        default: null
    }
});
export const Workers = mongoose.model('Workers', WorkerSchema);

const ComplainSchema = new mongoose.Schema({
    raisedBy: {
        type: String,
        required: true
    },
    raisedFor: {
        type: String,
        required: true
    },
    raisedOn: {
        type: Date,
        default: Date.now
    },
    body: {
        currHostel: {
            type: String,
            required: true
        },
        currWing: {
            type: String,
            required: true
        },
        currRoom: {
            type: String,
            required: true,
        },
        complainSubject: {
            type: String,
            required: true
        },
        complainBody: {
            type: String,
            required: true
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
