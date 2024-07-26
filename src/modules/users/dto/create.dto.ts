import { z } from 'zod';

export interface userCreateDTOI {
  email: string;
  nickname: string;
  password: string;
}

export const userCreateDTOSchema = z.object({
  nickname: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

// Inferir el tipo del esquema zod
export type userCreateDTO = z.infer<typeof userCreateDTOSchema>;