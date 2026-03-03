// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect, mock } from "bun:test"
import { loadConfig } from "./load"
import { env } from "bun"

describe("loadConfig", () => {
    it("reads, parses, validates and normalizes a config", async () => {
        mock.module("../io/read", () => ({
            readConfig: async () => `
targets:
  - ~/.config/file1
  - ~/.config/file2
commands:
  - echo done
`,
        }))

        const config = await loadConfig()

        expect(config.targets).toEqual([
            `${env.HOME}/.config/file1`,
            `${env.HOME}/.config/file2`,
        ])
        expect(config.commands).toEqual(["echo done"])
    })

    it("works without commands (optional field)", async () => {
        mock.module("../io/read", () => ({
            readConfig: async () => `
targets:
  - ~/.config/file1
`,
        }))

        const config = await loadConfig()

        expect(config.targets).toEqual([`${env.HOME}/.config/file1`])
        expect(config.commands).toBeUndefined()
    })

    it("throws if config is invalid", async () => {
        mock.module("../io/read", () => ({
            readConfig: async () => `
invalid: true
`,
        }))

        await expect(loadConfig()).rejects.toThrow("invalid config")
    })
})
