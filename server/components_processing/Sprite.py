
import numpy as np
import cv2
import torch
import torchvision

from transformers import AutoProcessor, AutoModelForZeroShotObjectDetection
from server.components_processing import Component


class SpriteComponent(Component):

    def __init__(self, id, x, y, width, height, context, labels):
        super().__init__(id, x, y, width, height, context)
        self.labels = labels
        self.score_threshold = 0.4

        self.processor = AutoProcessor.from_pretrained("IDEA-Research/grounding-dino-base")
        self.model = AutoModelForZeroShotObjectDetection.from_pretrained("IDEA-Research/grounding-dino-base").to("cuda")
        if torch.cuda.is_available():
            self.device = "cuda"
        else:
            self.device = "cpu"

    def infer_dino(self, image, text_queries, score_threshold=0.5):
        queries = ""
        for query in text_queries:
            queries += f"{query}. "

        width, height = image.shape[:2]

        target_sizes = [(width, height)]
        inputs = self.processor(text=queries, images=image, return_tensors="pt").to(self.device)

        with torch.no_grad():
            outputs = self.model(**inputs)
            outputs.logits = outputs.logits.cpu()
            outputs.pred_boxes = outputs.pred_boxes.cpu()
            results = self.processor.post_process_grounded_object_detection(outputs=outputs, input_ids=inputs.input_ids,
                                                                            box_threshold=score_threshold,
                                                                        target_sizes=target_sizes)
        return results

    def process(self, image):
        text_queries = self.labels

        results = self.infer_dino(image, text_queries, self.score_threshold)

        boxes, scores, labels = results[0]["boxes"], results[0]["scores"], results[0]["labels"]
        result_labels = []

        for box, score, label in zip(boxes, scores, labels):
            box = [int(i) for i in box.tolist()]
            if score < self.score_threshold:
                continue
            result_labels.append(([box[0] + self.x, box[1] + self.y, box[2], box[3]], label, score))

        self.push_to_backlog(result_labels)
        return result_labels # [[x0, y0, width, height], label, score]

    def visualize_results(self, image, detections):
        vis_image = image.copy()

        for det in detections:
            box = det[0]
            label = det[1]
            score = det[2]

            cv2.rectangle(vis_image, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)

            label = f"{label}: {score:.2f}"

            cv2.putText(vis_image, label, (box[0], box[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        return vis_image

if __name__ == '__main__':
    # Initialize the component
    sprite_component = SpriteComponent(id="sprite_detector", x=0, y=0, width=640, height=480, context={})

    res = sprite_component.process(cv2.imread("scene.png"), ["cactus", "other"], .5)
    cv2.imshow("vis", sprite_component.visualize_results(cv2.imread("scene.png"), res))

    cv2.waitKey(0)
    cv2.destroyAllWindows()
