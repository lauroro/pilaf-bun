// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it, mock, beforeEach, afterEach } from "bun:test"
import { PATHS } from "../../config/paths"
import type { State } from "../../types/state"
import { readState } from "./read"

const state: State = {
    currentPalette: {
        name: "test-palette",
        colors: {
            base00: "282828",
            base01: "3c3836",
            base02: "504945",
            base03: "665c54",
            base04: "bdae93",
            base05: "d5c4a1",
            base06: "ebdbb2",
            base07: "fbf1c7",
            base08: "fb4934",
            base09: "fe8019",
            base0A: "fabd2f",
            base0B: "b8bb26",
            base0C: "8ec07c",
            base0D: "83a598",
            base0E: "d3869b",
            base0F: "d65d0e",
        },
    },
    createdAt: new Date().toISOString(),
}

const bunFileMock = mock()
const originalBunFile = Bun.file

beforeEach(() => {
    mock.restore()
    Bun.file = bunFileMock
})

afterEach(() => {
    Bun.file = originalBunFile
    bunFileMock.mockReset()
})

describe("loadState", () => {
    it("loads correct state file path", async () => {
        bunFileMock.mockReturnValue({
            text: mock().mockResolvedValue(JSON.stringify(state)),
        })

        await readState()

        expect(bunFileMock).toHaveBeenCalledWith(PATHS.STATE)
    })

    it("throws if file cannot be read", async () => {
        bunFileMock.mockReturnValue({
            text: mock().mockRejectedValue(new Error("not found")),
        })

        await expect(readState()).rejects.toThrow()
    })
})
