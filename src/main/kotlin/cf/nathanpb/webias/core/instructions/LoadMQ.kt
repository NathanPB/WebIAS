package cf.nathanpb.webias.core.instructions

import cf.nathanpb.webias.core.IASCore
import cf.nathanpb.webias.core.InstructionType
import cf.nathanpb.webias.core.MemoryWord
import cf.nathanpb.webias.utils.Logger

class LoadMQ : Instruction {
    override val opcode = 10
    override val description = "Transfer data from MQ to AC"
    override val display = "LOAD MQ"
    override val type = InstructionType.DATA_TRANSFER
    override val argswordsize = 0

    override fun run(core: IASCore) {
        Logger.debug(this::class){"Run: ${this::class.simpleName}"}
        core.cpu.ALU.AC = core.cpu.ALU.MQ
    }

    override fun parseArgument(text: String) = MemoryWord(0, 12)

    override fun lookFor() = display
}