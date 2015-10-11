---
layout: post
title: "Client Session vs. Server Session"
permalink: client-session-vs-server-session
date: 2015-09-12 3:06
categories: session authentication
---

Http protocol is stateless, but most web application need to carry
some state in order to offer a personalized experience to users.<!--more--> That's
why session comes into play.

## What is session
Session is the state of an application during the time a user is interacting
with it. More specifically, session is temporary data that is useful only during the time a user is interacting with the application.
There are two ways which are common used to store session. In the server side or in the client side.

## Server side session
The typical way to store session is by setting a cookie with a random session
identifier and storing session details on the server under this identifier.

#### Pros of a server side session:
*   Can revoke a session instantly.
*   Cookie size is smaller.
*   User details are not exposed.
*   Can store much session data without increasing cookie size.

#### Scaling a stateful service:

*   Replicate that session data across all of the web servers.
*   Use a central store that each web server connects to.
*   Ensure that a given user always hits the same web server.

#### These all have downsides:

*   Replication has a performance cost and increases complexity.
*   A central store will limit scaling and increase latency.
*   Confining users to a specific server leads to problems when that
server needs to come down.

As we can see above, it's difficult to scale a stateful service. However, we can store the
session data on the client to make the service stateless.

## Client side session

In this model, all session state is stored in the client in a cookie. So, you
don't need to worry about persisting and replicating state across nodes,
session validation is fast since you don't need to query any data store which
means it's super scalable. The session cookie must be tamper proof for preventing people creating a session of their choice. What that means in practice is that you encrypt and sign the cookie using a server key to keep users from reading or modifying the session data.

#### Pros of a client side session:

*   Low latency. Validating and creating sessions is fast as it doesn't need to hit the data-store.
*   No state to manage on servers
*   Nothing needs to be replicated between the web servers
*   New web server can be added instantly

#### Cons of a client side session:

*   Session can't revoke immediately. The session cookie can be dropped from the browser, but it would still work if resubmitted until the cookie is expired.
*   Implementation and user details are exposed since everything is stored in a cookie. So a strong encryption is required.
*   Cookie size is greater.

If you want a client side session, you need to keep your cookie short-lived. If you need a way to immediately revoke the session, you need to keep a little bit of state on the backend. Every API call reads the current token value from
the database and compares it with the token from the cookie.

## Conclusion

Session based authentication is widely used in many web application.  I will choose client-based session for my application authentication because it's simple to implement. But which one is better, it's hard to say. It totally depends on your requirement.