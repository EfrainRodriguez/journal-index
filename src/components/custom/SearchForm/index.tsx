'use client';

import React, { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Spinner from '../Spinner';

import { formSchema } from './validationSchema';

const SearchForm = ({
  loading = false,
  onSubmit = () => {}
}: {
  loading?: boolean;
  onSubmit?: (values: { issn: string; name: string }) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      issn: '',
      name: ''
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values as { issn: string; name: string });
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 md:space-y-0 md:flex md:items-end md:gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="md:flex-1">
              <FormControl>
                <Input
                  placeholder="Nombre de la revista"
                  {...field}
                  ref={inputRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="issn"
          render={({ field }) => (
            <FormItem className="md:flex-1">
              <FormControl>
                <Input placeholder="ISSN de la revista" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          Buscar {loading && <Spinner className="ml-3 w-10 h-10" />}
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
