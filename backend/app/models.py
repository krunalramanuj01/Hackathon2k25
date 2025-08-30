def detect_anomalies(data):
    anomalies = []
    if data["sea_level"] > 2.0:
        anomalies.append("Possible storm surge / sea level rise detected")
    if data["wave_height"] > 2.5:
        anomalies.append("Cyclonic activity risk detected")
    if data["temperature"] > 32:
        anomalies.append("Algal bloom conditions likely")
    return anomalies
