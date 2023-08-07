---
layout: default
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

1. [Analytics Provider
   interface](https://github.com/trynoice/android-app/blob/29f78df24c4ce2939c7b633a5fb231cef19758ed/app/src/main/java/com/github/ashutoshgngwr/noice/metrics/AnalyticsProvider.kt).
2. [Analytics Provider
   implementation](https://github.com/trynoice/android-app/blob/29f78df24c4ce2939c7b633a5fb231cef19758ed/app/src/free/java/com/github/ashutoshgngwr/noice/di/AnalyticsProviderModule.kt)
   used in the free APK variant.
3. [Analytics Provider
   implementation](https://github.com/trynoice/android-app/blob/29f78df24c4ce2939c7b633a5fb231cef19758ed/app/src/full/java/com/github/ashutoshgngwr/noice/di/AnalyticsProviderModule.kt)
   used in the full APK variant.
4. [Android Manifest for full APK
   variant](https://github.com/trynoice/android-app/blob/main/app/src/full/AndroidManifest.xml)
   that disables analytics data sharing by default. It also permanently disables
   the collection of Advertising IDs and Secure Settings Android IDs.
5. [Consent
   Notice](https://github.com/trynoice/android-app/blob/29f78df24c4ce2939c7b633a5fb231cef19758ed/app/src/main/java/com/github/ashutoshgngwr/noice/activity/MainActivity.kt#L128-L142)
   users see on the first launch that only enables data sharing if you click
   "Accept".
