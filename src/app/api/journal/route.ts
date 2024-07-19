import { NextResponse } from 'next/server';
import getConfig from 'next/config';

import { Journal } from '@/models/journal';

const { serverRuntimeConfig } = getConfig();

interface ApiResponse {
  id: number;
  txtNombre: string;
  issns: [{ txtIssn: string }];
}

export async function POST(req: Request) {
  const apiUrl = serverRuntimeConfig.PUBLIC_JOURNAL_API;

  const body = await req.json();

  try {
    const response = await fetch(`${apiUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (response.status !== 200) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const data: ApiResponse[] = await response.json();

    const journals: Array<Journal> = [];

    data?.forEach((journal: ApiResponse) => {
      journals.push({
        id: journal.id,
        name: journal.txtNombre,
        issns: journal.issns.map((issn) => issn.txtIssn)
      });
    });

    return NextResponse.json(journals);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
