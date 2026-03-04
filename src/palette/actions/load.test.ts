// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect, mock } from "bun:test"
import { loadPalette } from "./load"

const validColorsObject = {
    base00: "000000",
    base01: "111111",
    base02: "222222",
    base03: "333333",
    base04: "444444",
    base05: "555555",
    base06: "666666",
    base07: "777777",
    base08: "888888",
    base09: "999999",
    base0A: "aaaaaa",
    base0B: "bbbbbb",
    base0C: "cccccc",
    base0D: "dddddd",
    base0E: "eeeeee",
    base0F: "ffffff",
}

describe("loadPalette", () => {
    it("reads, parses, builds, validates and normalizes a palette", async () => {
        mock.module("../io/read", () => ({
            readPalette: async (_name: string) =>
                JSON.stringify(validColorsObject),
        }))

        const palette = await loadPalette("test")

        expect(palette.name).toBe("test")
        expect(palette.colors.base00).toBe("000000")
    })

    it("throws if palette structure is invalid", async () => {
        mock.module("../io/read", () => ({
            readPalette: async () => JSON.stringify({ invalid: true }),
        }))

        await expect(loadPalette("bad")).rejects.toThrow("invalid palette")
    })

    it("throws if a color is invalid hex", async () => {
        const invalid = {
            ...validColorsObject,
            base00: "zzzzzz",
        }

        mock.module("../io/read", () => ({
            readPalette: async () => JSON.stringify(invalid),
        }))

        await expect(loadPalette("bad")).rejects.toThrow("invalid palette")
    })

    it("throws if JSON is malformed", async () => {
        mock.module("../io/read", () => ({
            readPalette: async () => `{ invalid json`,
        }))

        await expect(loadPalette("bad")).rejects.toThrow()
    })
})
