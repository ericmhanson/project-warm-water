import serial
import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('project-warm-water-firebase-adminsdk-gbqrt-4d4d00176a.json')
firebase_admin.initialize_app(cred)
arduino = serial.Serial('/dev/tty.wchusbserial1420')  # open serial port

db = firestore.client()

count = 0

got_heatup_time = False
got_shower_time = False


while True:
    reading = arduino.readline()
    
    #print("Received")
    #print(reading)
    
    if reading == "Detected Water Flow\n":
        #TODO: get start time from system and store in the database
        print("Water flow detected")
    
    reading_array = reading.split(";")
    
    if reading_array[0] == "Heat Up Time":
        #TODO: store second element in the database. Output is seconds of type float eg: 21.4
        print("Time taken to heatup: ")
        print(reading_array[1])
        time2heat = float(reading_array[1])
        T2hig = .035 * float(reading_array[1])
        got_heatup_time = True
       

        
    if reading_array[0] == "Shower Time Total":
        #TODO: store the second element in the database. Output is seconds of type float eg: 21.4
        print("Time taken to shower: ")
        print(reading_array[1])
        time2shower = float(reading_array[1])
        T2sig = .035 * float(reading_array[1])
        got_shower_time = True

    if got_heatup_time and got_shower_time : 
        doc_ref = db.collection(u'users').document(u'showering' + str(count))
        doc_ref.set({
            u'time2heat': time2heat,
            u't2hig': T2hig,
            u'time2shower': time2shower,
            u't2sig': T2sig,
            u'time': datetime.datetime.now()
        })
        count+=1
        got_shower_time = False
        got_heatup_time = False