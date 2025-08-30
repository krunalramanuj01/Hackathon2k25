import random, time

def get_fake_sensor_data():
    return {
        "sea_level": round(1.5 + random.uniform(-0.2, 0.5), 2),
        "temperature": round(28 + random.uniform(-2, 2), 2),
        "wave_height": round(1.2 + random.uniform(-0.5, 2), 2),
        "timestamp": time.time()
    }
