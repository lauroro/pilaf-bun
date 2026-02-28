// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { parseConfig } from "./parse"

const configYaml = `
targets:
  - file1
  - file2
commands:
  - echo hi
  - sleep 1
`

describe("parseConfig", () => {
    it("parses YAML", () => {
        const config = parseConfig(configYaml)
        expect(config.targets.length).toBe(2)
        expect(config.commands!.length).toBe(2)
    })
})
