import { NextRequest, NextResponse } from 'next/server';
import { mockOrders } from '@/lib/mockData';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Filter orders by user ID
    const userOrders = mockOrders.filter(order => order.userId === decoded.userId);
    
    return NextResponse.json(userOrders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    const orderData = await request.json();
    
    const newOrder = {
      id: Date.now().toString(),
      userId: decoded.userId,
      ...orderData,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    // In a real app, you would save to database
    mockOrders.push(newOrder);
    
    return NextResponse.json(newOrder);
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}