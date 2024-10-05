import asyncio
import websockets
import json
import base64
from PIL import Image
import io

async def send_message(websocket, message_type, data):
    message = json.dumps({"type": message_type, **data})
    await websocket.send(message)
    print(f"Sent {message_type} message")

async def send_game_frame(websocket):
    # Create a simple test image
    image = Image.new('RGB', (100, 100), color='red')
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    
    await send_message(websocket, "game_frame", {"payload": img_str})

async def send_component_update(websocket):
    component = {
        "id": "test_component",
        "kind": "ocr",
        "context": "Test OCR component",  # Changed from "description" to "context"
        "zone": {"x": 0, "y": 0, "width": 100, "height": 50}
    }
    await send_message(websocket, "component_update", {"component": component})

async def send_user_event(websocket):
    user_event = {"action": "click", "x": 50, "y": 50}
    await send_message(websocket, "user_event", {"event": user_event})

async def main():
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as websocket:
        print("Connected to the WebSocket server")
        
        while True:
            print("\nChoose an action:")
            print("1. Send game frame")
            print("2. Send component update")
            print("3. Send user event")
            print("4. Quit")
            
            choice = input("Enter your choice (1-4): ")
            
            if choice == '1':
                await send_game_frame(websocket)
            elif choice == '2':
                await send_component_update(websocket)
            elif choice == '3':
                await send_user_event(websocket)
            elif choice == '4':
                print("Disconnecting...")
                break
            else:
                print("Invalid choice. Please try again.")

if __name__ == "__main__":
    asyncio.run(main())