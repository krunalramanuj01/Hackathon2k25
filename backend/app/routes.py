from fastapi import APIRouter
from app.data_simulator import get_fake_sensor_data
from app.models import detect_anomalies
from app.utils import send_alert

router = APIRouter()

@router.get("/data")
def fetch_data():
    data = get_fake_sensor_data()
    anomalies = detect_anomalies(data)
    if anomalies:
        send_alert(anomalies)
    return {"data": data, "anomalies": anomalies}
