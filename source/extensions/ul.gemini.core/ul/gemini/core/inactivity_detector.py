import omni
import carb
import time
import asyncio
from carb.input import KeyboardEventType
import omni.kit.notification_manager as nm
import requests
import os  # Added import for checking file existence

class InactivityTracker:
    def __init__(self, inactivity_threshold= 15 * 60):
        self.last_activity_time = time.time()
        self.inactivity_threshold = inactivity_threshold
        self.first_notification_time = inactivity_threshold / 3
        self.second_notification_time = 2 * inactivity_threshold / 3
        self.first_notification_sent = False
        self.second_notification_sent = False
        self.busy_file_path = "C:\\TwinServer\\Twin\\apps\\data\\Busy.txt"  # Path to Busy.txt

        asyncio.ensure_future(self._check_inactivity())

    def send_notification(self, message: str):
        active_button = nm.NotificationButtonInfo("I'm here", on_complete=self._reset_timer)
        end_session = nm.NotificationButtonInfo("End session", on_complete=self._end_session)
        nm.post_notification(
            message,
            hide_after_timeout=False,
            duration=0,
            status=nm.NotificationStatus.WARNING,
            button_infos=[active_button, end_session]
        )

    def _end_session(self):
        print("Ending session")
        twin_server_url = "http://3.15.101.114:8080/shutdown"
        requests.post(
            twin_server_url,
            json={
                "public_ip": requests.get('https://api.ipify.org').text,
            }
        )

    def _reset_timer(self):
        self.last_activity_time = time.time()
        self.first_notification_sent = False
        self.second_notification_sent = False

    async def _check_inactivity(self):
        # Check for Busy.txt file existence before starting inactivity tracking
        # !need to implement autoshutdown when this is in Dead state on remote solution
        while not os.path.exists(self.busy_file_path):
            #print("Busy.txt not found, waiting 10 seconds before checking again...")  # Log message for testing
            self._reset_timer()
            await asyncio.sleep(10)  # Wait 10 seconds before checking again

        print("Busy.txt found! Starting inactivity tracking...")  # Log message for when Busy.txt is found

        # Start inactivity checks only after Busy.txt is found
        while os.path.exists(self.busy_file_path):
            current_time = time.time()
            inactivity_duration = current_time - self.last_activity_time

            if inactivity_duration > self.first_notification_time and not self.first_notification_sent:
                self.send_notification(f"You was AFK for 5 minutes. Do you want to end your session?")
                self.first_notification_sent = True

            if inactivity_duration > self.second_notification_time and not self.second_notification_sent:
                self.send_notification(f"You was AFK for 10 minutes. Your session will end in 5 minutes.")
                self.second_notification_sent = True

            if inactivity_duration > self.inactivity_threshold:
                self._reset_timer()
                twin_server_url = "http://3.15.101.114:8080/shutdown"
                requests.post(
                    twin_server_url,
                    json={
                        "public_ip": requests.get('https://api.ipify.org').text,
                    }
                )

            await asyncio.sleep(30)  # Check inactivity every 30 seconds
