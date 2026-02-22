// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Base16Key } from "./base16-key"

export type HexColor = string

export type Palette = {
    name: string
    colors: Record<Base16Key, HexColor>
}
