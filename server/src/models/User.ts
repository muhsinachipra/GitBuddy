import mongoose, { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    githubId: string;
    avatarUrl: string;
    location?: string;
    bio?: string;
    blog?: string;
    followers: string[];
    following: string[];
    friends: string[];
    publicRepos: number; // Store the number of public repos
    publicGists: number; // Store the number of public gists
    joined: Date;
    isDeleted: boolean;
}

const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        githubId: { type: String, required: true, unique: true },
        avatarUrl: { type: String, required: true },
        location: { type: String },
        bio: { type: String },
        blog: { type: String },
        followers: [{ type: String }],
        following: [{ type: String }],
        friends: [{ type: String }],
        publicRepos: { type: Number, default: 0 }, // Add the publicRepos field
        publicGists: { type: Number, default: 0 }, // Add the publicGists 
        joined: { type: Date },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const User = model<IUser>('User', UserSchema);
export default User;
