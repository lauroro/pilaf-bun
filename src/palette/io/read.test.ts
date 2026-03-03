// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { PATHS } from "../../env/paths"
import { readPalette } from "./read"

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

describe("readPalette", () => {
    it("loads correct palette file path", async () => {
        bunFileMock.mockReturnValue({
            text: mock().mockResolvedValue("palette yaml"),
        })

        const result = await readPalette("nord")

        expect(bunFileMock).toHaveBeenCalledWith(`${PATHS.PALETTES}/nord.yaml`)

        expect(result).toBe("palette yaml")
    })

    it("throws if file cannot be read", async () => {
        bunFileMock.mockReturnValue({
            text: mock().mockRejectedValue(new Error("not found")),
        })

        await expect(readPalette("missing")).rejects.toThrow()
    })
})
