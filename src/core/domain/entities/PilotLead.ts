/**
 * Entidad del dominio: Lead del Programa Piloto
 */
export interface PilotLead {
  id?: string;
  contactMethod: 'email' | 'phone' | 'whatsapp';
  contactInfo: string; // Email o teléfono según el método elegido
  sector?: string;
  businessName?: string;
  createdAt?: Date;
  status?: 'pending' | 'contacted' | 'converted';
}
