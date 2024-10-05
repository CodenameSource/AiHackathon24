import unittest
import cv2
from server.components_processing.OCR import OCRComponent

class TestOCRComponent(unittest.TestCase):
    def setUp(self):
        self.ocr = OCRComponent(0, 0, 0, 0, 0, None)
        self.test_images = [cv2.imread(f'test_images/ocr/ocr_{i}.png') for i in range(1, 6)]
        self.ground_truths = [['00009'], ['00041'],
                              ['GAME', 'OVER'],
                              ['HI', '00047'], ['00047']]

    def test_ocr_image_1(self):
        result = self.ocr.process(self.test_images[0])
        self.assertIsInstance(result, list)
        self.assertEqual(self.ground_truths[0], result)

    def test_ocr_image_2(self):
        result = self.ocr.process(self.test_images[1])
        self.assertIsInstance(result, list)
        self.assertEqual(self.ground_truths[1], result)

    def test_ocr_image_3(self):
        result = self.ocr.process(self.test_images[2])
        self.assertIsInstance(result, list)
        self.assertEqual(self.ground_truths[2], result)

    def test_ocr_image_4(self):
        result = self.ocr.process(self.test_images[3])
        self.assertIsInstance(result, list)
        self.assertEqual(self.ground_truths[3], result)

    def test_ocr_image_5(self):
        result = self.ocr.process(self.test_images[4])
        self.assertIsInstance(result, list)
        self.assertEqual(self.ground_truths[4], result)

    if __name__ == '__main__':
        unittest.main()
