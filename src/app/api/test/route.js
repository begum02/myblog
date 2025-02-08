import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import Post from '@/models/Post';

export async function GET(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const slug = searchParams.get('slug');

    console.log('GET request received with type:', type, 'and slug:', slug);

    if (type === 'projects') {
      const projects = await Project.find({});
      return NextResponse.json({ success: true, data: projects });
    } else if (type === 'posts') {
      if (slug) {
        const post = await Post.findOne({ slug });
        if (!post) {
          console.log('Post not found for slug:', slug);
          return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: post });
      } else {
        const posts = await Post.find({});
        return NextResponse.json({ success: true, data: posts });
      }
    } else {
      return NextResponse.json({ success: false, error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('GET request error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const formData = await request.formData();
    const type = formData.get('type');

    if (type === 'project') {
      const image = formData.get('image');
      const imagePath = path.join(process.cwd(), 'public', 'uploads', image.name);
      const imageStream = fs.createWriteStream(imagePath);
      imageStream.write(Buffer.from(await image.arrayBuffer()));
      imageStream.end();

      const project = await Project.create({
        title: formData.get('title'),
        summary: formData.get('summary'),
        githubLink: formData.get('githubLink'),
        image: `/uploads/${image.name}`,
      });

      return NextResponse.json({ success: true, data: project }, { status: 201 });
    } else if (type === 'post') {
      if (!formData.get('title') || !formData.get('content') || !formData.get('category')) {
        return NextResponse.json(
          { error: "Title, content, and category are required" },
          { status: 400 }
        );
      }

      const post = await Post.create({
        title: formData.get('title'),
        content: formData.get('content'),
        summary: formData.get('summary'),
        category: formData.get('category'),
        slug: formData.get('title')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      });

      return NextResponse.json({ success: true, data: post }, { status: 201 });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('POST request error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
