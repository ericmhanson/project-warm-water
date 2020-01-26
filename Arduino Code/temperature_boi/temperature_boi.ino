#include <math.h>
#include <Wire.h>
#include "rgb_lcd.h"

//Define the color values here
#define COLOR_START_R 0
#define COLOR_START_G 255
#define COLOR_START_B 0

#define COLOR_INTERM_R 255
#define COLOR_INTERM_G 102
#define COLOR_INTERM_B 0

#define COLOR_STOP_R 255
#define COLOR_STOP_G 0
#define COLOR_STOP_B 0


//Global Variables
rgb_lcd lcd;

int LED_R;
int LED_G;
int LED_B;

const int B = 4275;               // B value of the thermistor
const int R0 = 100000;            // R0 = 100k
const int pinTempSensor = A0;     // Grove - Temperature Sensor connect to A0
const int push_button = 2;
uint64_t start_time, stop_time, shower_time;
uint64_t time_elasped;
uint64_t last_interrupt = 0;

bool push_button_pressed = false;
bool push_button_pressed_for_five_seconds = false;
bool get_stop_time = true;
bool dont_change_display = false;

float temp_slope_array[10];
float temp_slope_average;

int hot_shower_temp = 30;
int led_msg_display = 1;
int led_msg_display_buffer = 1;

float temperature, temperature_prev;
bool start_taking_readings = false;
bool stop_taking_readings = false;
bool reached_target_temperature = false;
bool get_initial_temp = true;
bool shower_done = false;

String inData = "";

#if defined(ARDUINO_ARCH_AVR)
#define debug  Serial
#elif defined(ARDUINO_ARCH_SAMD) ||  defined(ARDUINO_ARCH_SAM)
#define debug  SerialUSB
#else
#define debug  Serial
#endif


/**
 * Setup 
 * 
 * Init LED and Interrupt
 */
void setup()
{
  Serial.begin(9600);
  pinMode(6, OUTPUT);

  pinMode(push_button, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(push_button), push_button_isr_rising, RISING);

  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);

  lcd.setRGB(COLOR_START_R, COLOR_START_G, COLOR_START_B);

  // Print a message to the LCD.
  lcd.print("    Welcome!    ");
  lcd.setCursor(0, 1);
  lcd.print("   Warm Water   ");
  
  delay(1500);
  lcd.clear();
}

/**
 * Updates the RGB background and content depending on the status 
 * of shower
 */
void update_lcd()
{
  ///Transition from Green at start to Orange after 5 minutes and red after 10 minutes
  if(reached_target_temperature)
  {
    time_elasped = millis() - shower_time;
    
    if(time_elasped < 300000)
    {
      LED_R = COLOR_START_R - (COLOR_START_R - COLOR_INTERM_R)*((float)time_elasped/(float)(300000));
      LED_G = COLOR_START_G - (COLOR_START_G - COLOR_INTERM_G)*((float)time_elasped/(float)(300000));
      LED_B = COLOR_START_B - (COLOR_START_B - COLOR_INTERM_B)*((float)time_elasped/(float)(300000)); 
    }
    
    else if(time_elasped < 600000)
    {
      LED_R = COLOR_INTERM_R + (COLOR_STOP_R - COLOR_INTERM_R)*(((float)(time_elasped - 300000))/(float)(300000));
      LED_G = COLOR_INTERM_G + (COLOR_STOP_G - COLOR_INTERM_G)*(((float)(time_elasped - 300000))/(float)(300000));
      LED_B = COLOR_INTERM_B + (COLOR_STOP_B - COLOR_INTERM_B)*(((float)(time_elasped - 300000))/(float)(300000)); 
    }
    else if(time_elasped > 600000)
    {
      LED_R = COLOR_STOP_R;
      LED_G = COLOR_STOP_G;
      LED_B = COLOR_STOP_B;
    }
  }
  else
  {
    LED_R = COLOR_START_R;
    LED_G = COLOR_START_G;
    LED_B = COLOR_START_B;
  }
  
  lcd.setRGB(LED_R, LED_G, LED_B);

  ///Display msg on the LED display
  if(led_msg_display == 1)
  {
    lcd.setCursor(0, 0);
    lcd.print("Turn ON water to");
    lcd.setCursor(0, 1);
    lcd.print("  start shower  ");
  }
  
  if(led_msg_display == 2)
  {
    lcd.setCursor(0, 0);
    lcd.print("   Water Flow   ");
    lcd.setCursor(0, 1);
    lcd.print("    Detected    ");
    dont_change_display = true;
    if(millis() - start_time > 2000)
    {
      led_msg_display = 3;
      if(led_msg_display_buffer == 2)
        led_msg_display_buffer = 3;
      dont_change_display = false;
    }
  }
  
  if(led_msg_display == 3)
  {
    lcd.setCursor(0, 0);
    lcd.print("Heating Up Water");
    lcd.setCursor(0, 1);
    lcd.print("  Time: ");
    int seconds = ((int)((millis() - start_time)/1000)) % 60;
    int minutes = ((int)((millis() - start_time)/1000)) / 60;

    if(minutes / 10 == 0)
    {
      lcd.print("0");
      lcd.print(minutes);
    }
    else
    {
      lcd.print(minutes);
    }
    
    lcd.print(":");
    
    if(seconds / 10 == 0)
    {
      lcd.print("0");
      lcd.print(seconds);
    }
    else
    {
      lcd.print(seconds);
    }  
    lcd.print("   ");
  }
  
  if(led_msg_display == 4)
  {
    lcd.setCursor(0, 0);
    lcd.print(" Water is Warm  ");
    lcd.setCursor(0, 1);
    lcd.print("Start Showering ");
    digitalWrite(6, HIGH);
    dont_change_display = true;
    if(millis() - shower_time > 2000)
    {
      led_msg_display = 5;
      if(led_msg_display_buffer == 4)
        led_msg_display_buffer = 5;
      digitalWrite(6, LOW);
      dont_change_display = false;
    }
  }
  
  if(led_msg_display == 5)
  {
    lcd.setCursor(0, 0);
    lcd.print("   Showering    ");
    lcd.setCursor(0, 1);
    lcd.print("  Time: ");
    int seconds = ((int)((millis() - shower_time)/1000)) % 60;
    int minutes = ((int)((millis() - shower_time)/1000)) / 60;

    if(minutes / 10 == 0)
    {
      lcd.print("0");
      lcd.print(minutes);
    }
    else
    {
      lcd.print(minutes);
    }
    
    lcd.print(":");
    
    if(seconds / 10 == 0)
    {
      lcd.print("0");
      lcd.print(seconds);
    }
    else
    {
      lcd.print(seconds);
    }  
    lcd.print("   ");
  }

  if(led_msg_display == 6)
  {
    lcd.setCursor(0, 0);
    lcd.print(" Looks like you ");
    lcd.setCursor(0, 1);
    lcd.print("    are done    ");
    dont_change_display = true;
    if(millis() - stop_time > 2000)
    {
      led_msg_display = 7;
      if(led_msg_display_buffer == 6)
        led_msg_display_buffer = 7;
      dont_change_display = false;
    }
  }
  
  if(led_msg_display == 7)
  {
    lcd.setCursor(0, 0);
    lcd.print("If you are still");
    lcd.setCursor(0, 1);
    lcd.print("showring, push B");
  }

  if(led_msg_display == 8)
  {
    lcd.setCursor(0, 0);
    lcd.print(" Ending Shower  ");
    lcd.setCursor(0, 1);
    lcd.print(" Enjoy Your Day ");
    dont_change_display = true;
    if(millis() - stop_time > 2000)
    {
      led_msg_display = 1;
      if(led_msg_display_buffer == 8)
        led_msg_display_buffer = 1;
      dont_change_display = false;
    }
  }
}

