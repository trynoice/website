---
layout: default
title: v2 Announcement
publishedAt: 2021-09-21T18:16:00+05:30
---

When we began in 2019, Noice was just under 3 MBs packed with tiny, low-quality
sounds. It has grown a lot since then. Last year, we introduced an advanced
dual-sampled sound engine, an idea offered by a user. Most of the sounds played
two audio in parallel to create an illusion of a single long audio. It allowed
Noice to work fully offline while maintaining comparable audio quality and
surpassing the performance of its peers.

## It's time to rethink our priorities

Over time, we have gathered ample feedback from our users. While we promptly
acted on the most, some of it requires changes at a basic level. Starting
v2.0.0, we will begin phased releases incorporating these changes.

### State-of-the-art sound engine

The dual-sampled sound engine works well, but it's time for the next best thing.
The operating principle for our peers is looping a 5-30 mins sound indefinitely.
We want to change that by building a sound engine to generate highly dynamic
soundscapes that feel more natural.

### Remote sound library

With growing requirements, we no longer think it best to pack sounds with the
APK. It raises the APK size and doesn't allow for longer or many sounds. We'll
start serving the library over the internet to remove these constraints.

### Cross-platform service

Cross-platform operation has always been a concern. Therefore, we'll begin
shipping a web interface along with the hosted library in the coming releases.
It will make Noice available to virtually every device with an Internet browser.

### For creators

Many bad reviews on the Play Store indicate that creators want to export
soundscapes to use them in their videos. We'll be working on facilitating this
on both the software and the audio licensing levels.

### A freemium model to sustain future development

We found the "pay what you want" model unsustainable for Noice. It has barely
generated any revenue in the past year. Noice has upwards of 6k active users
from Google Play and some more from untrackable sources. Hence, we've decided to
offer paid subscriptions. Noice will remain open-source, and whatever was free
before will be free forever. However, many new features will require an active
subscription.
