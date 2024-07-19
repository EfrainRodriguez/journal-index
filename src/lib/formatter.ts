export const formatIssn = (issns: string[]) => {
  return issns
    ?.map((issn) => {
      return `${issn.slice(0, 4)}-${issn.slice(4)}`;
    })
    ?.join(', ');
};

export const formatColor = (index: string) => {
  if (index === 'A1') {
    return 'text-emerald-500';
  }

  if (index === 'A2') {
    return 'text-cyan-500';
  }

  if (index === 'B') {
    return 'text-purple-500';
  }

  if (index === 'C') {
    return 'text-yellow-500';
  }

  return 'text-gray-500';
};
