//models/BlogPost.ts

import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  description: string;
  author: string;
  categories: string[];
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogPost = models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema);
export default BlogPost;