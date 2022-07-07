---
layout: default
title: How do I start a preset using Tasker?
---

Noice allows external apps like
[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)
to start presets using preset URLs. To do so, you can launch an intent with
`android.intent.action.VIEW` action and the preset URL as intent's data. The
preset URLs are self-contained and can work without the Internet. To obtain a
preset's URL, you can follow the steps below.

1. Navigate to the **Presets** tab from the bottom bar.
2. Find the preset you want to play and open its context menu by clicking the
   inverted triangle button.
3. Select the **Share** option from the context menu.
4. Select the **Copy Link** button in the **Share** system modal.
