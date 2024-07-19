import { NextResponse } from 'next/server';
import getConfig from 'next/config';

import { JournalClassification } from '@/models/journal';

const { serverRuntimeConfig } = getConfig();

interface ApiResponse {
  calificacion: string;
  issns: string;
  nombreRevista: string;
  sires: string;
  vigencia: string;
}

export async function GET(req: Request, context: any) {
  const { id } = context.params;
  const apiUrl = serverRuntimeConfig.PUBLIC_JOURNAL_API;

  try {
    const response = await fetch(`${apiUrl}/${id}`);

    if (response.status !== 200) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const data: ApiResponse[] = await response.json();

    const classifications: Array<JournalClassification> = [];

    data?.forEach((classification: ApiResponse) => {
      classifications.push({
        index: classification.calificacion,
        issns: classification.issns.split(',').map((issn) => issn.trim()),
        name: classification.nombreRevista,
        indexers: classification.sires
          ?.split(',')
          .map((indexer) => indexer.trim()),
        date: classification.vigencia
      });
    });

    return NextResponse.json(classifications);
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
