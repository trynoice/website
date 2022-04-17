---
layout: faq
title: Does the F-Droid build collect and share analytics data?
---

The F-Droid build (free APK variant) does not collect and share analytics data.
Only the Play Store build (full APK variant) can collect and share analytics
data. Moreover, Noice doesn't upload the analytics data without explicit consent
from its users. Users can grant or revoke consent using the consent notice modal
shown on running Noice Android app for the first time. Users can also use
the **Share usage and behaviour data** option inside app settings.

Developers can further scrutinise this process by inspecting the following
sections of the source code. _The code permalinks are pinned to a specific
commit. Please find their latest versions._

1. [Analytics Provider implementation for the free APK
   variant](https://github.com/ashutoshgngwr/noice/blob/c44e3250392fb6463deb6b76e577c6f1c9679d3d/app/src/main/java/com/github/ashutoshgngwr/noice/provider/AnalyticsProvider.kt#L55-L63)
2. [Analytics Provider implementation for the full APK
   variant](https://github.com/ashutoshgngwr/noice/blob/main/app/src/full/java/com/github/ashutoshgngwr/noice/provider/RealAnalyticsProvider.kt)
3. [Android Manifest for full APK
   variant](https://github.com/ashutoshgngwr/noice/blob/main/app/src/full/AndroidManifest.xml)
   that disables analytics data sharing by default. It also permanently disables
   the collection of Advertising IDs and Secure Settings Android IDs.
4. [Consent
   Notice](https://github.com/ashutoshgngwr/noice/blob/0b8ed7b0ef0c0de5068259dfee79f81f553a6f06/app/src/main/java/com/github/ashutoshgngwr/noice/activity/MainActivity.kt#L77-L102)
   that users see on the first launch, which only enables data sharing if you
   click "Accept".
