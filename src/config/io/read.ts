// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { PATHS } from "../../env/paths"

export const readConfig = async (): Promise<string> => {
    const content = Bun.file(PATHS.CONFIG)
    return await content.text()
}
