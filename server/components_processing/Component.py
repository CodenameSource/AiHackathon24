class Component:
    def __init__(self, id, x, y, width, height, context):
        self.id = id
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.context = context

    def process(self, image, *args):
        """
        Process the image with the component
        Should output useful information for the context
        """

        pass