import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// In-memory cache: revalidate every 6 hours
let cachedData: { totalSolved: number } | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const LEETCODE_USERNAME = 'pankajkashp26';

const GRAPHQL_QUERY = `
  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

export async function GET() {
  // Serve from cache if still valid
  if (cachedData && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600',
      },
    });
  }

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'Origin': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query: GRAPHQL_QUERY,
        variables: { username: LEETCODE_USERNAME },
      }),
      // Next.js fetch cache: revalidate every 6 hours on the server
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      throw new Error(`LeetCode API responded with status ${response.status}`);
    }

    const json = await response.json();

    const acStats: Array<{ difficulty: string; count: number }> =
      json?.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];

    // The "All" difficulty entry holds the total solved count
    const allEntry = acStats.find((s) => s.difficulty === 'All');
    const totalSolved = allEntry?.count ?? 0;

    cachedData = { totalSolved };
    cacheTimestamp = Date.now();

    return NextResponse.json(cachedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('LeetCode API error:', error);

    // Return stale cache if available, otherwise error
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: { 'Cache-Control': 'public, s-maxage=60' },
      });
    }

    return NextResponse.json(
      { error: 'Failed to fetch LeetCode stats' },
      { status: 502 }
    );
  }
}
