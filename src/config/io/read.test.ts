// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test"
import { PATHS } from "../../env/paths"
import { readConfig } from "./read"

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

describe("readConfig", () => {
    it("loads correct palette file path", async () => {
        bunFileMock.mockReturnValue({
            text: mock().mockResolvedValue("all good"),
        })

        const result = await readConfig()

        expect(bunFileMock).toHaveBeenCalledWith(PATHS.CONFIG)

        expect(result).toBe("all good")
    })

    it("throws if file cannot be read", async () => {
        bunFileMock.mockReturnValue({
            text: mock().mockRejectedValue(new Error("not found")),
        })

        await expect(readConfig("missing")).rejects.toThrow()
    })
})
