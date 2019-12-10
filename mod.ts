// Copyright (c) 2019 Rafał Pocztarski. All rights reserved.
// MIT License (Expat). See: https://github.com/rsp/deno-rand

const { getRandomValues: grv } = crypto;
const { isInteger: isInt } = Number;

type RNG = () => number;

const s8buf = new Int8Array(1);
const u8buf = new Uint8Array(1);
const s16buf = new Int16Array(1);
const u16buf = new Uint16Array(1);
const s32buf = new Int32Array(1);
const u32buf = new Uint32Array(1);

export const s8 = () => grv(s8buf)[0];
export const s16 = () => grv(s16buf)[0];
export const s32 = () => grv(s32buf)[0];

export const u8 = () => grv(u8buf)[0];
export const u16 = () => grv(u16buf)[0];
export const u32 = () => grv(u32buf)[0];

export const s1 = () => s8() >> 7;
export const s2 = () => s8() >> 6;
export const s3 = () => s8() >> 5;
export const s4 = () => s8() >> 4;
export const s5 = () => s8() >> 3;
export const s6 = () => s8() >> 2;
export const s7 = () => s8() >> 1;

export const u1 = () => u8() >> 7;
export const u2 = () => u8() >> 6;
export const u3 = () => u8() >> 5;
export const u4 = () => u8() >> 4;
export const u5 = () => u8() >> 3;
export const u6 = () => u8() >> 2;
export const u7 = () => u8() >> 1;

export const randS1 = s1;
export const randS2 = s2;
export const randS3 = s3;
export const randS4 = s4;
export const randS5 = s5;
export const randS6 = s6;
export const randS7 = s7;
export const randS8 = s8;
export const randS16 = s16;
export const randS32 = s32;

export const randU1 = u1;
export const randU2 = u2;
export const randU3 = u3;
export const randU4 = u4;
export const randU5 = u5;
export const randU6 = u6;
export const randU7 = u7;
export const randU8 = u8;
export const randU16 = u16;
export const randU32 = u32;

export const limits = {
  u1: [0, 0b1],
  u2: [0, 0b11],
  u3: [0, 0b111],
  u4: [0, 0b1111],
  u5: [0, 0b11111],
  u6: [0, 0b111111],
  u7: [0, 0b1111111],
  u8: [0, 0b11111111],
  u16: [0, (1<<16) - 1],
  u32: [0, (1<<30) * 4 - 1],
  s1: [-0b1, 0],
  s2: [-0b10, 0b1],
  s3: [-0b100, 0b11],
  s4: [-0b1000, 0b111],
  s5: [-0b10000, 0b1111],
  s6: [-0b100000, 0b11111],
  s7: [-0b1000000, 0b111111],
  s8: [-0b10000000, 0b1111111],
  s16: [-1<<15, (1<<15) - 1],
  s32: [(-1<<30) * 2, (1<<30) * 2 - 1],
};

export type testRngOptions = {
  rng: RNG,
  min: number,
  max: number,
  num?: number,
  int?: boolean,
  cover?: boolean,
  limit?: number,
};

export function testRng({
  rng,
  min = 0,
  max = 255,
  num = 1000,
  int = false,
  cover = false,
  limit = 1000000,
}: testRngOptions) {
  let xMin: number = Infinity;
  let xMax: number = -Infinity;
  for (let i = 0; i < num || cover && xMin !== min && xMax !== max; i++) {
    if (i >= limit) {
      throw new Error(`Number of iterations ${i+1} exceeded limit ${limit} (min ${xMin}, max ${xMax}`);
    }
    const x = rng();
    if (x < min) {
      throw new Error(`Number ${x} is lower than minimum ${min}`);
    }
    if (x > max) {
      throw new Error(`Number ${x} is higher than maximum ${max}`);
    }
    if (int && !isInt(x)) {
      throw new Error(`Number ${x} is not an integer`);
    }
    if (x < xMin) {
      xMin = x;
    } else if (x > xMax) {
      xMax = x;
    }
  }
  return {
    min: xMin,
    max: xMax,
  };
}

export const rand = {
  s1,
  s2,
  s3,
  s4,
  s5,
  s6,
  s7,
  s8,
  s16,
  s32,
  u1,
  u2,
  u3,
  u4,
  u5,
  u6,
  u7,
  u8,
  u16,
  u32,
};

export default rand;
