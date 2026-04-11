import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
    type: 'click_quote' | 'submission';
    package?: 'starter' | 'growth' | 'premium' | 'custom';
    wrapType?: string;
    carsCount?: number;
    userName?: string;
    phoneNumber?: string;
    businessType?: string;
    userAgent?: string;
    timestamp: Date;
}

const AnalyticsSchema: Schema = new Schema({
    type: { type: String, required: true, enum: ['click_quote', 'submission'] },
    package: { type: String, enum: ['starter', 'growth', 'premium', 'custom'] },
    wrapType: { type: String },
    carsCount: { type: Number },
    userName: { type: String },
    phoneNumber: { type: String },
    businessType: { type: String },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now }
});

// Index for fast time-range queries
AnalyticsSchema.index({ type: 1, timestamp: -1 });

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
