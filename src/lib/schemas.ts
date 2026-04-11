import { z } from 'zod'

export const reservationSchema = z.object({
  date: z.string().min(1, 'La date est requise'),
  time: z.string().min(1, "L'heure est requise"),
  guests: z.number().min(1, 'Au moins 1 personne').max(20, 'Maximum 20 personnes'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Email invalide'),
  phone: z
    .string()
    .min(6, 'Numéro de téléphone invalide')
    .regex(/^[\d\s+()-]+$/, 'Numéro de téléphone invalide'),
  specialRequests: z.string().max(500, 'Maximum 500 caractères').optional(),
})

export type ReservationFormData = z.infer<typeof reservationSchema>

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Email invalide'),
  subject: z.string().min(1, 'Veuillez sélectionner un sujet'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(2000),
  acceptPrivacy: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
})

export type ContactFormData = z.infer<typeof contactSchema>
