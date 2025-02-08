import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.category) {
      return NextResponse.json(
        { error: "Title, content and category are required" },
        { status: 400 }
      );
    }

    // Here you would typically save to your database
    // For now, we'll just return success
    return NextResponse.json(
      { message: "Blog post created successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}