import type { Job } from '../types/job';

const API_URL = import.meta.env.VITE_API_URL as string;

if (!API_URL) {
  console.warn('VITE_API_URL is not set. Check your .env.local file.');
}

export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
  }
  return response.json();
}
