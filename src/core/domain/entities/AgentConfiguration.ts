/**
 * Entidad del dominio: Configuración del Agente de IA
 * Basado en el modelo de personalización de Python
 */
export interface AgentConfiguration {
  id?: string;
  
  // Información básica de la marca
  brandName: string;
  
  // Mensajes personalizados
  welcomeMessage: string;
  farewellMessage: string;
  
  // Tono y estilo de comunicación
  tone: AgentTone;
  customerTreatment: 'tú' | 'usted';
  emojiUsage: EmojiUsage;
  
  // Voz de marca y personalidad
  brandVoice: string;
  specialNotes: string;
  
  // Contexto del negocio
  businessType: string;
  targetAudience: string;
  
  // Metadatos
  createdAt?: Date;
  updatedAt?: Date;
}

export type AgentTone = 
  | 'profesional y serio'
  | 'amigable y cariñoso'
  | 'casual y relajado'
  | 'formal y corporativo'
  | 'entusiasta y energético'
  | 'empático y comprensivo';

export type EmojiUsage = 
  | 'sin emojis'
  | 'uso mínimo (solo ocasionalmente)'
  | 'uso moderado (cuando sea apropiado)'
  | 'uso frecuente (en la mayoría de mensajes)';

// Tipos auxiliares eliminados (ya no necesarios con el nuevo modelo)
export interface AgentPersonality {
  tone: string;
  style: string;
  empathy: string;
  humor: string;
}

export interface AgentCapabilities {
  languages: string[];
  domains: string[];
  features: string[];
  knowledgeBase: boolean;
  learningEnabled: boolean;
}

export interface AgentAppearance {
  avatar?: string;
  primaryColor: string;
  secondaryColor: string;
  theme: 'light' | 'dark' | 'auto';
}

export interface CommunicationStyle {
  greetingMessage: string;
  fallbackMessage: string;
  responseTime: string;
  maxResponseLength: number;
  useEmojis: boolean;
}

export interface Integration {
  id: string;
  name: string;
  type: 'api' | 'webhook' | 'database' | 'service';
  enabled: boolean;
  config?: Record<string, unknown>;
}
