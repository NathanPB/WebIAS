package cf.nathanpb.webias.core.instructions

import cf.nathanpb.webias.core.IASCore
import cf.nathanpb.webias.core.InstructionType
import cf.nathanpb.webias.core.MemoryWord
import cf.nathanpb.webias.utils.NumericType
import cf.nathanpb.webias.utils.NumericUtils


class LoadMQMX : Instruction {
    override val opcode = 9
    override val description = "Transfer data from Memory[X] to MQ"
    override val display = "LOAD MQ,M(X)"
    override val type = InstructionType.DATA_TRANSFER
    override val argswordsize = 20

    override fun run(core: IASCore) {
        cf.nathanpb.webias.utils.Logger.debug(this::class){"Run: ${this::class.simpleName}"}
        core.cpu.CU.MAR = core.cpu.CU.IR.leftAddress()
        core.memory.read(core.cpu)
        core.cpu.ALU.MQ = core.cpu.ALU.MBR
    }

    override fun parseArgument(text: String): MemoryWord {
        val t = text.substring(10, text.indexOf(")"))
        return MemoryWord(when(NumericUtils.getType(t)){
            NumericType.DECIMAL -> t.toLong()
            NumericType.BINARY -> NumericUtils.binaryToDecimal(t)
            NumericType.HEXADECIMAL -> t.toLong(16)
        },12)
    }

    override fun lookFor() = display.substring(0, 9)
}