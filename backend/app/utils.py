def send_alert(anomalies):
    for alert in anomalies:
        print(f"[ALERT] {alert}")
    # Here you can integrate Twilio SMS/Email
