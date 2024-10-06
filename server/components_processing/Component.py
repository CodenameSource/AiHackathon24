class Component:
    def __init__(self, id, x, y, width, height, context):
        self.id = id
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.context = context
        self.backlog = []

        self.max_backlog = 5

    def edit(self, x, y, width, height, context):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.context = context

    @property
    def last_observation(self):
        if len(self.backlog) > 0:
            return self.backlog[-1]
        return None

    def push_to_backlog(self, data):
        self.backlog.append(data)
        if len(self.backlog) > self.max_backlog:
            self.backlog.pop(0)

    def process(self, image):
        """
        Process the image with the component
        Should output useful information for the context
        """

        pass