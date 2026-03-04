// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect, mock } from "bun:test"
import { loadState } from "./load"
import { BASE16_KEYS } from "../../types/base16-key"

const validStateYaml = `
currentPalette:
  name: test
  colors:
${BASE16_KEYS.map((k) => `    ${k}: "000000"`).join("\n")}
createdAt: ${new Date().toISOString()}
`

describe("loadState", () => {
    it("reads, parses and validates a valid state", async () => {
        mock.module("../io/read", () => ({
            readState: async () => validStateYaml,
        }))

        const state = await loadState()

        expect(state.currentPalette.name).toBe("test")
        expect(typeof state.createdAt).toBe("string")
    })

    it("throws if state is invalid", async () => {
        mock.module("../io/read", () => ({
            readState: async () => `
invalid: true
`,
        }))

        await expect(loadState()).rejects.toThrow("invalid state")
    })

    it("throws if a color is invalid", async () => {
        mock.module("../io/read", () => ({
            readState: async () => `
currentPalette:
  name: test
  colors:
    base00: zzzzzz
createdAt: ${new Date().toISOString()}
`,
        }))

        await expect(loadState()).rejects.toThrow("invalid state")
    })
})
