import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICampaign extends Document {
    client: string;
    type: string;
    category: string;
    desc: string;
    imageUrl: string;
    publicId: string;
    createdAt: Date;
    updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>(
    {
        client: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        desc: { type: String, required: true, trim: true },
        imageUrl: { type: String, required: true, trim: true },
        publicId: { type: String, required: true, trim: true, unique: true },
    },
    {
        timestamps: true,
    }
);

CampaignSchema.index({ createdAt: -1 });

const Campaign =
    (mongoose.models.Campaign as Model<ICampaign>) ||
    mongoose.model<ICampaign>('Campaign', CampaignSchema);

export default Campaign;
