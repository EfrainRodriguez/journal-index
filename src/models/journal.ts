export interface Journal {
  id: number;
  name: string;
  issns: string[];
}

export interface JournalClassification {
  index: string;
  issns: string[];
  name: string;
  indexers: string[];
  date: string;
}
