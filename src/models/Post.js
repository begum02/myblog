import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  category: { 
    type: String, 
    default: 'Other',  // Remove required: true since we have a default
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  subtitles: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  comments: { type: [String], default: [] }
}, {
  timestamps: true
});

// Keep your existing pre-save middleware
BlogPostSchema.pre('save', function(next) {
  if (this.content) {
    const regex = /<h[1-3]>(.*?)<\/h[1-3]>/g;
    this.subtitles = [];
    let match;
    while ((match = regex.exec(this.content)) !== null) {
      this.subtitles.push(match[1].trim());
    }
  }
  next();
});

// Fix model name consistency - use 'Post' instead of 'BlogPost'
export default mongoose.models.Post || mongoose.model('Post', BlogPostSchema);
