// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { env } from "bun"
import { describe, it, expect } from "bun:test"
import type { Config } from "../../types/config"
import { normalizeConfig } from "./normalize"

const config: Config = {
    targets: ["~/file.txt", "/etc/file.ini"],
}

describe("normalizeConfig", () => {
    it("expands ~ correctly", () => {
        const home = env.HOME!
        const result = normalizeConfig(config)
        expect(result.targets[0]).toBe(`${home}/file.txt`)
        expect(result.targets[1]).toBe("/etc/file.ini")
    })
})
