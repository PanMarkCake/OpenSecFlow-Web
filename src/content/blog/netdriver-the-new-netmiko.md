---
title: "NetDriver, the New Netmiko: A Modern Approach to Network Automation"
description: "Discover how NetDriver revolutionizes network automation with REST API, persistent sessions, command queuing, and async architecture - addressing Netmiko's limitations while building on its strengths."
pubDate: 2025-11-06
updatedDate: 2025-11-06
tags: ['netdriver', 'netmiko', 'network-automation', 'ssh', 'rest-api', 'asyncssh', 'scaling-automation']
externalLink: https://medium.com/@skycloudinet/netdriver-the-new-netmiko-bbbad90302db
---

# NetDriver, the New Netmiko: A Modern Approach to Network Automation

Network automation has evolved significantly since Netmiko first simplified SSH-based device management. While Netmiko remains a robust foundation, modern network environments demand more: REST API integration, session persistence, concurrent operations, and support for an ever-expanding list of vendors.

**NetDriver** emerges as the next-generation solution, addressing Netmiko's limitations while preserving its core strengths. Built by the OpenSecFlow community, NetDriver represents a modern evolution of network automation tools.

## Why NetDriver?

NetDriver was conceived as an upgrade to Netmiko, designed to keep what made Netmiko strong while adding features that match modern network automation needs. The project addresses several key challenges that network engineers face today:

### Modern Integration Requirements

- **REST API First**: NetDriver provides an HTTP RESTful API, enabling easy integration with third-party platforms, automation workflows, and dashboards without requiring direct SSH access
- **External System Integration**: Modern automation platforms, CI/CD pipelines, and monitoring systems can trigger device operations through simple HTTP requests

### Performance and Efficiency

- **Persistent Sessions**: NetDriver maintains SSH session persistence, eliminating the overhead of connecting and disconnecting for every operation
- **Asynchronous Architecture**: Built on AsyncSSH, NetDriver handles multiple devices concurrently with improved efficiency
- **Command Queueing**: Automatic queuing prevents configuration conflicts when multiple commands are issued simultaneously

### Extensibility and Vendor Support

- **Plugin-Based Architecture**: NetDriver's modular plugin system makes it easier to add support for new vendors and device models
- **Extended Vendor Support**: NetDriver aims to support nearly double the number of vendors and models compared to current Netmiko capabilities
- **Future-Proof Design**: The plugin architecture allows the community to extend support for emerging and niche network equipment

## Netmiko's Strengths and Limitations

### What Netmiko Does Well

Netmiko has been the go-to tool for network automation for good reasons:

- **Robust CLI Handling**: Excellent at managing command-line interaction differences across vendors and platforms
- **Vendor Quirks**: Handles oddities like varying prompts, escape/control characters, and extra banners effectively
- **Simple API**: Straightforward methods like `send_command()` and `send_config_set()` make scripting intuitive
- **Configuration Management**: Supports sending configuration from files and handles enter-config-mode/exit-mode cycles consistently
- **Rapid Prototyping**: Its simplicity makes it ideal for quick automation scripts
- **Foundation for Frameworks**: Many higher-level frameworks like NAPALM and Nornir use Netmiko as their backend

### Where Netmiko Falls Short

Modern network automation environments reveal some limitations:

- **Limited Modern Integrations**: Primarily SSH/CLI driven, making integration with web platforms and third-party systems challenging
- **No Session Persistence**: Connections typically need to be re-established for each operation, adding overhead
- **No Built-in Command Queuing**: Risk of race conditions or conflicting operations when handling concurrent requests
- **Extensibility Challenges**: Adding support for new or obscure devices can be cumbersome
- **Synchronous Architecture**: Less efficient when handling many devices in parallel
- **Vendor Support Gaps**: Support isn't keeping pace with the diversity of equipment in modern networks

## NetDriver's Key Advantages

### 1. REST API Architecture

NetDriver's RESTful API enables applications to call a **NetDriver Agent** via HTTP requests. The agent transforms these REST requests into CLI commands executed over SSH against physical or simulated devices (like SimuNet). This architecture means:

- Automation workflows can trigger device operations without direct SSH access
- Dashboards and monitoring systems can integrate seamlessly
- Non-Python systems can interact with network devices through standard HTTP calls
- CI/CD pipelines can include network automation steps more easily

### 2. Session Persistence

Unlike Netmiko's connect-per-operation model, NetDriver maintains persistent SSH sessions:

