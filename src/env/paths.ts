// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { env } from "bun"

const CONFIG_HOME = env.XDG_CONFIG_HOME ?? `${env.HOME}/.config`

export const PATHS = Object.freeze({
    PILAF: `${CONFIG_HOME}/pilaf`,
    PALETTES: `${CONFIG_HOME}/pilaf/palettes`,
    STATE: `${CONFIG_HOME}/pilaf/state.json`,
    CONFIG: `${CONFIG_HOME}/pilaf/config.yaml`,
})