/**
 * Push Button Interrupt Service Routine
 */
void push_button_isr_rising()
{
  if(millis() - last_interrupt > 200)
  {
    push_button_pressed = true;
    //Serial.println("Interrupt Triggred");
  }
  last_interrupt = millis();
}


/**
 * Main Loop
 */
 
void loop()
{
  if(!dont_change_display)
    led_msg_display = led_msg_display_buffer;
    
  update_lcd();
  
  delay(100);

  while(Serial.available())
  {
    char incoming = Serial.read();
    inData += incoming; 

    if(incoming == '\n')
    {
      char *pth = strtok(inData.c_str(), ";");
      if(strcmp(pth, "HotTemperature") == 0)
      {
        pth = strtok(NULL, "\n");
        hot_shower_temp = atof(pth);
        Serial.print("Hot Temperature Changed to;");
        Serial.print(hot_shower_temp);
        Serial.print("\n");
      }
      inData = "";
    }
  }

  int a = analogRead(pinTempSensor);

  float R = 1023.0 / a - 1.0;
  R = R0 * R;

  temperature = 1.0 / (log(R / R0) / B + 1 / 298.15) - 273.15; // convert to temperature via datasheet

  if(!get_initial_temp)
  {
      for(int i = 9; i>0; i--)
      {
        temp_slope_array[i] = temp_slope_array[i-1];
        temp_slope_average += temp_slope_array[i];
      }
      
    temp_slope_array[0] = (temperature - temperature_prev)/ 0.1; 
    temp_slope_average += temp_slope_array[0];
    temp_slope_average /= 10; 
  }

  if (get_initial_temp)
  {
    temperature_prev = temperature;
    get_initial_temp = false;
  }

  if (temperature > hot_shower_temp && start_taking_readings)
  {
    if (!reached_target_temperature && start_taking_readings)
    {
      reached_target_temperature = true;
      shower_time = millis();
      
      Serial.print("Heat Up Time;");
      Serial.print(float(shower_time - start_time) / 1000);
      
      Serial.print("; seconds\n");
      
      led_msg_display_buffer = 4;
    }
  }

  if(reached_target_temperature && false)
  {
    Serial.print("Shower Time = ");
    Serial.print(float(millis() - start_time) / 1000);
    Serial.print(" seconds\n");
  }

  if (!start_taking_readings && temp_slope_average > 1.3)
  {
    start_time = millis();
    start_taking_readings = true;
    shower_done = false;
    Serial.print("Detected Water Flow\n");
    led_msg_display_buffer = 2;
  }

  if(reached_target_temperature && !shower_done && !get_stop_time)
  {
    
    if(millis() - stop_time < 10000 && push_button_pressed)
    {
      get_stop_time = true;
      push_button_pressed = false;
      led_msg_display_buffer = 5;
    }
    
    if(millis() - stop_time > 10000)
    {
      shower_done = true;
      reached_target_temperature = false;
      start_taking_readings = false;
      get_stop_time = true;
      
      //Serial.println("Shower Done!");
      Serial.print("Shower Time Total;");
      Serial.print(float(stop_time - shower_time) / 1000);
        
      Serial.print("; seconds\n"); 
      push_button_pressed = false;
      led_msg_display_buffer = 8; 
    }
  }
  
  if(reached_target_temperature && !shower_done && temp_slope_average < -0.7)
  { 
    if(get_stop_time)
    {
      stop_time = millis();
      led_msg_display_buffer = 6;
      get_stop_time = false;
    }
  }

  temperature_prev = temperature;
  push_button_pressed = false;
}
