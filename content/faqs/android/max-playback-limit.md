---
title: Is there a maximum time limit to the playback on Android?
---

The Android app imposes a timeout of 24 hours. We specify this timeout on
acquiring permissions from the Android system to keep the device CPU awake
during playback. It means that playback, in theory, should continue to play for
the entirety of this duration. We don't impose any other time limits on
playback.

If Noice stops its playback unexpectedly before this duration is over, it might
be because of battery optimisations enforced by the OS. You can disable battery
optimisation for Noice by navigating to **Device Settings > Apps > Noice >
Battery**. The exact steps may vary depending on the Android version and device
manufacturer.
