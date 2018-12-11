---
title: Linux中kbhit()函数的实现(检测按键)
copyright: true
date: 2017-12-16 21:03:54
categories: C和C++
tags:
---
## 第一种方案
<!-- more -->

``` bash
#include <stdio.h>  
#include <termios.h>  
#include <term.h>  

#include <curses.h>  
#include <unistd.h>  
#include  <stdlib.h>  
static struct termios initial_settings, new_settings;  
static int peek_character = -1;  
void init_keyboard();  
void close_keyboard();  
int kbhit();  
int readch();  
  
int main()  
{  
    int ch = 0;  
    init_keyboard();  
    while(ch != 'q') {  
        printf("looping\n");  
        sleep(1);  
        if(kbhit()) {  
            ch = readch();  
            printf("you hit %c\n",ch);  
        }  
    }  
    close_keyboard();  
    exit(0);  
    return 0;  
}  
  
void init_keyboard()  
{  
    tcgetattr(0,&initial_settings);  
    new_settings = initial_settings;  
    new_settings.c_lflag &= ~ICANON;  
    new_settings.c_lflag &= ~ECHO;  
    new_settings.c_lflag &= ~ISIG;  
    new_settings.c_cc[VMIN] = 1;  
    new_settings.c_cc[VTIME] = 0;  
    tcsetattr(0, TCSANOW, &new_settings);  
}  
void close_keyboard()  
{  
    tcsetattr(0, TCSANOW, &initial_settings);  
}  
  
int kbhit()  
{  
    char ch;  
    int nread;  
    if(peek_character != -1)  
        return 1;  
    new_settings.c_cc[VMIN]=0;  
    tcsetattr(0, TCSANOW, &new_settings);  
    nread = read(0,&ch,1);  
    new_settings.c_cc[VMIN]=1;  
    tcsetattr(0, TCSANOW, &new_settings);  
if(nread == 1) {  
      peek_character = ch;  
      return 1;  
}  
return 0;  
}  
  
int readch()  
{  
    char ch;  
    if(peek_character != -1) {  
        ch = peek_character;  
        peek_character = -1;  
        return ch;  
    }  
    read(0,&ch,1);  
    return ch;  
}  
```
```
## 第二种方案
 //用非阻塞io  
#include <stdio.h>  
#include <termios.h>  
#include <unistd.h>  
#include <fcntl.h>  
int kbhit(void)  
{  
struct termios oldt, newt;  
int ch;  
int oldf;  
tcgetattr(STDIN_FILENO, &oldt);  
newt = oldt;  
newt.c_lflag &= ~(ICANON | ECHO);  
tcsetattr(STDIN_FILENO, TCSANOW, &newt);  
oldf = fcntl(STDIN_FILENO, F_GETFL, 0);  
fcntl(STDIN_FILENO, F_SETFL, oldf | O_NONBLOCK);  
ch = getchar();  
tcsetattr(STDIN_FILENO, TCSANOW, &oldt);  
fcntl(STDIN_FILENO, F_SETFL, oldf);  
if(ch != EOF)  
{  
ungetc(ch, stdin);  
return 1;  
}  
return 0;  
}  
int main(void)  
{  
while(!kbhit())  
puts("Press a key!");  
printf("You pressed '%c'!/n", getchar());  
return 0;  
}  
```
