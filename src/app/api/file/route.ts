// app/api/readCsv/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

interface IFile {
  createdAt: string;
  filename: string;
} 

export async function GET(req: NextRequest) {
  try {
    const filePath = path.resolve(process.cwd(), 'src/public/data.csv');
    
    // Read and parse the CSV file asynchronously
    let data = await parseCsvFile(filePath);

    // Get query params
    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get('sortBy');

    // Sort the data based on query params
    if (sortBy === 'createdAt_asc') {
      data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'filename_asc') {
      data.sort((a, b) => sortByFilename(a.filename, b.filename));
    } else if (sortBy === 'filename_desc') {
      data.sort((a, b) => sortByFilename(b.filename, a.filename));
    }

    // Return the sorted data as JSON
    return NextResponse.json({ data });

  } catch (error) {
    console.error('Error reading CSV file:', error);
    return NextResponse.json({ error: 'Error reading CSV file' }, { status: 500 });
  }
}

async function parseCsvFile(filePath: string): Promise<IFile[]> {
  return new Promise((resolve, reject) => {
    const results: IFile[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const val: string = (Object.values(data)[0] as string) || '';
        const [createdAt, filename] = val.split(';');
        results.push({ createdAt, filename });
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}


// Optimized natural sorting function for filenames
function sortByFilename(a: string, b: string): number {
  const aParts = a.match(/(\d+|\D+)/g); // Split by digits or non-digits
  const bParts = b.match(/(\d+|\D+)/g); // Split by digits or non-digits

  if (!aParts || !bParts) return a.localeCompare(b); // Fallback for malformed data

  const len = Math.min(aParts.length, bParts.length);

  for (let i = 0; i < len; i++) {
    const aPart = aParts[i];
    const bPart = bParts[i];

    const aNum = parseInt(aPart, 10);
    const bNum = parseInt(bPart, 10);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      if (aNum !== bNum) return aNum - bNum; 
    } else {
      const comparison = aPart.localeCompare(bPart);
      if (comparison !== 0) return comparison;
    }
  }

  // If all parts are equal, fallback to length comparison
  return aParts.length - bParts.length;
}
