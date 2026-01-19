import sys
import os
sys.path.insert(0, os.path.abspath('.'))

from app.services.chatbot import ChatbotService

def test_chatbot_initialization():
    print("Testing Chatbot Service Initialization...")
    
    # Create a minimal settings object for testing
    import os
    os.environ.setdefault('DATABASE_URL', 'sqlite:///./test.db')
    os.environ.setdefault('COHERE_API_KEY', 'fake-key-for-test')
    
    try:
        service = ChatbotService()
        print("[OK] Chatbot service initialized successfully")

        if service.co:
            print("[OK] Cohere client is available")
        else:
            print("[?] Cohere client not initialized (may be due to missing API key)")

        # Test if the tools are loaded
        if hasattr(service, 'tools') and service.tools:
            print(f"[OK] {len(service.tools)} tools loaded")
        else:
            print("[WARN] No tools loaded")

        return True

    except Exception as e:
        print(f"[ERROR] Error initializing chatbot service: {str(e)}")
        return False

if __name__ == "__main__":
    test_chatbot_initialization()