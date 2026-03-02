// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, expect, it } from "bun:test"
import { buildPalette } from "./build"
import { BASE16_KEYS } from "../../types/base16-key"

describe("buildPalette", () => {
    it("builds a palette object", () => {
        const colors: any = {}

        for (const key of BASE16_KEYS) {
            colors[key] = "ffffff"
        }

        const palette = buildPalette("test", colors)

        expect(palette.name).toBe("test")
        expect(palette.colors).toBe(colors)
    })
})
