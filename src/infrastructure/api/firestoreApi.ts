import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  Timestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from '@infrastructure/config/firebase.config';
import type { AgentConfiguration, PilotLead } from '@core/domain/entities';

// Collection names
const AGENTS_COLLECTION = 'agents';
const PILOT_LEADS_COLLECTION = 'pilot_leads';

// Firestore document type (includes metadata)
interface AgentDocument {
  userId: string;
  brandName: string;
  welcomeMessage: string;
  farewellMessage: string;
  tone: string;
  customerTreatment: 'tú' | 'usted';
  emojiUsage: string;
  brandVoice: string;
  specialNotes: string;
  businessType: string;
  targetAudience: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Transform AgentConfiguration to Firestore document
const toFirestoreDocument = (
  config: AgentConfiguration,
  userId: string
): Omit<AgentDocument, 'createdAt' | 'updatedAt'> => {
  return {
    userId,
    brandName: config.brandName,
    welcomeMessage: config.welcomeMessage,
    farewellMessage: config.farewellMessage,
    tone: config.tone,
    customerTreatment: config.customerTreatment,
    emojiUsage: config.emojiUsage,
    brandVoice: config.brandVoice,
    specialNotes: config.specialNotes,
    businessType: config.businessType,
    targetAudience: config.targetAudience,
  };
};

// Transform Firestore document to AgentConfiguration
const fromFirestoreDocument = (doc: AgentDocument): AgentConfiguration => {
  return {
    brandName: doc.brandName,
    welcomeMessage: doc.welcomeMessage,
    farewellMessage: doc.farewellMessage,
    tone: doc.tone as AgentConfiguration['tone'],
    customerTreatment: doc.customerTreatment,
    emojiUsage: doc.emojiUsage as AgentConfiguration['emojiUsage'],
    brandVoice: doc.brandVoice,
    specialNotes: doc.specialNotes,
    businessType: doc.businessType,
    targetAudience: doc.targetAudience,
    createdAt: doc.createdAt.toDate(),
    updatedAt: doc.updatedAt.toDate(),
  };
};

export const firestoreService = {
  // Create or update agent configuration for a user
  saveAgentConfig: async (
    userId: string,
    config: AgentConfiguration
  ): Promise<void> => {
    try {
      const agentRef = doc(db, AGENTS_COLLECTION, userId);
      const docData = toFirestoreDocument(config, userId);

      // Check if document exists
      const docSnap = await getDoc(agentRef);

      if (docSnap.exists()) {
        // Update existing document
        await setDoc(
          agentRef,
          {
            ...docData,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } else {
        // Create new document
        await setDoc(agentRef, {
          ...docData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to save agent configuration';
      throw new Error(errorMessage);
    }
  },

  // Get agent configuration for a user
  getAgentConfig: async (userId: string): Promise<AgentConfiguration | null> => {
    try {
      const agentRef = doc(db, AGENTS_COLLECTION, userId);
      const docSnap = await getDoc(agentRef);

      if (!docSnap.exists()) {
        return null;
      }

      return fromFirestoreDocument(docSnap.data() as AgentDocument);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get agent configuration';
      throw new Error(errorMessage);
    }
  },

  // Get all agent configurations for a user (in case we need multiple agents per user in the future)
  getUserAgents: async (userId: string): Promise<AgentConfiguration[]> => {
    try {
      const agentsRef = collection(db, AGENTS_COLLECTION);
      const q = query(agentsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) =>
        fromFirestoreDocument(doc.data() as AgentDocument)
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get user agents';
      throw new Error(errorMessage);
    }
  },

  /**
   * Save a pilot lead to Firestore
   */
  savePilotLead: async (lead: Omit<PilotLead, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    try {
      const leadsRef = collection(db, PILOT_LEADS_COLLECTION);
      const leadData = {
        contactMethod: lead.contactMethod,
        contactInfo: lead.contactInfo,
        sector: lead.sector || null,
        businessName: lead.businessName || null,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(leadsRef, leadData);
      return docRef.id;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to save pilot lead';
      throw new Error(errorMessage);
    }
  },

  /**
   * Get all pilot leads (admin function)
   */
  getAllPilotLeads: async (): Promise<PilotLead[]> => {
    try {
      const leadsRef = collection(db, PILOT_LEADS_COLLECTION);
      const querySnapshot = await getDocs(leadsRef);

      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          contactMethod: data.contactMethod,
          contactInfo: data.contactInfo,
          sector: data.sector,
          businessName: data.businessName,
          status: data.status,
          createdAt: data.createdAt?.toDate(),
        } as PilotLead;
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to get pilot leads';
      throw new Error(errorMessage);
    }
  },
};
