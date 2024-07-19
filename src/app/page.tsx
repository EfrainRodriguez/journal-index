'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Journal, JournalClassification } from '@/models/journal';
import Navbar from '@/components/custom/Navbar';
import SearchForm from '@/components/custom/SearchForm';
import JournalItem from '@/components/custom/JournalItem';
import JournalDetails from '@/components/custom/JournalDetails';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [classifications, setClassifications] = useState<
    JournalClassification[]
  >([]);
  const [open, setOpen] = useState(false);

  const handleSearch = async (values: { issn: string; name: string }) => {
    setLoading(true);

    const { issn, name } = values;

    if (!issn && !name) {
      toast.error('Debe ingresar al menos un criterio de búsqueda', {
        style: {
          color: 'red'
        }
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          txtIssn: issn?.replace(/-/g, '').trim(),
          nmeRevista: name
        })
      });

      if (!response.ok) {
        throw new Error('Error al buscar los detalles de la revista');
      }

      const data = await response.json();

      setJournals(data);
    } catch (error) {
      toast.error('Ocurrió un error al buscar las revistas', {
        style: {
          color: 'red'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJournalDetails = async (journal: Journal) => {
    setOpen(true);
    setLoadingDetails(true);

    try {
      const response = await fetch(`/api/journal/${journal.id}`);
      if (!response.ok) {
        throw new Error('Error al buscar los detalles de la revista');
      }

      const data = await response.json();

      setClassifications(data);
    } catch (error) {
      toast.error('Ocurrió un error al buscar los detalles de la revista', {
        style: {
          color: 'red'
        }
      });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setClassifications([]);
  };

  return (
    <main className="max-w-screen-lg mx-auto p-4">
      <Navbar />
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-xl">
            Búsqueda de revistas científicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchForm loading={loading} onSubmit={handleSearch} />
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-xl">Resultados de la búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          {journals.length === 0 && (
            <p className="text-center text-gray-500">
              No hay resultados para mostrar
            </p>
          )}
          {journals?.length > 0 &&
            journals?.map((journal: any, index) => (
              <JournalItem
                key={index}
                journal={journal}
                onSeeMore={handleJournalDetails}
              />
            ))}
        </CardContent>
      </Card>
      <JournalDetails
        open={open}
        isLoading={loadingDetails}
        classifications={classifications}
        onClose={handleClose}
      />
    </main>
  );
};

export default Page;
