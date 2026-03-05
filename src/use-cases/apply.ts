// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { extractBlocks, transformBlocks } from "../block"
import { loadConfig } from "../config"
import { rebuildFile } from "../file"
import { loadPalette } from "../palette"
import { createState, loadState, writeState } from "../state"
import { runCommands } from "../utils/run-commands"

/**
 * Orchestrate: apply theme
 */
export const apply = async (name: string) => {
    try {
        const palette = await loadPalette(name)
        const state = await loadState()
        const config = await loadConfig()
        for (const target of config.targets) {
            const content = await Bun.file(target).text()
            const blocks = extractBlocks(content)
            const transformedBlocks = transformBlocks(
                blocks,
                state.currentPalette,
                palette
            )
            const transformedContent = rebuildFile(content, transformedBlocks)
            await Bun.write(target, transformedContent)
        }
        config.commands && (await runCommands(config.commands))
        const newState = createState(palette)
        await writeState(newState)
    } catch (err) {}
}
