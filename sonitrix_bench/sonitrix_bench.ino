#include <LiquidCrystal.h>

LiquidCrystal lcd(8, 9, 4, 5, 6, 7);

const int BUZZER_PIN = 24; 
int alarmMode = 0; // 0 = Off, 1 = Continuous, 2 = Fast Beep, 3 = Slow Pulse

void setup() {
  lcd.begin(16, 2);
  lcd.print("Sonitrix Bench");
  
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(10, OUTPUT);
  digitalWrite(10, HIGH); // Backlight ON
}

void loop() {
  int buttonValue = analogRead(A0);
  
  if (buttonValue < 50) {
    alarmMode = 1; // RIGHT button 
  } else if (buttonValue < 250) {
    alarmMode = 2; // UP button 
  } else if (buttonValue < 450) {
    alarmMode = 3; // DOWN button 
  } else if (buttonValue < 850) {
    alarmMode = 0; // SELECT/LEFT button
  }

  lcd.setCursor(0, 1);
  if (alarmMode == 0) {
    lcd.print("Mode: MUTED");
    digitalWrite(BUZZER_PIN, LOW);
    delay(100);
  } 
  else if (alarmMode == 1) {
    lcd.print("Mode: SOLID TONE");
    digitalWrite(BUZZER_PIN, HIGH);
    delay(100);
  } 
  else if (alarmMode == 2) {
    lcd.print("Mode: FAST BEEP ");
    digitalWrite(BUZZER_PIN, HIGH);
    delay(80);
    digitalWrite(BUZZER_PIN, LOW);
    delay(80);
  } 
  else if (alarmMode == 3) {
    lcd.print("Mode: SLOW PULSE");
    digitalWrite(BUZZER_PIN, HIGH);
    delay(400);
    digitalWrite(BUZZER_PIN, LOW);
    delay(400);
  }
}