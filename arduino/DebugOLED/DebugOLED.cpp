#include "DebugOLED.h"

DebugOLED::DebugOLED(int8_t rst, uint8_t linesMax)
{
	uint8_t i=0;

	this->linesMax = linesMax;

	display = new Adafruit_SSD1306(rst);

	lines = (char **)malloc(sizeof(char *)*linesMax);
	for(i=0;i<linesMax;i++)
	{
		lines[i] = (char *)malloc(DEBUG_OLED_MAX_LINE_LENGTH);
	}
}

void DebugOLED::setup()
{
	uint8_t i;
	char buf[256];

	display->begin(SSD1306_SWITCHCAPVCC, 0x3D);
	display->setTextSize(1);
	display->setTextColor(WHITE);
	display->setCursor(0,0);
	display->display();
	display->clearDisplay();

	for(i=0;i<linesMax;i++)
	{
		memset(lines[i], 0, DEBUG_OLED_MAX_LINE_LENGTH+1);
	}
}

void DebugOLED::println(const char * text)
{
	uint8_t i;

	if(linesPrinted<linesMax)
	{
		strncpy(lines[linesPrinted], text, min(strlen(text), DEBUG_OLED_MAX_LINE_LENGTH));
		display->println(lines[linesPrinted]);
		linesPrinted++;
	}
	else
	{
		display->clearDisplay();
		display->setCursor(0,0);

		for(i=0;i<(linesMax-1);i++)
		{
			memset(lines[i], 0, DEBUG_OLED_MAX_LINE_LENGTH+1);
			strncpy(lines[i], lines[(i+1)], min(strlen(lines[(i+1)]), DEBUG_OLED_MAX_LINE_LENGTH));
			display->println(lines[i]);
		}

		memset(lines[(linesMax-1)], 0, DEBUG_OLED_MAX_LINE_LENGTH+1);
		strncpy(lines[(linesMax-1)], text, min(strlen(text), DEBUG_OLED_MAX_LINE_LENGTH));
		display->println(lines[(linesMax-1)]);
	}

	display->display();
}
