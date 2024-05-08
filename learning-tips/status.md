# Reponse status

## 1xx Informational
- 100 Continue
- 101 Switching Protocols
- 102 Processing
- 103 Early Hints

## 2xx Success
- 200 OK
- 201 Created
- 202 Accepted
- 203 Non-Authoritative Information
- 204 No Content
- 205 Reset Content
- 206 Partial Content
- 207 Multi-Status
- 208 Already Reported
- 226 IM Used

## 3xx Redirection
- 300 Multiple Choices
- 301 Moved Permanently

## 4xx Client Error
- 400 Bad Request
- 401 Unauthorized
- 402 Payment Required
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 406 Not Acceptable
- 407 Proxy Authentication Required
- 408 Request Timeout
- 409 Conflict
- 410 Gone
- 411 Length Required
- 412 Precondition Failed
- 413 Payload Too Large
- 414 URI Too Long
- 415 Unsupported Media Type
- 416 Range Not Satisfiable
- 417 Expectation Failed
- 418 I'm a teapot
- 421 Misdirected Request
- 422 Unprocessable Entity
- 423 Locked
- 424 Failed Dependency
- 425 Too Early
- 426 Upgrade Required
- 428 Precondition Required

## 5xx Server Error
- 500 Internal Server Error
- 501 Not Implemented
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout
- 505 HTTP Version Not Supported
- 506 Variant Also Negotiates
- 507 Insufficient Storage
- 508 Loop Detected
- 510 Not Extended
- 511 Network Authentication Required

# Common Use cases

- 200 OK: The request has succeeded.
- 201 Created: The request has been fulfilled and has resulted in one or more new resources being created.
- 204 No Content: The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.
- 400 Bad Request: The server cannot or will not process the request due to an apparent client error.
- 401 Unauthorized: The request has not been applied because it lacks valid authentication credentials for the target resource.
- 403 Forbidden: The server understood the request but refuses to authorize it.
- 404 Not Found: The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.
- 405 Method Not Allowed: The method received in the request-line is known by the origin server but not supported by the target resource.
- 500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.
- 501 Not Implemented: The server either does not recognize the request method, or it lacks the ability to fulfill the request.
- 503 Service Unavailable: The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.
- 504 Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.
- 505 HTTP Version Not Supported: The server does not support, or refuses to support, the major version of HTTP that was used in the request message.
- 511 Network Authentication Required: The client needs to authenticate to gain network access.
