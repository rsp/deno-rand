Deno rand library
=

[![Build Status][actions-img]][actions-url]<br>(CI tests on Linux, Mac, Windows)

Random utilities for getting random numbers in Deno conveniently.

It uses the standard
[`crypto.getRandomValues()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)
to get cryptographically strong random data.

In Deno `crypto.getRandomValues()` was implemented in
[PR #2327](https://github.com/denoland/deno/pull/2327)
using Rust's [`rand::rngs::ThreadRng`](https://docs.rs/rand/0.6.5/rand/rngs/struct.ThreadRng.html).

This module should work in the browser and in Node.js
but currently it was only tested in Deno (on Linux, Mac and Windows).

Work in progress.

Why it was created
-
I started looking into [ulid](https://github.com/ulid/javascript)
to port it to Deno and I saw in its
[index.ts](https://github.com/ulid/javascript/blob/a5831206a11636c94d4657b9e1a1354c529ee4e9/lib/index.ts)
that it uses a strange way to get a random 5-bit integer:

It gets an 8-bit integer, divides it by 255, then multiplies by 32
and subtracts 1 if the result is 32,
instead of jast shifting or masking bits,
and it's not obvious if the numbers are uniformly distributted
if calculated that way.

This shows that simple things like getting a random number
in a particular range can be hard to do
without complicating it in a way that it is hard to see if
the randomness was not accidentally redused in the process.

TODO:

- Add optional support for `Math.random()`
- Add more bit widths
- Add multiple values
- Optimize with larger prepopulated buffers
- Test in the browser
- Test in Node
- Publish on npm as well

Usage
-

```ts
import rand from './mod.ts';

// random 7-bit unsigned integer:
const x = rand.u7();

// random 5-bit signed integer:
const y = rand.s6();
```

Short API:

```ts
import { u7 } from './mod.ts';

const x = u7(); // random 7-bit unsigned integer
```

Readable API:

```ts
import { randU7 } from './mod.ts';

const x = randU7(); // random 7-bit unsigned integer
```

The advantage of `randU7()` vs `rand.u7()`
is that you can import only what you need and avoid
mistakenly writing `s7` instead of `u7` etc.

Issues
-
For any bug reports or feature requests please
[post an issue on GitHub][issues-url].

Author
-
[**Rafał Pocztarski**](https://pocztarski.com/)
<br/>
[![Follow on GitHub][github-follow-img]][github-follow-url]
[![Follow on Twitter][twitter-follow-img]][twitter-follow-url]
<br/>
[![Follow on Stack Exchange][stackexchange-img]][stackoverflow-url]

License
-
MIT License (Expat). See [LICENSE.md](LICENSE.md) for details.

[github-url]: https://github.com/rsp/deno-rand
[readme-url]: https://github.com/rsp/deno-rand#readme
[issues-url]: https://github.com/rsp/deno-rand/issues
[license-url]: https://github.com/rsp/deno-rand/blob/master/LICENSE.md
[actions-url]: https://github.com/rsp/deno-rand/actions
[actions-img]: https://github.com/rsp/deno-rand/workflows/ci/badge.svg?branch=master&event=push
[travis-url]: https://travis-ci.org/rsp/deno-rand
[travis-img]: https://travis-ci.org/rsp/deno-rand.svg?branch=master
[snyk-url]: https://snyk.io/test/github/rsp/deno-rand
[snyk-img]: https://snyk.io/test/github/rsp/deno-rand/badge.svg
[david-url]: https://david-dm.org/rsp/deno-rand
[david-img]: https://david-dm.org/rsp/deno-rand/status.svg
[install-img]: https://nodei.co/npm/ende.png?compact=true
[downloads-img]: https://img.shields.io/npm/dt/ende.svg
[license-img]: https://img.shields.io/npm/l/ende.svg
[stats-url]: http://npm-stat.com/charts.html?package=ende
[github-follow-url]: https://github.com/rsp
[github-follow-img]: https://img.shields.io/github/followers/rsp.svg?style=social&logo=github&label=Follow
[twitter-follow-url]: https://twitter.com/intent/follow?screen_name=pocztarski
[twitter-follow-img]: https://img.shields.io/twitter/follow/pocztarski.svg?style=social&logo=twitter&label=Follow
[stackoverflow-url]: https://stackoverflow.com/users/613198/rsp
[stackexchange-url]: https://stackexchange.com/users/303952/rsp
[stackexchange-img]: https://stackexchange.com/users/flair/303952.png
