import asyncio
from pprint import pprint
from transport import WebTransport
import generate_environment

async def main():
    transport = WebTransport()

    def handle_stop_gameplay(timestamp: int):
        code = generate_environment.create_gym_env_from_message(transport.frames)
        print(code)

    transport.on('stop_gameplay', handle_stop_gameplay)

    await transport.start_server('localhost', 8765)

if __name__ == "__main__":
    asyncio.run(main())