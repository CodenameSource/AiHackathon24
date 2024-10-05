import cv2
import easyocr

from server.components_processing import Component

class OCRComponent(Component):
    def __init__(self, id, x, y, width, height, context):
        super().__init__(id, x, y, width, height, context)
        # Initialize EasyOCR reader with the desired languages (e.g., English)
        self.reader = easyocr.Reader(['en'])  # Add other languages if needed

    def process(self, image, type='text'):
        """
        Process the image with the EasyOCR reader.
        Should output useful information for the context.
        """
        if type == 'text_only':
            # EasyOCR expects image as an array, so ensure your image is properly formatted
            results = self.reader.readtext(image, blocklist=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])  # Process the image with EasyOCR
        else:
            results = self.reader.readtext(image)

        # Process and return the results from EasyOCR
        extracted_text = [res[1] for res in results]  # Extract only the text part of each result
        return extracted_text

if __name__ == '__main__':
    test_image = cv2.imread('../component_tests/test_images/ocr/ocr_1.png')

    ocr = OCRComponent(0, 0, 0, 0, 0, None)
    print(ocr.process(test_image))