- **Reduced Overhead**: Eliminates connection establishment time for each command
- **Configurable Timeouts**: Sessions can be kept alive with customizable timeouts
- **Improved Performance**: Reusing connections significantly reduces latency
- **Resource Efficiency**: Lower CPU and memory usage compared to frequent connect/disconnect cycles

### 3. Command Queueing

NetDriver's command queue prevents configuration conflicts:

- **Sequential Execution**: Commands are automatically queued to prevent overlapping modifications
- **Conflict Prevention**: Eliminates race conditions when multiple operations target the same device
- **Reliable Configuration**: Ensures consistent device state during automation workflows

### 4. Asynchronous Foundation

Built on AsyncSSH, NetDriver provides:

- **Concurrent Operations**: Handle multiple devices simultaneously with improved efficiency
- **Better Scalability**: Asynchronous architecture scales better for large network environments
- **Non-Blocking I/O**: Operations don't block while waiting for device responses

### 5. Extended Vendor Support

NetDriver's plugin architecture enables:

- **Rapid Vendor Addition**: New vendors and models can be added through plugin modules
- **Community Contributions**: Easier for the community to extend support for niche or emerging devices
- **Broader Coverage**: Aims to support nearly double the vendors/models compared to current Netmiko

## Comparison: NetDriver vs Netmiko

| Feature | Netmiko | NetDriver |
|---------|---------|-----------|
| **Integration** | Primarily SSH/CLI driven | REST API first; easier integrations |
| **Session Handling** | Connect/disconnect per operation | Persistent session support |
| **Device Support** | Large, but gaps with less common gear | Aims to double existing list via plugins |
| **Concurrency** | Synchronous; less ideal for many devices | Asynchronous foundation with command queueing |
| **Extensibility** | Adding new devices takes effort | Plugin architecture simplifies extension |
| **API Style** | Python library (direct SSH) | REST API (HTTP-based) |
| **Use Case** | Rapid prototyping, Python scripts | Production automation, multi-system integration |

## Getting Started with NetDriver

NetDriver is designed to be accessible for network engineers familiar with Netmiko while providing modern capabilities. The REST API approach means you can:

1. **Deploy NetDriver Agent**: Set up the agent service (via Docker or PyPI)
2. **Make HTTP Requests**: Use any HTTP client (curl, Python requests, JavaScript fetch) to interact with devices
3. **Leverage Existing Knowledge**: CLI commands remain the same; only the interface changes
4. **Integrate Easily**: Connect NetDriver to your existing automation platforms and workflows

For a quick start, check out our [NetDriver 5-Minute Quickstart tutorial](/tutorial/netdriver) to get up and running in minutes.

## The Future of Network Automation

NetDriver represents a shift toward modern, API-driven network automation that aligns with how modern infrastructure is managed. While Netmiko remains an excellent tool for many use cases, NetDriver addresses the needs of:

- **Enterprise Automation**: Organizations requiring integration with existing platforms
- **Scalable Operations**: Environments managing hundreds or thousands of devices
- **Modern Workflows**: Teams using CI/CD, Infrastructure as Code, and API-first architectures
- **Diverse Vendor Environments**: Networks with equipment from multiple vendors, including niche or emerging manufacturers

## Learn More

This article is based on the original Medium post by SkyCloud. For the complete analysis and detailed comparison, read the full article:

**[Read the full article on Medium: "NetDriver, the New Netmiko"](https://medium.com/@skycloudinet/netdriver-the-new-netmiko-bbbad90302db)**

## Related Resources

- [NetDriver Quickstart Tutorial](/tutorial/netdriver) - Get started with NetDriver in 5 minutes
- [RESTful Wrapper for Legacy CLI](/blog/restful-wrapper-legacy-cli) - Learn about API-driven network automation
- [Persistent Session Management](/blog/persistent-session-management) - Understand session persistence benefits
- [Intelligent Command Queuing](/blog/intelligent-command-queuing) - Explore command queueing features
- [Scaling Automation](/topics/scaling-automation) - Discover strategies for large-scale network automation

## Conclusion

NetDriver builds on Netmiko's solid foundation while addressing the challenges of modern network automation. With REST API integration, persistent sessions, command queuing, and an extensible plugin architecture, NetDriver offers a path forward for network engineers who need more than traditional SSH-based tools can provide.

Whether you're building enterprise automation platforms, integrating network operations into CI/CD pipelines, or managing diverse multi-vendor environments, NetDriver provides the modern capabilities needed for today's network automation challenges.

---

*This article summarizes and expands on the original Medium post by SkyCloud. NetDriver is an open-source project by the OpenSecFlow community, dedicated to advancing network automation tools and practices.*
