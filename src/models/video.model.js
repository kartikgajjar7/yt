import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema = new Schema(
    {
        videofile: {
            type: String, //cloudnary url,
            required: [true, "Videofile is required"],
        },
        thumbnail: {
            type: String,
            required: [true, "thumbnail is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        duration: {
            type: Number,
            required: [true, "Duration is required"],
        },
        views: {
            type: Number,
            default: 0,
        },
        ispublished: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

VideoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", VideoSchema);
