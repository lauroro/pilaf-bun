// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { runCommands } from "./run-commands"

describe("runCommands", () => {
    it("resolves when commands succeed", async () => {
        await expect(runCommands(["echo ok"])).resolves.toBeUndefined()
    })

    it("throws when command fails", async () => {
        await expect(
            runCommands(["sh -c 'echo error >&2; exit 1'"])
        ).rejects.toThrow("Command failed")
    })
})
