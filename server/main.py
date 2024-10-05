import asyncio
import websockets
import json
import base64
from typing import Dict, Any, Callable

class WebTransport:
    def __init__(self):
        self.components: Dict[str, Dict[str, Any]] = {}
        self.event_handlers: Dict[str, Callable] = {}

    async def handle_connection(self, websocket, path):
        try:
            async for message in websocket:
                await self.process_message(message)
        except websockets.exceptions.ConnectionClosed:
            pass

    async def process_message(self, message: str):
        data = json.loads(message)
        event_type = data.get('type')

        if event_type == 'game_frame':
            await self.handle_game_frame(data)
        elif event_type == 'component_update':
            await self.handle_component_update(data)
        elif event_type == 'user_event':
            await self.handle_user_event(data)
        else:
            print(f"Unknown event type: {event_type}")

    async def handle_game_frame(self, data: Dict[str, Any]):
        payload = data.get('payload')
        # Decode base64 payload if needed
        # image_data = base64.b64decode(payload)
        
        if 'game_frame' in self.event_handlers:
            await self.event_handlers['game_frame'](payload)

    async def handle_component_update(self, data: Dict[str, Any]):
        component = data.get('component', {})
        component_id = component.get('id')
        
        if component_id:
            self.components[component_id] = component

        if 'component_update' in self.event_handlers:
            await self.event_handlers['component_update'](component)

    async def handle_user_event(self, data: Dict[str, Any]):
        user_event = data.get('event', {})
        
        if 'user_event' in self.event_handlers:
            await self.event_handlers['user_event'](user_event)

    def on(self, event_type: str, handler: Callable):
        self.event_handlers[event_type] = handler

    async def start_server(self, host: str, port: int):
        server = await websockets.serve(self.handle_connection, host, port)
        print(f"WebSocket server started on ws://{host}:{port}")
        await server.wait_closed()

async def main():
    transport = WebTransport()

    # Example event handlers
    transport.on('game_frame', lambda payload: print(f"Received game frame, payload length: {len(payload)}"))
    transport.on('component_update', lambda component: print(f"Component updated: {component['id']}"))
    transport.on('user_event', lambda event: print(f"User event received: {event}"))

    await transport.start_server('localhost', 8765)

if __name__ == "__main__":
    asyncio.run(main())
