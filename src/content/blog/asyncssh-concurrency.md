---
title: AsyncSSH Concurrency for Scale
description: Discover how NetDriver leverages AsyncSSH to enable concurrent operations across multiple network devices, dramatically improving automation throughput.
pubDate: 2024-02-05
tags: ['scaling-automation', 'netdriver', 'asyncssh', 'concurrency']
---

# AsyncSSH Concurrency for Scale

Network automation at scale requires the ability to interact with hundreds or thousands of devices simultaneously. NetDriver's AsyncSSH core enables true concurrent operations without blocking.

## The Challenge of Sequential Operations

Traditional network automation scripts execute commands sequentially:
- Device 1: Connect → Execute → Disconnect
- Device 2: Connect → Execute → Disconnect
- Device 3: Connect → Execute → Disconnect

This approach is slow and doesn't scale well for large device inventories.

## NetDriver's AsyncSSH Architecture

NetDriver is built on AsyncSSH, providing:

- **Non-blocking Operations**: Execute commands on multiple devices concurrently
- **Event-driven Architecture**: Efficient resource utilization
- **Scalable Concurrency**: Handle hundreds of simultaneous connections
- **Intelligent Resource Management**: Automatic connection pooling and reuse

## Concurrent Execution Example

```python
import asyncio
from netdriver import NetDriver

async def update_config(host):
    driver = NetDriver(host=host)
    await driver.connect_async()
    await driver.execute_async('configure terminal')
    await driver.execute_async('interface GigabitEthernet0/1')
    await driver.execute_async('description Updated via NetDriver')
    await driver.commit_async()

# Execute on multiple devices concurrently
hosts = ['router1.example.com', 'router2.example.com', 'router3.example.com']
await asyncio.gather(*[update_config(host) for host in hosts])
```

## Performance Metrics

With AsyncSSH concurrency, NetDriver achieves:
- **10-50x faster** bulk operations compared to sequential execution
- **Efficient resource usage** with connection pooling
- **Predictable performance** under high load

## Use Cases

- Bulk configuration updates across device fleets
- Network-wide health checks and monitoring
- Rapid deployment of security policies
- Automated compliance validation

## Best Practices

1. **Connection Limits**: Configure appropriate connection pool sizes
2. **Error Handling**: Implement robust error handling for concurrent operations
3. **Rate Limiting**: Respect device capabilities and network constraints
4. **Monitoring**: Track concurrent operation performance

## Conclusion

AsyncSSH concurrency makes NetDriver the ideal choice for network automation scenarios requiring high throughput and scalability.
