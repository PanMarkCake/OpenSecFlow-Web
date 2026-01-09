---
title: RESTful Wrapper for Legacy CLI Equipment
description: Transform legacy network equipment CLI interfaces into modern RESTful APIs using NetDriver's HTTP wrapper, enabling seamless web application integration.
pubDate: 2024-02-15
tags: ['legacy-integration', 'netdriver', 'rest-api', 'cli-to-api']
---

# RESTful Wrapper for Legacy CLI Equipment

Many organizations operate legacy network equipment that lacks modern REST API interfaces, making integration with web applications challenging. NetDriver's HTTP RESTful wrapper bridges this gap.

## The Legacy Integration Challenge

Legacy network devices often provide only:
- Command-line interfaces (CLI)
- Proprietary protocols
- Limited automation capabilities
- No modern API support

This makes it difficult to integrate legacy equipment into contemporary web applications and microservices architectures.

## NetDriver's RESTful Wrapper Solution

NetDriver provides an HTTP RESTful wrapper that:

- **Exposes CLI as REST API**: Transform CLI commands into HTTP endpoints
- **Standardizes Interfaces**: Provide consistent API across different vendors
- **Enables Web Integration**: Allow web applications to interact with legacy devices
- **Maintains Security**: Preserve authentication and authorization mechanisms

## Architecture Overview

The RESTful wrapper acts as a translation layer:

```
Web Application → HTTP Request → NetDriver REST Wrapper → CLI Command → Legacy Device
                 ← HTTP Response ←                    ← CLI Response ←
```

## Implementation Example

```python
from netdriver import NetDriver
from netdriver.rest import RESTWrapper

# Create NetDriver instance
driver = NetDriver(host='legacy-router.example.com')
driver.connect()

# Wrap with REST API
rest_api = RESTWrapper(driver)

# Expose as HTTP endpoint
# GET /api/devices/legacy-router/interfaces
# Returns: JSON representation of interface configuration

# POST /api/devices/legacy-router/interfaces/GigabitEthernet0/1
# Body: {"ip_address": "192.168.1.1", "subnet": "255.255.255.0"}
# Updates interface configuration via CLI
```

## API Design Principles

NetDriver's RESTful wrapper follows REST best practices:

- **Resource-based URLs**: `/api/devices/{device}/interfaces/{interface}`
- **HTTP Methods**: GET, POST, PUT, DELETE for appropriate operations
- **JSON Responses**: Consistent JSON format across all endpoints
- **Error Handling**: Standard HTTP status codes and error messages

## Benefits

- **Modern Integration**: Enable REST API access to legacy equipment
- **Vendor Agnostic**: Unified interface across different device types
- **Developer Friendly**: Familiar REST API patterns
- **Microservices Ready**: Integrate legacy devices into modern architectures

## Use Cases

- **Web Dashboards**: Display device status and configuration
- **Configuration Management**: Update device settings via web UI
- **Monitoring Systems**: Collect metrics through REST endpoints
- **Automation Platforms**: Integrate with CI/CD and orchestration tools

## Security Considerations

- **Authentication**: Implement API key or OAuth authentication
- **Authorization**: Control access to device operations
- **Encryption**: Use HTTPS for all API communications
- **Rate Limiting**: Prevent abuse and protect devices

## Conclusion

NetDriver's RESTful wrapper enables organizations to modernize legacy network equipment integration, bridging the gap between CLI-based devices and contemporary web applications.
