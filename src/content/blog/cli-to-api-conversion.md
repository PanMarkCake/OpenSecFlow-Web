---
title: CLI-to-API Conversion with NetDriver
description: Learn how NetDriver converts command-line interfaces into standardized HTTP APIs, simplifying network device integration.
pubDate: 2024-02-20
tags: ['legacy-integration', 'netdriver', 'cli-to-api', 'api-design']
---

# CLI-to-API Conversion with NetDriver

Converting CLI interfaces to HTTP APIs is essential for modern network automation. NetDriver provides intuitive tools for transforming command-line interactions into RESTful endpoints.

## Why Convert CLI to API?

Command-line interfaces present challenges for modern applications:
- **Difficult Integration**: CLI output parsing is complex and error-prone
- **No Standardization**: Each vendor uses different CLI syntax
- **Limited Automation**: CLI interactions don't scale well
- **Poor Developer Experience**: Developers prefer REST APIs

## NetDriver's CLI-to-API Approach

NetDriver simplifies CLI-to-API conversion through:

- **Command Mapping**: Map CLI commands to REST endpoints
- **Response Parsing**: Automatically parse CLI output into JSON
- **Error Translation**: Convert CLI errors to HTTP status codes
- **Standardization**: Provide consistent API patterns across vendors

## Conversion Process

### Step 1: Define CLI Commands

```python
from netdriver import NetDriver

driver = NetDriver(host='device.example.com')
driver.connect()

# Original CLI command
cli_output = driver.execute('show interfaces')
```

### Step 2: Map to REST Endpoint

```python
from netdriver.rest import RESTMapper

mapper = RESTMapper(driver)

# Map CLI command to REST endpoint
@mapper.endpoint('/api/interfaces', method='GET')
def get_interfaces():
    return driver.execute('show interfaces')
```

### Step 3: Parse and Format Response

```python
from netdriver.parsers import InterfaceParser

parser = InterfaceParser()

# Parse CLI output to JSON
interfaces = parser.parse(cli_output)
# Returns: [{"name": "GigabitEthernet0/1", "status": "up", ...}]
```

## Example: Interface Management API

```python
# GET /api/devices/{device}/interfaces
# Returns list of all interfaces

# GET /api/devices/{device}/interfaces/{interface}
# Returns specific interface details

# POST /api/devices/{device}/interfaces/{interface}
# Updates interface configuration
# Body: {"ip_address": "192.168.1.1", "subnet": "255.255.255.0"}

# DELETE /api/devices/{device}/interfaces/{interface}
# Shuts down interface
```

## Benefits of API Conversion

- **Standardized Interface**: Consistent API across all devices
- **Easier Integration**: Simple HTTP requests instead of CLI parsing
- **Better Error Handling**: Standard HTTP status codes
- **Improved Testing**: Test APIs with standard HTTP tools

## Vendor-Agnostic Design

NetDriver's CLI-to-API conversion works with:
- Cisco IOS/IOS-XE
- Juniper JunOS
- Arista EOS
- And other vendor CLIs through plugins

## Best Practices

1. **Consistent Naming**: Use RESTful resource naming conventions
2. **Proper HTTP Methods**: GET for reads, POST/PUT for updates
3. **Error Handling**: Return appropriate HTTP status codes
4. **Documentation**: Provide OpenAPI/Swagger documentation

## Conclusion

CLI-to-API conversion with NetDriver enables modern application integration with legacy network equipment, providing a bridge between traditional CLI interfaces and contemporary REST APIs.
