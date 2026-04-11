import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
    name: string;
    phone: string;
    businessType: string;
    budget: string;
    message: string;
    status: 'Pending' | 'Contacted' | 'Closed';
    createdAt: Date;
}

const LeadSchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    businessType: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ['Pending', 'Contacted', 'Closed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
