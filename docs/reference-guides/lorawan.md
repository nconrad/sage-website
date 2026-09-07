---
sidebar_label: LoRaWAN
sidebar_position: 3
---

# LoRaWAN

## What is LoRaWAN?

LoRaWAN, short for "Long Range Wide Area Network," is a wireless communication protocol designed for low-power, long-range communication between IoT (Internet of Things) devices. It employs a low-power wide-area network (LPWAN) technology, making it ideal for connecting remote sensors and devices. For more information view the documentation [here](https://www.thethingsnetwork.org/docs/lorawan/).

## Why use LoRaWAN?

LoRaWAN is a powerful technology that offers several advantages for all sorts of applications, particularly in scenarios where long-range communication and low power consumption are essential. Here are some key benefits of using LoRaWAN:

- **Low Power Consumption**
  - Ideal for battery-powered devices
  - Sensor nodes can last 5–10 years on a single battery
- **Low Bandwidth**
  - Efficient for transmitting small packets of information
  - Not suitable for continuous data transmission
  - Standard enforces duty cycle limits to preserve network integrity
- **Long-Range** (terrain, obstructions, antenna, and lorawan setting dependent)
   - Dense environments (e.g., forest, ground-level): up to 2–5 km
   - Optimal conditions (high antenna, clear line-of-sight): up to 15 km

## Capabilities

Using our LoRaWAN implementation, you can connect a wide range of LoRaWAN devices to your [Node](../about/architecture.md#nodes) and publish measurements to the [Beehive](../about/architecture.md#beehive). The following metrics provide an overview of the capabilities of LoRaWAN in the Sage ecosystem:

- **Device Volume**: Up to 500 lora devices per km² in an environment with moderate interference.
- **Maximum Payload Size**: 11 - ~222 bytes 
  - depends on bit rate and LoRaWAN Media Access Control (MAC) version, anything over 222 bytes starts getting MAC version specific.
- **Frequency**: 903.9 - 905.3 MHz
- **Bandwith**: 125 kHz
- **Speed (Bitrate)**: 980 - 5470 bps
  - depends on the range, payload size, LoRaWAN device power, and environment
- **Maximum Signal Range**: 1129.8m
  - This can improve, it heavily depends on the environment (eg. Dense environment vs optimal conditions).
- **Spreading Factors (SF)**: 9 - 12 
  - increasing spreading factor also increases range

>NOTE: These values vary per region plan, these are for **US915**.

Payload Size, Bitrate, and Range are correlated so they are grouped by Spreading Factor in Lorawan: 
- As Spreading Factor increases, Range also increases, but Maximum Payload Size and Bitrate decreases. 
- Longest range: SF 12 has a maximum payload size of 11 bytes and a Bitrate of 980 bps.
- Shortest Range: SF 9 has a maximum payload size of ~222 bytes and a bit rate of 5470 bps

## Signal Range
The map below illustrates range test results from our typical LoRaWAN deployments using a [RAK2287](https://docs.rakwireless.com/product-categories/wislink/rak2287/datasheet/) gateway paired with a [RAK 5.8dBi Fiberglass](https://docs.rakwireless.com/product-categories/accessories/rakarg14/datasheet/) antenna. These tests were conducted at [Argonne National Laboratory](https://www.anl.gov/), an urban environment with moderate interference.

Please note that signal range is highly dependent on environmental conditions. While this data offers a general estimate of expected performance, actual range may vary significantly based on terrain, obstacles, and local interference. We strongly recommend performing range tests in your specific deployment environment to determine real-world performance.

Although these results are specific to Argonne, they serve as a useful reference for what you can expect when using our typical LoRaWAN hardware.

<iframe src="/html/lorawan/lorawan_packet_map.html" width="100%" height="600"></iframe>
>NOTE: The map is interactive, allowing you to zoom in and out to explore specific areas. You can also click on individual pins to view detailed results for that location, including metrics broken down by packet size and spreading factor. The pop-up will display average [RSSI](https://www.thethingsnetwork.org/docs/lorawan/rssi-and-snr/#rssi), average [SNR](https://www.thethingsnetwork.org/docs/lorawan/rssi-and-snr/#snr), and packet loss ratio.

To see the full results, including the raw data used to generate this map, please visit our [GitHub repository](https://github.com/waggle-sensor/Lorawan-Packet-Test).

## Lorawan Device Compatibility

our [Nodes](../about/architecture.md#nodes) are designed to support a wide range of Lorawan devices, ensuring flexibility and adaptability for various applications. If you are wondering which Lorawan devices can be connected to a [Node](../about/architecture.md#nodes), the device must have the following tech specs:

- designed for US915 (902–928 MHz) frequency region.
- compatible with Lorawan Mac versions 1.0.0 - 1.1.0
- compatible with Chirpstack's Lorawan Network Server
- The device supports Over-The-Air Activation (OTAA) or Activation By Personalization (ABP)
- The device has a Lorawan device class of A, B, or C

It is important to note that our [Nodes](../about/architecture.md#nodes) use US915 sub band 2 (903.9-905.3 MHz). If you wish to learn more about our Lorawan Gateway, please visit our [portal](https://portal.sagecontinuum.org/sensors/). For international deployments, we will follow the local frequency guidelines and ensure the appropriate radio module is installed on the nodes.

### Device Examples

Whether you are designing your own Lorawan sensor, looking for a Lorawan data logger, or seeking an off-the-shelf Lorawan device our [Nodes](../about/architecture.md#nodes) will support it, we have examples for you:

- **Designing your own Lorawan sensor?**
  - [Arduino MKR WAN 1310](https://docs.arduino.cc/hardware/mkr-wan-1310/)
  - [RAK7434 WisNode Bridge Analog](https://docs.rakwireless.com/product-categories/wisnode/rak7432-rak7434)

- **Looking for a Lorawan data logger?**
  - [ICT International MFR Node](https://ictinternational.com/product/mfr-node/)

- **Looking for an off-the-shelf Lorawan device?**
  - [ICT International SFM1X Sap Flow Meter](https://ictinternational.com/product/sfm1x-sap-flow-meter/)

- **Seeking Lorawan device manufacturers?**
  - [ICT International](https://ictinternational.com/)
  - [RAKwireless](https://www.rakwireless.com/en-us)
  - [The Things Network Device Marketplace](https://www.thethingsnetwork.org/marketplace/products/devices)
  - [DecentLab](https://www.decentlab.com)

## Lorawan Device Profile Templates

[Device Profile Templates](https://www.chirpstack.io/docs/chirpstack/use/device-profile-templates.html#device-profile-templates) simplify the process of onboarding devices to a Node's ChirpStack server. You can create a device template directly through the Node's ChirpStack server UI or by contributing to our [Device Repository](https://github.com/waggle-sensor/wes-lorawan-device-templates?tab=readme-ov-file#waggle-device-repository-for-lorawan). 

The Device Repository is a key resource that contains information about various LoRaWAN end devices, making it easier to catalog and onboard these devices to our Nodes' ChirpStack servers. We encourage you to contribute details about your devices to help other Sage users efficiently connect their devices. Once your device is added to our repository, it becomes available across all Nodes, streamlining the workflow for anyone who wants to connect a similar Lorawan device to a Node.

>NOTE: Node's sync with our Device Repository every hour.

If you prefer to keep your device configuration private, you can still add it directly to a Node's ChirpStack server using the UI. In this case, the configuration will remain exclusive to that particular Node.

> For more information and tutorials on how to add a device, visit: [wes-lorawan-device-templates](https://github.com/waggle-sensor/wes-lorawan-device-templates?tab=readme-ov-file#waggle-device-repository-for-lorawan)

## How to get started?
Our [Nodes](../about/architecture.md#nodes) use [ChirpStack](https://www.chirpstack.io/docs/index.html), an open-source LoRaWAN Network Server. To register a device on the Sage network, we need two key pieces of information:

1. **DevEUI (Device Extended Unique Identifier)**: 64-bit identifier
1. **App Key**: 128-bit Key

These can either be provided by the user or, if preferred, we can supply them. In some cases, the device may already come with a DevEUI and simply require an App Key — our system supports that setup as well. Devices deployed in the U.S. must operate on US915 sub band 2 (903.9-905.3 MHz). For international deployments, we will follow the local frequency guidelines and ensure the appropriate radio module is installed on the nodes.

To start using LoRaWAN with Sage, follow these steps:

1. Send us your device’s details, DevEUI(s), and possibly App Key(s). We’ll add it to the corresponding network servers.
1. We’ll send back the App Key(s).
1. Program your device with the App Key(s).
1. You are ready to join!

>For further inquiries, head over to the [Contact Us](../contact-us.md) page.

<!--To get started with using LoRaWAN, you can follow the step-by-step instructions in the [tutorial](../tutorials/schedule-jobs.md). -->

## Implementation

The diagram below shows the hardware in [Nodes](../about/architecture.md#nodes) and the services in [WES](../about/architecture.md#waggle-edge-stack-wes) that allow [Nodes](../about/architecture.md#nodes) to use LoRaWAN and publish measurements to a [Beehive](../about/architecture.md#beehive).

![Figure 1: WES Lorawan Architecture](./images/arch_wes_lorawan.svg)

The following sections will explain each componenent and service.

>source code:
> - [wes-chirpstack](https://github.com/waggle-sensor/waggle-edge-stack/tree/main/kubernetes/wes-chirpstack)
> - [wes-chirpstack-server](https://github.com/waggle-sensor/wes-chirpstack-server)
> - [wes-rabbitmq](https://github.com/waggle-sensor/waggle-edge-stack/blob/main/kubernetes/wes-rabbitmq.yaml)
> - [Tracker](https://github.com/waggle-sensor/wes-chirpstack-device-tracker)
> - [Lorawan Listener Plugin](https://github.com/FranciscoLozCoding/plugin-lorawan-listener)

### Chirpstack

ChirpStack is a robust and open-source LoRaWAN Network Server that enables efficient management of LoRaWAN devices, gateways, and data. Its architecture consists of several crucial components, each serving a distinct role in LoRaWAN network operations. Below, we provide a brief overview of these components along with links to ChirpStack documentation for further insights.

>[Chirpstack documentation](https://www.chirpstack.io/docs/index.html)

#### UDP Packet Forwarder

The UDP Packet Forwarder is an essential component that acts as a bridge between LoRa gateways and the [ChirpStack Network Server](#chirpstack-server). It receives incoming packets from LoRa gateways and forwards them to the [ChirpStack Gateway Bridge](#chirpstack-gateway-bridge) for further processing. To learn more about the UDP Packet Forwarder, refer to the documentation [here](https://github.com/RAKWireless/udp-packet-forwarder).

#### ChirpStack Gateway Bridge

The ChirpStack Gateway Bridge is responsible for translating gateway-specific protocols into a standard format for the [ChirpStack Network Server](#chirpstack-server). It connects to a [UDP Packet Forwader](#udp-packet-forwarder), ensuring that data is properly formatted and can be seamlessly processed by the network server. For in-depth information on the ChirpStack Gateway Bridge, explore the documentation [here](https://www.chirpstack.io/docs/chirpstack-gateway-bridge/index.html).

#### MQTT Broker

[WES](../about/architecture.md#waggle-edge-stack-wes) includes a MQTT (Message Queuing Telemetry Transport) broker to handle communication between various services. MQTT provides a lightweight and efficient messaging system. This service ensures that data flows smoothly between the network server, gateways, and applications. You can find detailed information about the MQTT broker integration in the ChirpStack documentation [here](https://www.chirpstack.io/docs/chirpstack/integrations/mqtt.html).

#### ChirpStack Server
The ChirpStack Server serves as the core component, managing device sessions, data, and application integrations. It utilizes [Redis](https://redis.io/) for device sessions, metrics, and caching, ensuring efficient data handling and retrieval. For persistent data storage, ChirpStack uses [PostgreSQL](https://www.postgresql.org/), accommodating records for tenants, applications, devices, and more. For a comprehensive understanding of the ChirpStack Server and its associated database technologies, consult the ChirpStack documentation [here](https://www.chirpstack.io/docs/chirpstack/requirements.html).

>NOTE: Chirpstack v4 combined the application and network server into one component.

### Tracker
The Tracker is a service designed to record the connectivity of LoRaWAN devices to the [Nodes](../about/architecture.md#nodes). This service uses the information received from the [MQTT broker](#mqtt-broker) to call [ChirpStack's gRPC API](https://www.chirpstack.io/docs/chirpstack/api/grpc.html). The information received from the API is then used to keep the Node's manifest up-to-date. Subsequently, it forwards this updated manifest to the [Beehive](../about/architecture.md#beehive). For more information, view the documentation [here](https://github.com/waggle-sensor/wes-chirpstack-device-tracker).

### Lorawan Listener Plugin
The LoRaWAN Listener is a plugin designed to publish measurements collected from LoRaWAN devices. It simplifies the process of extracting and publishing valuable data from these devices. For more information about the plugin view the plugin page [here](https://portal.sagecontinuum.org/apps/app/flozano/lorawan-listener).
