const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Enter a title for the post"],
    },
    content: {
        type: String,
        required: [true, "Post needs content"],
    },
    image: String,
    author: { type: Schema.Types.ObjectId, ref: "User", required: [true] },
    published: { type: Boolean },
    createdAt: { type: Date, default: new Date() },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
