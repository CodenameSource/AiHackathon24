import cv2

from server.components_processing import SpriteComponent

class MovementComponent(SpriteComponent):
    def __init__(self, id, x, y, width, height, context, entity):
        super().__init__(id, x, y, width, height, context, [entity, 'other'])
        self.entity = entity
        self.entity_x = 0
        self.entity_y = 0

    def process(self, image):
        results = super().process(image)
        entity_results = [result for result in results if self.entity in result[1]]
        if len(entity_results) == 0 or len(entity_results[0]) == 0:
            return None
        entity_result = entity_results[0]
        entity_x, entity_y, entity_width, entity_height = entity_result[0]
        self.entity_x = entity_x + entity_width / 2
        self.entity_y = entity_y + entity_height / 2

        return entity_x, entity_y