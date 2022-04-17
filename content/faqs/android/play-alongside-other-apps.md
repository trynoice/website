---
layout: faq
title: How do I play Noice alongside other audio apps?
---

Noice is capable of playing sounds alongside most of the other audio apps. It
does so by using audio focus.

## What is Audio focus?

The following is an excerpt from the [official
guide](https://developer.android.com/guide/topics/media-apps/audio-focus)
explaining the audio focus.

> Two or more Android apps can play audio to the same output stream
> simultaneously, and the system mixes everything together. While this is
> technically impressive, it can be very aggravating to a user. To avoid every
> music app playing at the same time, Android introduces the idea of audio
> focus. Only one app can hold audio focus at a time.

Before playing any sounds, Noice requests [transient audio
focus](https://developer.android.com/reference/android/media/AudioManager#AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK)
from the Android system. Apps generally use it to play short audio (notification
sounds). When Noice requests it, the Android system asks the current audio focus
holder app to duck (lower) its volume. Noice, by default, leverages this
behaviour to play its audio alongside other apps.

## Recommended method

Due to how Noice handles audio focus management, it can play alongside other
audio apps by default. All you need to do is play the audio in the other app
before playing Noice. This approach has the limitation that the other app will
lower its audio volume when both apps are playing the audio.

## Ignoring audio focus changes

The Android System recommends that apps acquire audio focus before playing
audio, but it is not mandatory. You can enable **Ignore audio focus change**
option to play Noice alongside other apps without lowering their volume.

Enabling this option prevents Noice from requesting audio focus from the Android
System. The Android System still allows Noice to play audio, but it will not
notify Noice when other apps play audio. Hence, other apps can play their audio
completely unaware of Noice and vice versa. This behaviour may be undesirable in
some cases. Therefore, **we do not recommend it**. To enable it, follow the
steps below.

1. Navigate to the **Account** tab from the bottom bar.
2. Click the **Settings** option in the **App** category from the **Account**
   screen.
3. Enable the **Ignore audio focus change** option under the **Behaviour**
   category.
