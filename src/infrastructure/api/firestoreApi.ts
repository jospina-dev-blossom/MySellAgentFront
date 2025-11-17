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
} from 'firebase/firestore';
import { db } from '@infrastructure/config/firebase.config';
import type { AgentConfiguration } from '@core/domain/entities';

// Collection name
const AGENTS_COLLECTION = 'agents';

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
};
