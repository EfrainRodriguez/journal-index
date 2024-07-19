import { z } from 'zod';

export const formSchema = z.object({
  issn: z.string().optional(),
  name: z.string().optional()
});
