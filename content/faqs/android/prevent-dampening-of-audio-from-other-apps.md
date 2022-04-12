---
title: How do I prevent Noice from dampening the audio volume of other apps?
---

The dampening of the audio volume of other apps is the expected behaviour. Noice
requests [transient audio
focus](https://developer.android.com/reference/android/media/AudioManager#AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK)
from the Android system before playing any sounds. Apps usually use this type of
audio focus to play notification sounds. The Android framework dampens the audio
volume of other apps to comply with this request. It allows Noice to play its
audio alongside other apps.

To prevent Noice from dampening the audio volume of other apps, you can follow
the steps below.

1. Navigate to the **Account** tab from the bottom bar.
2. Click the **Settings** option in the **App** category from the **Account**
   screen.
3. Enable the "Ignore audio focus change" option under the **Behaviour**
   category.

After enabling this option, Noice plays audio without requesting audio focus
from the Android system. Its side-effect is that the Android system stops
notifying Noice when other apps play audio. Therefore, Noice won't pause its
playback when other apps play their audio, e.g. when the Phone app plays a
ringtone on receiving a call. Hence, we do not recommend enabling this option.
