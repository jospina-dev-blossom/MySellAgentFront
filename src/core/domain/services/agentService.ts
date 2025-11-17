import type { AgentConfiguration } from '../entities/AgentConfiguration';

/**
 * Servicio del dominio para gestionar configuraciones de agentes
 */
export const agentService = {
  validateConfiguration: (config: Partial<AgentConfiguration>): boolean => {
    if (!config.brandName || config.brandName.trim().length < 2) {
      return false;
    }
    if (!config.welcomeMessage || config.welcomeMessage.trim().length < 10) {
      return false;
    }
    if (!config.tone || !config.customerTreatment) {
      return false;
    }
    return true;
  },

  calculateCompleteness: (config: Partial<AgentConfiguration>): number => {
    const fields = [
      config.brandName,
      config.welcomeMessage,
      config.farewellMessage,
      config.tone,
      config.customerTreatment,
      config.emojiUsage,
      config.brandVoice,
      config.businessType,
    ];
    
    const completed = fields.filter(field => field !== undefined && field !== null && field !== '').length;
    return Math.round((completed / fields.length) * 100);
  },

  /**
   * Genera un ejemplo de mensaje de bienvenida basado en el tipo de negocio
   */
  generateWelcomeExample: (businessType?: string): string => {
    const examples: Record<string, string> = {
      'tienda_mascotas': '¡Hola amante de las mascotas! 🐶🐱 Bienvenido a [Tu Marca]. ¿Qué necesita tu peludo hoy?',
      'restaurante': '¡Bienvenido a [Tu Marca]! 🍽️ ¿En qué podemos ayudarte hoy?',
      'tecnologia': '¡Hola! Bienvenido a [Tu Marca]. ¿Cómo puedo ayudarte con tu consulta técnica?',
      'salud': 'Bienvenido a [Tu Marca]. Estamos aquí para ayudarte con tus consultas de salud.',
      'educacion': '¡Hola! Bienvenido a [Tu Marca]. ¿En qué podemos apoyarte en tu aprendizaje?',
      'ecommerce': '¡Hola! Bienvenido a [Tu Marca]. ¿Qué estás buscando hoy?',
    };
    
    return examples[businessType || 'ecommerce'] || '¡Hola! Bienvenido a [Tu Marca]. ¿Cómo puedo ayudarte?';
  },

  /**
   * Genera un ejemplo de mensaje de despedida
   */
  generateFarewellExample: (businessType?: string): string => {
    const examples: Record<string, string> = {
      'tienda_mascotas': '¡Gracias por confiar en [Tu Marca]! 🐾 Dale muchos mimos a tu peludo de nuestra parte. ¡Hasta pronto! 💙',
      'restaurante': '¡Gracias por tu visita! Esperamos verte pronto. ¡Buen provecho! 🍽️',
      'tecnologia': 'Gracias por contactarnos. ¡Que tengas un excelente día!',
      'salud': 'Cuídate mucho. Gracias por confiar en nosotros. ¡Hasta pronto!',
      'educacion': '¡Sigue aprendiendo! Gracias por elegirnos. ¡Hasta la próxima!',
      'ecommerce': '¡Gracias por tu compra! Esperamos verte pronto. 😊',
    };
    
    return examples[businessType || 'ecommerce'] || '¡Gracias por tu tiempo! Que tengas un excelente día.';
  },
};
