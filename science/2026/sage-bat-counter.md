---
sidebar_position: 8
sidebar_label: Bat Activity Monitoring
keywords: [Sage Summer Camp, Bats, Computer Vision, Edge Computing]
tags: [Sage Summer Camp, Bats, Computer Vision, Edge Computing]
---

# Sage Bat Counter

**Authors:** Noah Betoshana and Liam Fitzpatrick

## Introduction

Monitoring bat populations is important for understanding ecosystem health, but processing thermal video is usually done offline on a desktop or workstation after the data has already been collected. This creates a delay between collecting the data and getting useful results, and it requires storing and transferring large video files.

Our project explores how an existing bat detection and tracking pipeline can be adapted for edge computing using SAGE Grande. Rather than changing the bat-counting algorithm itself, we focused on making it practical to deploy on SAGE nodes so that bat detections and counts can be generated directly where the video is captured.

The original pipeline, developed by Sarah Lagattuta, uses a pretrained YOLOv11 model together with the SORT tracking algorithm to detect, track, and count bats in thermal video. Our goal was to package this workflow for deployment on SAGE hardware while preserving the original detection and tracking capabilities.

![Thermal video of bats](/img/science/sage-bat-counter/thermal-video-bats.png)

## Project Goals

Our objectives for the project were to:

* Deploy the bat-counting pipeline on a SAGE Grande edge node.
* Containerize the application so it could be easily deployed on compatible hardware.
* Support both prerecorded thermal videos and live camera streams.
* Reduce the amount of manual setup required to run the application on a node.
* Create documentation so the deployment process could be reproduced by future users.

## Our Work

Most of our work focused on adapting software that was originally written for desktop execution to run on ARM-based SAGE hardware with NVIDIA GPU acceleration.

We containerized the application, updated it to accept live camera input in addition to recorded videos, and worked through deployment challenges related to CUDA compatibility, ARM architecture, and GPU access inside containers. We also simplified the workflow so that running the application required only a small number of command-line arguments instead of manually configuring the environment each time.

Throughout the project, we repeatedly tested the application on SAGE Grande hardware, debugging deployment issues and verifying that the original bat detection and tracking pipeline continued to function correctly after being moved to the edge.

![Original inference pipeline with Sage plugin wrapper](/img/science/sage-bat-counter/sage-bat-counter-flowchart.jpg)

## Current Status

By the end of the project, the bat-counting pipeline successfully runs on SAGE Grande inside a container while supporting both prerecorded videos and live camera input. The project demonstrates that an existing computer vision workflow can be adapted for edge deployment without requiring major changes to the underlying detection and tracking algorithms.

![Resulting data from test video on a Sage node](/img/science/sage-bat-counter/test-results.png)

## Future Work

There are still several directions that would make the system more useful for long-term deployments. Ideally, the application would start automatically whenever a SAGE node powers on, allowing it to operate without manual intervention. Additional improvements include configurable regions of interest, scheduled nightly monitoring, and automatically uploading bat counts to a central database for long-term population studies.

## What We Learned

This project gave us experience deploying AI applications on edge hardware instead of traditional desktop systems. We learned about containerization, GPU deployment, CUDA compatibility, and some of the challenges of running computer vision workloads on ARM-based devices. We also gained a better understanding of how edge computing can support ecological monitoring by processing data directly where it is collected rather than relying on cloud-based processing.

## References

1. Sarah Lagattuta. *Bat Counting with YOLOv11-SORT*. GitHub repository. Available at: [https://github.com/Sarah-Lagattuta/Bat-Counting-YOLOv11-SORT](https://github.com/Sarah-Lagattuta/Bat-Counting-YOLOv11-SORT)
