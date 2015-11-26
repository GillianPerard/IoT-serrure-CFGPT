using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Devices.Gpio;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Networking.Sockets;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// Pour plus d'informations sur le modèle d'élément Page vierge, consultez la page http://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace App1
{
    /// <summary>
    /// Une page vide peut être utilisée seule ou constituer une page de destination au sein d'un frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        private GpioPin buttonPin;
        private GpioPin buttonPin2;
        public MainPage()
        {
            this.InitializeComponent();
            //GPIO();
            //InitDancing();

            stopwatch = Stopwatch.StartNew();

            GpioController gpio = GpioController.GetDefault();
            buttonPin = gpio.OpenPin(21);
            if (buttonPin.IsDriveModeSupported(GpioPinDriveMode.InputPullUp))
                buttonPin.SetDriveMode(GpioPinDriveMode.InputPullUp);
            else
                buttonPin.SetDriveMode(GpioPinDriveMode.Input);
            buttonPin.DebounceTimeout = TimeSpan.FromMilliseconds(50);

            buttonPin2 = gpio.OpenPin(20);
            if (buttonPin2.IsDriveModeSupported(GpioPinDriveMode.InputPullUp))
                buttonPin2.SetDriveMode(GpioPinDriveMode.InputPullUp);
            else
                buttonPin2.SetDriveMode(GpioPinDriveMode.Input);
            buttonPin2.DebounceTimeout = TimeSpan.FromMilliseconds(50);

            timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromMilliseconds(BEAT_PACE);
            timer.Tick += Beat;
            
            servoPinA = gpio.OpenPin(SERVO_PIN_A);
            servoPinA.SetDriveMode(GpioPinDriveMode.Output);
            buttonPin.ValueChanged += Pin1_ValueChanged;
            buttonPin2.ValueChanged += ButtonPin2_ValueChanged;

            force();
            //AsyncFunc();

            //WebSocket();
        }

        private async void force()
        {
            while (true)
            {
                try
                {
                    await Windows.System.Threading.ThreadPool.RunAsync(this.MotorThread, Windows.System.Threading.WorkItemPriority.High);
                }
                catch (Exception)
                {
                }
            }
        }

        private void ButtonPin2_ValueChanged(GpioPin sender, GpioPinValueChangedEventArgs args)
        {
            try
            {
                if (args.Edge == GpioPinEdge.FallingEdge)
                {
                    currentDirection = currentDirection == 1 ? 2 : 1;
                    active = true;
                    //action = Windows.System.Threading.ThreadPool.RunAsync(this.MotorThread, Windows.System.Threading.WorkItemPriority.High);
                }
                else
                {
                    active = false;
                    //action?.Cancel();
                    //action = null;
                }
            }
            catch (Exception)
            {
            }
        }

        private async void WebSocket()
        {
            try
            {
                Uri uri = new Uri("ws://169.254.195.254:1337");
                HttpClient client = new HttpClient();


                //var tot = new Windows.Networking.Sockets.StreamWebSocket();
                //await tot.ConnectAsync(uri);

                var result = await client.PostAsync("http://169.254.195.254:1337/app/connectedobjects/ringring", new System.Net.Http.StringContent(@"{ ""tokenObject"": ""fefedeizzef84zfse8fz"" }"));
                MessageWebSocket message = new MessageWebSocket();
                
                message.Closed += Message_Closed;
                message.MessageReceived += Message_MessageReceived;
                await message.ConnectAsync(uri);
                //await message.ConnectAsync(new Uri("ws://169.254.195.254:1337/connectedobjects/fefedeizzef84zfse8fz/connectedObjectSubscribe"));
            }
            catch (Exception)
            {
                
            }
        }

        private async void AsyncFunc()
        {
            try
            {
                HttpClient client = new HttpClient();
                var result = await client.PostAsync("http://169.254.195.254:1337/app/connectedobjects/ringring", new System.Net.Http.StringContent(@"{ ""tokenObject"": ""fefedeizzef84zfse8fz"" }"));

                //var sdf = new DispatcherTimer() { Interval = TimeSpan.FromSeconds(5) };
                //sdf.Tick += (e,d) => {
                //    currentDirection = currentDirection == 1 ? 2 : 1;

                //    active = !active;
                //    if (!active)
                //    {
                //        sdf.Stop();
                //    }
                //};
                //sdf.Start();
            }
            catch (Exception)
            {
            }
        }

        private void Message_MessageReceived(MessageWebSocket sender, MessageWebSocketMessageReceivedEventArgs args)
        {
        }

        private void Message_Closed(IWebSocket sender, WebSocketClosedEventArgs args)
        {
        }

        IAsyncAction action;

        public void GPIO()
        {
            // Get the default GPIO controller on the system
            GpioController gpio = GpioController.GetDefault();
            if (gpio == null)
                return; // GPIO not available on this system


            // Open GPIO 5
            using (GpioPin pin = gpio.OpenPin(47))
            {
                // Latch HIGH value first. This ensures a default value when the pin is set as output
                pin.Write(GpioPinValue.High);

                // Set the IO direction as output
                pin.SetDriveMode(GpioPinDriveMode.Output);

            } // Close pin - will revert to its power-on state 
        }

        bool active = false;
        private void Pin1_ValueChanged(GpioPin sender, GpioPinValueChangedEventArgs args)
        {
            try
            {
                //if (args.Edge == GpioPinEdge.FallingEdge)
                //{
                //    currentDirection = currentDirection == 1 ? 2 : 1;
                //    active = true;
                //    //action = Windows.System.Threading.ThreadPool.RunAsync(this.MotorThread, Windows.System.Threading.WorkItemPriority.High);
                //}
                //else
                //{
                //    active = false;
                //    //action?.Cancel();
                //    //action = null;
                //}
                if (args.Edge == GpioPinEdge.FallingEdge)
                {
                    AsyncFunc();
                }
            }
            catch (Exception)
            {
            }
        }

        private const int SERVO_PIN_A = 18;
        private GpioPin servoPinA;
        private DispatcherTimer timer;
        private double BEAT_PACE = 1000;
        private double CounterClockwiseDanceMove = 1;
        private double ClockwiseDanceMove = 2;
        private double currentDirection;
        private double PulseFrequency = 20;
        private Stopwatch stopwatch;

        private void InitDancing()
        {
            // Preparing our GPIO controller
            var gpio = GpioController.GetDefault();

            if (gpio == null)
            {
                servoPinA = null;

                return;
            }

            // Servo set up
            servoPinA = gpio.OpenPin(SERVO_PIN_A);
            servoPinA.SetDriveMode(GpioPinDriveMode.Output);

            stopwatch = Stopwatch.StartNew();

            currentDirection = 0; // Initially we aren't dancing at all.

            timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromMilliseconds(BEAT_PACE);
            timer.Tick += Beat;

            if (servoPinA != null)
            {
                timer.Start();
                Windows.System.Threading.ThreadPool.RunAsync(this.MotorThread, Windows.System.Threading.WorkItemPriority.High);
            }
        }

        private void Beat(object sender, object e)
        {
            if (currentDirection != ClockwiseDanceMove)
            {
                currentDirection = ClockwiseDanceMove;
            }
            else
            {
                currentDirection = CounterClockwiseDanceMove;
            }
        }

        private void MotorThread(IAsyncAction action)
        {
            while (action.Status != AsyncStatus.Canceled)
            {
                if (active)
                {
                    if (currentDirection != 0)
                    {
                        servoPinA.Write(GpioPinValue.High);
                    }

                    Wait(currentDirection);

                    servoPinA.Write(GpioPinValue.Low);
                }

                Wait(PulseFrequency - currentDirection);
            }
        }

        private void Wait(double milliseconds)
        {
            try
            {
                long initialTick = stopwatch.ElapsedTicks;
                long initialElapsed = stopwatch.ElapsedMilliseconds;
                double desiredTicks = milliseconds / 1000.0 * Stopwatch.Frequency;
                double finalTick = initialTick + desiredTicks;
                while (stopwatch.ElapsedTicks < finalTick)
                {

                }
            }
            catch (Exception)
            {
            }
        }
    }

}