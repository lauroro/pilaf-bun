// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import type { State } from "../../types/state"
import { writeState } from "./write"
import { PATHS } from "../../env/paths"

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

const bunWriteMock = mock()
const originalBunWrite = Bun.write

Bun.write = bunWriteMock

beforeEach(() => {
    mock.restore()
    Bun.write = bunWriteMock
})

afterEach(() => {
    Bun.write = originalBunWrite
    bunWriteMock.mockReset()
})

describe("writeState", () => {
    it("writes in the correct path", async () => {
        await writeState(state)
        const [filePath, _] = bunWriteMock.mock.calls[0]!
        expect(filePath).toBe(PATHS.STATE)
    })

    it("writes the correct format", async () => {
        await writeState(state)
        const [_, fileContent] = bunWriteMock.mock.calls[0]!
        const parsedContent = JSON.parse(fileContent)
        expect(parsedContent).toEqual({
            currentPalette: state.currentPalette,
            createdAt: expect.any(String),
        })
    })
})
