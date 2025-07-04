import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = mockProducts.find(p => p.id === params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}