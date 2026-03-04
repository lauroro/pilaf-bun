// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect, mock } from "bun:test"
import { loadState } from "./load"
import type { State } from "../../types/state"
import { BASE16_KEYS } from "../../types/base16-key"

const validState: State = {
    currentPalette: {
        name: "test",
        colors: Object.fromEntries(
            BASE16_KEYS.map((k) => [k, "000000"])
        ) as any,
    },
    createdAt: new Date().toISOString(),
}

describe("loadState", () => {
    it("reads, parses and validates a valid state", async () => {
        mock.module("../io/read", () => ({
            readState: async () => JSON.stringify(validState),
        }))

        const state = await loadState()

        expect(state.currentPalette.name).toBe("test")
        expect(typeof state.createdAt).toBe("string")
    })

    it("throws if state is invalid structure", async () => {
        mock.module("../io/read", () => ({
            readState: async () => JSON.stringify({ invalid: true }),
        }))

        await expect(loadState()).rejects.toThrow("invalid state")
    })

    it("throws if a color is invalid", async () => {
        const invalid = {
            ...validState,
            currentPalette: {
                ...validState.currentPalette,
                colors: {
                    ...validState.currentPalette.colors,
                    base00: "zzzzzz",
                },
            },
        }

        mock.module("../io/read", () => ({
            readState: async () => JSON.stringify(invalid),
        }))

        await expect(loadState()).rejects.toThrow("invalid state")
    })

    it("throws if JSON is malformed", async () => {
        mock.module("../io/read", () => ({
            readState: async () => `{ invalid json`,
        }))

        await expect(loadState()).rejects.toThrow()
    })
})
