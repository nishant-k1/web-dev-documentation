# Origin in web

"An origin in web security is the combination of `protocol`, `domain`, and `port`. Two URLs must match all three to be considered the same origin.

**`Origin` = `Protocol` + `Host (Domain)` + `Port`**

It's how the browser identifies the “source” of a request or document.

## Example 1 — Same Origin

| URL A                      | URL B                     | Same Origin? |
| -------------------------- | ------------------------- | ------------ |
| `https://example.com/page` | `https://example.com/api` | ✅ Yes       |

## Example 2 — Different Origin (Protocol mismatch)

| A                     | B                    | Same Origin? |
| --------------------- | -------------------- | ------------ |
| `https://example.com` | `http://example.com` | ❌ No        |

## Example 3 — Different Origin (Domain mismatch)

| A                     | B                         | Same Origin? |
| --------------------- | ------------------------- | ------------ |
| `https://example.com` | `https://api.example.com` | ❌ No        |

## Example 4 — Different Origin (Port mismatch)

| A                         | B                         | Same Origin? |
| ------------------------- | ------------------------- | ------------ |
| `http://example.com:3000` | `http://example.com:4000` | ❌ No        |

## Where Does "Origin" Matter?

`Same-Origin Policy`: Restricts access to data across different origins.

`CORS`: Allows servers to explicitly allow requests from other origins.

`Cookies`: Shared only within the same origin (or domain if configured carefully).

`Security`: XSS, CSRF attacks are prevented using origin-based checks.

## Origin vs URL vs Domain

| Term       | Example                         | Meaning                  |
| ---------- | ------------------------------- | ------------------------ |
| **Origin** | `https://example.com:443`       | Protocol + Domain + Port |
| **Domain** | `example.com`                   | Just the site name       |
| **URL**    | `https://example.com/page?id=1` | Full path, query, hash   |

## Origin in git

The word "origin" in Git sounds similar but means something completely different from the "origin" in web security.

In Git, origin is just the name (label) for a remote repo — usually where you cloned from.
In Web, origin refers to the combination of protocol, domain, and port for security enforcement.
