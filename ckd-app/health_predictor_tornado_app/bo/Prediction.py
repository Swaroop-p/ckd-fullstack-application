# --- API Controllers ---
from bo.Base import BO_Base
import scipy
# --- Logger ---
from logger import logger_error, logger_info, logger_warning
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import pickle
from collections import OrderedDict

class BO_Prediction(BO_Base):

    def __init__(self):
        pass

    def disease_prediction(self, prediction_params):

        fdo = OrderedDict()
        fdo['age'] = prediction_params['age']
        fdo['bp'] = prediction_params['bp']
        fdo['sg'] = prediction_params['sg']
        fdo['al'] = prediction_params['al']
        fdo['su'] = prediction_params['su']

        fdo['rbc'] = prediction_params['rbc']
        fdo['pc'] = prediction_params['pc']
        fdo['pcc'] = prediction_params['pcc']
        fdo['ba'] = prediction_params['ba']
        fdo['bgr'] = prediction_params['bgr']

        fdo['bu'] = prediction_params['bu']
        fdo['sc'] = prediction_params['sc']
        fdo['sod'] = prediction_params['sod']
        fdo['pot'] =prediction_params['pot']
        fdo['hemo'] = prediction_params['hemo']
        fdo['pcv'] = prediction_params['pcv']

        fdo['wc'] = prediction_params['wc']
        fdo['rc'] = prediction_params['rc']

        fdo['htn'] = prediction_params['htn']
        fdo['dm'] = prediction_params['dm']
        fdo['cad'] = prediction_params['cad']
        fdo['appet'] = prediction_params['appet']
        fdo['pe'] = prediction_params['pe']
        fdo['ane'] = prediction_params['ane']

        fdo_series = pd.Series(fdo)
        # ----> Machine Learning Code goes here
        data = pd.Series(prediction_params)
        rf = pickle.load(open('bo/ckd_model.sav', 'rb'))
        try:
            Y_pred = rf.predict([fdo_series])
            print(Y_pred)
        except ValueError as error:
            logger_error(str(error))
            return error

        return Y_pred[0]
