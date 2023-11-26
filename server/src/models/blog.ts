import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog title is required"],
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});

BlogSchema.index({ _id: 1, user: 1 }, { unique: true })

const Blog = mongoose.model('Blog', BlogSchema);

export default Blog
