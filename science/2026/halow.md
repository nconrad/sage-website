---
sidebar_position: 10
sidebar_label: Long-Range Low-Power Networking
keywords: [Sage Summer Camp, Wi-Fi HaLow, Edge Computing, Low-Power Sensing]
tags: [Sage Summer Camp, Networking, Sensors & Instrumentation, Energy & Resource Management, Edge AI]
---

# Sage-HaLow — First-Pass Summary

**Authors:** Ben Owusu-Amo and Hairik Honarchian Saki ([Colorado State University](https://colostate.edu))

**Project:** A battery-powered ESP32-S3 camera node that reaches the Sage data
repository over Wi-Fi HaLow (802.11ah), at sites with no wired power and no
usable Wi-Fi. The node scores every frame on-device and only spends radio time
when the scene actually changed. Short-term goal: images and telemetry landing
in Beehive from a real deployment, plus a measured answer to "how much of what
we send is junk" — before any model gets built.

Sage Summer Camp 2026 · University of Illinois Chicago, Electronic
Visualization Laboratory (EVL).

## Hardware

- **Node:** Heltec HT-HC33 — ESP32-S3 plus a Morse Micro sub-GHz radio on one
  board. Camera, microSD, battery with a solar input.
- **Gateway:** Heltec HT-H7608 Wi-Fi HaLow gateway.
- **Edge:** Waggle/Sage node H03D (`sgt-thor-1423325056007-H03D`), which runs
  the bridge plugin.
- Camera enclosure provided by Pete for Summer Camp evaluation.

## Firmware

Each wake: capture → score → decide → (maybe) upload → deep sleep.

- **Scene score:** grid-downscaled grayscale frame diff against a stored
  reference, with a lighting-shift rejection path so sun and cloud changes do
  not trigger it.
- **State machine:** BASELINE → AROUSED → ACTIVE → COOLDOWN, with hysteresis,
  an N-frame confirm so one blip cannot trip it, and exponential backoff. The
  reference frame and FSM state persist in RTC memory and on SD across deep
  sleep.
- **Energy governor:** SoC curve, charge-rate trend, and battery bands with
  hysteresis cap what the FSM is allowed to do. Composition is
  FSM → operator override → energy cap → charge-rate promotion. 58 host tests.
- **Transport:** MQTT. ACK before delete (the SD copy survives until the base
  station ACKs), 8 KB chunking for QXGA frames, and config pushed down under a
  timestamp + expiry lease so a stale retained message cannot replay.
- **Validated on hardware 2026-07-23:** a live scene change drove
  BASELINE → AROUSED → ACTIVE → publish, end to end.

## Sage integration

`plugin-halow-camera` is the base-station receiver repackaged as a Waggle edge
app, running on node H03D. It subscribes to the broker, reassembles chunked
JPEGs, embeds EXIF, and calls `plugin.upload_file()` instead of writing to the
node's disk. The scene heartbeat becomes measurements:
`halow.camera.scene.score`, `.scene.state`, `.sleep.seconds`, `.resolution`,
`.image.bytes`, `.image.complete`.

Timestamps are nanoseconds. When a node reports `time_synced=true` the node's
own capture time is used, not the receive time — so Beehive indexes an image at
the moment it was taken, and a "last hour" query will miss a frame captured
five hours ago.

**Result:** images and telemetry are retrievable from the Sage data repository.

```
https://storage.sagecontinuum.org/api/v1/data/Pluginctl/sage-halow-bridge-latest/00004cbb4701cbaf/1785251056000000000-20260728_150416_B43A45A45644.jpg
```

_A 2048×1536 QXGA capture from camera node `B43A45A45644`, uploaded by the
plugin from node H03D and stored by Beehive; 80,979 bytes. Opening the object
requires Sage credentials (an unauthenticated `GET` returns 401), though the
measurement record itself is public through the query API. Pod `halow-bridge`
in `Running`. Built on `waggle/plugin-base:1.1.1-base` (~950 MB, no CUDA) — the
`-ml` base unpacks to roughly 25 GB and is the known cause of `Pending` pods on
this node._

**Caveat:** the frames that have crossed the plugin so far are genuine camera
captures (verified pixel-identical to
`20260723_220643_B43A45A45644.jpg`), but they were replayed onto the broker by
a test publisher under the IDs `SYNTHA`–`SYNTHD` rather than published live by
the ESP32 over HaLow in the same run. The four cases were chosen to exercise
every path: single-message upload, 5-chunk QXGA reassembly, a truncated
`_PARTIAL`, and a `_CLOCKUNSET` node. What is still untested is one continuous
live run, ESP32 → gateway → broker → plugin → Beehive.


## Not built: the model

The last stage does not exist yet. The target class decides the
model (animal, smoke, and snow line are different problems with different
training data and different costs of being wrong), decides what counts as junk
in the metric above, and decides where inference runs — a small suppressor on
the ESP32 versus a real classifier on the Waggle node's GPU, which sets the
flash, RAM, and latency budgets. Building it before the deployment is defined
means optimizing against a number nobody has measured.

## Next

1. Deploy at a site with real traffic; let the plugin carry the frames.
2. Pull `decisions.csv` off the SD card, label the batch with MegaDetector or some other AI identification model.
3. Re-read the gate for an actual GO / NO-GO.
4. Validate the energy governor on real battery and solar hardware — it has
   only ever run against a simulated state of charge.

## Acknowledgments

Firmware for the HT-HC33 platform by Ben Owusu-Amo. Heltec HT-HC33 hardware and
camera enclosure provided by Pete for evaluation during the Summer Camp. This
work was supported in part by the National Science Foundation under Awards
No. 2331263 and 2436842.
