const fs = require("fs");
const path = require("path");

const sampleRate = 44100;
const bpm = 92;
const bars = 16;
const beatsPerBar = 4;
const duration = (60 / bpm) * beatsPerBar * bars;
const totalSamples = Math.floor(sampleRate * duration);
const channels = 2;
const data = new Int16Array(totalSamples * channels);

const noteHz = {
  C2: 65.406,
  D2: 73.416,
  E2: 82.407,
  G2: 97.999,
  A2: 110.0,
  C3: 130.813,
  D3: 146.832,
  E3: 164.814,
  G3: 195.998,
  A3: 220.0,
  C4: 261.626,
  D4: 293.665,
  E4: 329.628,
  G4: 391.995,
  A4: 440.0,
  B4: 493.883,
  C5: 523.251,
};

const chords = [
  ["A2", "C3", "E3", "G3"],
  ["G2", "B4", "D3", "G3"],
  ["D2", "A2", "D3", "E3"],
  ["E2", "G2", "B4", "D4"],
];

const melody = [
  "E4", null, "G4", "A4", "C5", null, "A4", "G4",
  "E4", "D4", null, "C4", "D4", null, "E4", null,
  "G4", null, "A4", "C5", "A4", null, "G4", "E4",
  "D4", null, "E4", "G4", "A4", null, "E4", null,
];

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function sine(phase) {
  return Math.sin(phase * Math.PI * 2);
}

function tri(phase) {
  return 1 - 4 * Math.abs(Math.round(phase - 0.25) - (phase - 0.25));
}

function noise(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

function envelope(t, start, length, attack, release) {
  const age = t - start;
  if (age < 0 || age > length) return 0;
  const a = clamp(age / attack, 0, 1);
  const r = clamp((length - age) / release, 0, 1);
  return Math.min(a, r);
}

function addTone(startBeat, lengthBeats, hz, amp, wave, pan, fade = 0.015) {
  const beat = 60 / bpm;
  const start = startBeat * beat;
  const length = lengthBeats * beat;
  const startSample = Math.floor(start * sampleRate);
  const endSample = Math.min(totalSamples, Math.floor((start + length) * sampleRate));
  for (let i = startSample; i < endSample; i++) {
    const t = i / sampleRate;
    const env = envelope(t, start, length, fade, Math.min(0.18, length * 0.45));
    const phase = (t - start) * hz;
    const wobble = sine((t - start) * 0.24) * 0.003;
    const value = wave(phase + wobble) * amp * env;
    const left = value * (1 - pan) * 0.5;
    const right = value * (1 + pan) * 0.5;
    data[i * 2] += left * 32767;
    data[i * 2 + 1] += right * 32767;
  }
}

function addKick(startBeat) {
  const beat = 60 / bpm;
  const start = startBeat * beat;
  const length = 0.24;
  const startSample = Math.floor(start * sampleRate);
  const endSample = Math.min(totalSamples, Math.floor((start + length) * sampleRate));
  for (let i = startSample; i < endSample; i++) {
    const t = i / sampleRate - start;
    const env = Math.exp(-t * 15);
    const hz = 92 - 48 * clamp(t / length, 0, 1);
    const value = sine(t * hz) * 0.35 * env;
    data[i * 2] += value * 32767;
    data[i * 2 + 1] += value * 32767;
  }
}

function addHat(startBeat, amp) {
  const beat = 60 / bpm;
  const start = startBeat * beat;
  const length = 0.06;
  const startSample = Math.floor(start * sampleRate);
  const endSample = Math.min(totalSamples, Math.floor((start + length) * sampleRate));
  for (let i = startSample; i < endSample; i++) {
    const t = i / sampleRate - start;
    const env = Math.exp(-t * 50);
    const value = noise(i) * amp * env;
    data[i * 2] += value * 32767;
    data[i * 2 + 1] += value * 32767;
  }
}

for (let bar = 0; bar < bars; bar++) {
  const chord = chords[bar % chords.length];
  const baseBeat = bar * beatsPerBar;
  chord.forEach((note, idx) => {
    addTone(baseBeat, 4, noteHz[note], idx === 0 ? 0.13 : 0.055, idx === 0 ? sine : tri, idx * 0.12 - 0.18, 0.08);
  });
  for (let beat = 0; beat < beatsPerBar; beat++) {
    addKick(baseBeat + beat);
    addHat(baseBeat + beat + 0.5, 0.035);
  }
}

for (let step = 0; step < melody.length; step++) {
  const note = melody[step];
  if (!note) continue;
  addTone(step * 0.5, 0.46, noteHz[note], 0.08, tri, step % 4 < 2 ? -0.28 : 0.28, 0.01);
}

for (let i = 0; i < data.length; i++) {
  data[i] = clamp(Math.round(data[i]), -32767, 32767);
}

function writeString(buffer, offset, text) {
  for (let i = 0; i < text.length; i++) buffer.writeUInt8(text.charCodeAt(i), offset + i);
}

const bytesPerSample = 2;
const dataSize = data.length * bytesPerSample;
const buffer = Buffer.alloc(44 + dataSize);
writeString(buffer, 0, "RIFF");
buffer.writeUInt32LE(36 + dataSize, 4);
writeString(buffer, 8, "WAVE");
writeString(buffer, 12, "fmt ");
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(channels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * channels * bytesPerSample, 28);
buffer.writeUInt16LE(channels * bytesPerSample, 32);
buffer.writeUInt16LE(16, 34);
writeString(buffer, 36, "data");
buffer.writeUInt32LE(dataSize, 40);

for (let i = 0; i < data.length; i++) {
  buffer.writeInt16LE(data[i], 44 + i * 2);
}

const output = path.join(__dirname, "..", "audio", "cardloot_shadow_tavern_loop.wav");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, buffer);
console.log(output);
