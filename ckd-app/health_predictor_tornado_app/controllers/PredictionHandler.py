import json
import tornado
# --- API Controllers ---
from controllers.RestClass import RestClass
from bo.Prediction import BO_Prediction

# --- Logger ---
from logger import logger_error, logger_info, logger_warning


class PredictionHandler(RestClass):
    def set_default_headers(self):
        print("setting headers!!!")
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', ' PUT, DELETE, OPTIONS')

    def __init(self):
        self.name = "PredictionHandler"
        self.bPrediction = BO_Prediction()

    def get(self):
        self.__init()
        self.write("Prediction Handler")
        logger_info("Code @ " + self.name + " GET")

    def post(self):
        self.__init()
        logger_info("Code @ " + self.name + " POST")
        print(self.request.body)

        # json_data = tornado.escape.json_decode(self.request.body)
        # print("Json Data here:")
        # print(json_data)

        prediction_result = self.bPrediction.disease_prediction(json.loads(self.request.body))
        json_response = json.dumps({'result': str(prediction_result)})
        self.write(json_response)
