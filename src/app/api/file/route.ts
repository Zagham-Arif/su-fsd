import csv from 'csv-parser';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { CSVFile } from '../../interfaces/file';

export async function GET(req: NextRequest) {
  try {
    const filePath = path.resolve(process.cwd(), 'src/public/data.csv');

    // Read and parse the CSV file asynchronously
    const parsedData = await parseCsvFile(filePath);

    // Get query params
    const { searchParams } = new URL(req.url);
    const sortBy = searchParams.get('sortBy');

    // Sort the data based on query params
    if (sortBy === 'createdAt_asc') {
      parsedData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'filename_asc') {
      parsedData.sort((a, b) => sortByFilename(a.filename, b.filename));
    } else if (sortBy === 'filename_desc') {
      parsedData.sort((a, b) => sortByFilename(b.filename, a.filename));
    }

    // Return the sorted data as JSON
    return NextResponse.json({ data: parsedData });

  } catch (error) {
    console.error('Error reading CSV file:', error);
    return NextResponse.json({ error: 'Error reading CSV file' }, { status: 500 });
  }
}

async function parseCsvFile(filePath: string): Promise<CSVFile[]> {
  return new Promise((resolve, reject) => {
    const results: CSVFile[] = [];

    fs.createReadStream(filePath)
      .pipe(csv({ headers: false }))
      .on('data', (data) => {
        const [val] = Object.values(data) as string[]
        const [createdAt, filename] = val.split(';');
        results.push({ createdAt, filename });
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

// Helper function for filename sort, treating numbers inside strings as numbers
const sortByFilename = (a: string, b: string) => {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
};
