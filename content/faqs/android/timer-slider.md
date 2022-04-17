---
layout: faq
title: What does the timer slider do?
---

Some sounds in Noice are noncontiguous, i.e. these do not loop continuously,
e.g. Thunder. Noice waits a random amount of duration before replaying these
sounds. The timer slider adjusts the upper bound for the delay at each
repetition of such sounds. Noice uses 30 seconds as the lower bound for this
delay. So if you set the timer slider of a sound at 60 seconds, Noice will
choose a random number between 30 and 60 and wait for that duration before
playing the sound again.
