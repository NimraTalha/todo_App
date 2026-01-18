// Mock chat API implementation for local development
// This simulates chat responses when the backend is not available

import { ChatRequest, ChatResponse } from './types';

// Initialize mock data in localStorage if not present
const initializeMockData = () => {
  if (typeof window !== 'undefined' && !localStorage.getItem('mock_conversations')) {
    const initialConversations: any[] = [];
    localStorage.setItem('mock_conversations', JSON.stringify(initialConversations));
  }
};

// Helper function to get conversations from localStorage
const getConversationsFromStorage = (): any[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('mock_conversations');
  return stored ? JSON.parse(stored) : [];
};

// Helper function to save conversations to localStorage
const saveConversationsToStorage = (conversations: any[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mock_conversations', JSON.stringify(conversations));
  }
};

// Mock function to send a message
export const mockSendChatMessage = async (
  userId: string,
  message: string,
  conversationId?: string
): Promise<ChatResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        // Initialize mock data if needed
        initializeMockData();
        
        // Generate a new conversation ID if not provided
        const convId = conversationId || `conv_${Date.now()}`;
        
        // Simulate different responses based on the user's message
        let response = "Thanks for your message! I'm an AI assistant designed to help you manage your tasks. You can ask me to add, complete, or list your tasks.";
        
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
          response = "Hello there! I'm your AI assistant. I can help you manage your tasks. Try saying 'add a task' or 'show my tasks'.";
        } else if (lowerMsg.includes('add') || lowerMsg.includes('create') || lowerMsg.includes('new')) {
          response = "I can help you add a task. In a real implementation, I would create a new task based on your request. For example, if you said 'Add buy groceries', I would create that task for you.";
        } else if (lowerMsg.includes('complete') || lowerMsg.includes('done') || lowerMsg.includes('finish')) {
          response = "I can help you mark a task as complete. In a real implementation, I would update your task status based on your request.";
        } else if (lowerMsg.includes('list') || lowerMsg.includes('show') || lowerMsg.includes('my tasks')) {
          response = "I can show your tasks. In a real implementation, I would fetch and display your current tasks.";
        } else if (lowerMsg.includes('help')) {
          response = "I'm here to help you manage your tasks! You can ask me to: \n- Add a new task \n- Mark a task as complete \n- List your tasks \n- Update a task \n- Delete a task";
        }
        
        // Create a mock response
        const chatResponse: ChatResponse = {
          response: response,
          conversation_id: convId,
          message_id: `msg_${Date.now()}`
        };
        
        // Update conversation history in localStorage
        const conversations = getConversationsFromStorage();
        const existingConvIndex = conversations.findIndex(c => c.id === convId);
        
        if (existingConvIndex >= 0) {
          // Update existing conversation
          conversations[existingConvIndex].messages.push({
            id: chatResponse.message_id,
            content: message,
            response: response,
            timestamp: new Date().toISOString()
          });
        } else {
          // Create new conversation
          conversations.push({
            id: convId,
            userId: userId,
            messages: [{
              id: chatResponse.message_id,
              content: message,
              response: response,
              timestamp: new Date().toISOString()
            }],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
        
        saveConversationsToStorage(conversations);
        
        resolve(chatResponse);
      } catch (error) {
        console.error('Mock chat error:', error);
        reject(error);
      }
    }, 800); // Simulate network delay
  });
};

// Mock function to get conversation history
export const mockGetConversationHistory = async (
  userId: string,
  conversationId: string
): Promise<ChatResponse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, we would fetch from storage
      // For now, return an empty array
      resolve([]);
    }, 500);
  });
};

// Mock function to get user's conversations
export const mockGetConversations = async (userId: string): Promise<any[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return conversations from localStorage
      const conversations = getConversationsFromStorage();
      resolve(conversations.filter(conv => conv.userId === userId));
    }, 500);
  });
};