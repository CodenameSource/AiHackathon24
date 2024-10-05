import asyncio
from pprint import pprint
import websockets
import json
import base64
from typing import Dict, Any, Callable, Union, Coroutine, List

class WebTransport:
    def __init__(self):
        self.components: Dict[str, Dict[str, Any]] = {}
        self.event_handlers: Dict[str, Union[Callable, Coroutine]] = {}
        self.is_gameplay_running: bool = False
        self.frames: List[str] = []  # Store frames here

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
        elif event_type == 'remove_component':
            await self.handle_remove_component(data)
        elif event_type == 'keyboard_event':
            await self.handle_keyboard_event(data)
        elif event_type == 'start_gameplay':
            await self.handle_start_gameplay()
        elif event_type == 'stop_gameplay':
            await self.handle_stop_gameplay()
        else:
            print(f"Unknown event type: {event_type}")

    async def handle_start_gameplay(self):
        self.is_gameplay_running = True
        self.frames.clear()  # Clear the frames array when gameplay starts
        print("Gameplay started")
        if 'start_gameplay' in self.event_handlers:
            await self.call_handler('start_gameplay')

    async def handle_stop_gameplay(self):
        self.is_gameplay_running = False
        print("Gameplay stopped")
        if 'stop_gameplay' in self.event_handlers:
            await self.call_handler('stop_gameplay')

    async def handle_game_frame(self, data: Dict[str, Any]):
        if not self.is_gameplay_running:
            return  # Don't process game frames if gameplay is not running
        
        payload = data.get('payload')
        self.frames.append(payload)  # Store the frame
        print(f"Stored frame. Total frames: {len(self.frames)}")
        
        if 'game_frame' in self.event_handlers:
            await self.call_handler('game_frame', payload)

    async def handle_component_update(self, data: Dict[str, Any]):
        component = data.get('component', {})
        component_id = component.get('id')
        
        if component_id:
            self.components[component_id] = component

        pprint(self.components)

        if 'component_update' in self.event_handlers:
            await self.call_handler('component_update', component)

    async def handle_user_event(self, data: Dict[str, Any]):
        user_event = data.get('event', {})
        
        if 'user_event' in self.event_handlers:
            await self.call_handler('user_event', user_event)

    async def handle_remove_component(self, data: Dict[str, Any]):
        component_id = data.get('component_id')
        if component_id in self.components:
            del self.components[component_id]
            print(f"Removed component with ID: {component_id}")
        else:
            print(f"Component with ID {component_id} not found")

        if 'remove_component' in self.event_handlers:
            await self.call_handler('remove_component', component_id)

    async def handle_keyboard_event(self, data: Dict[str, Any]):
        keyboard_event = data.get('event', {})
        print(f"Keyboard event received on server: {json.dumps(keyboard_event, indent=2)}")

        if 'keyboard_event' in self.event_handlers:
            await self.call_handler('keyboard_event', keyboard_event)

    async def call_handler(self, event_type: str, *args):
        handler = self.event_handlers[event_type]
        if asyncio.iscoroutinefunction(handler):
            await handler(*args)
        else:
            handler(*args)

    def on(self, event_type: str, handler: Union[Callable, Coroutine]):
        self.event_handlers[event_type] = handler

    async def start_server(self, host: str, port: int):
        allowed_origins = [
            'http://localhost:3000',
            'https://ai-hackathon-gym-environments.vercel.app'
        ]
        server = await websockets.serve(
            self.handle_connection, 
            host, 
            port, 
            origins=allowed_origins
        )
        print(f"WebSocket server started on ws://{host}:{port}")
        print(f"Allowed origins: {', '.join(allowed_origins)}")
        await server.wait_closed()

async def main():
    transport = WebTransport()

    # Example event handlers
    transport.on('game_frame', lambda payload: print(f"Received game frame, payload length: {len(payload)}"))
    transport.on('component_update', lambda component: print(f"Component updated: {component['id']}"))
    transport.on('user_event', lambda event: print(f"User event received: {event}"))
    transport.on('remove_component', lambda component_id: print(f"Component removed: {component_id}"))
    transport.on('keyboard_event', lambda event: print(f"Keyboard event handler called: {json.dumps(event, indent=2)}"))
    transport.on('start_gameplay', lambda: print("Start gameplay event received"))
    transport.on('stop_gameplay', lambda: print("Stop gameplay event received"))

    await transport.start_server('localhost', 8765)

if __name__ == "__main__":
    asyncio.run(main())