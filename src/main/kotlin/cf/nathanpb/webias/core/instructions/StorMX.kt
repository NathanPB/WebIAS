package cf.nathanpb.webias.core.instructions

import cf.nathanpb.webias.core.IASCore
import cf.nathanpb.webias.core.InstructionType
import cf.nathanpb.webias.core.MemoryWord
import cf.nathanpb.webias.utils.Logger
import cf.nathanpb.webias.utils.NumericType
import cf.nathanpb.webias.utils.NumericUtils


class StorMX : Instruction {
    override val opcode = 33
    override val description = "Transfers data from AC to Memory[X]"
    override val display = "STOR M(X)"
    override val type = InstructionType.DATA_TRANSFER
    override val argswordsize = 20

    override fun run(core: IASCore) {
        Logger.debug(this::class){"Run: ${this::class.simpleName}"}
        core.cpu.ALU.MBR = core.cpu.ALU.AC
        core.cpu.CU.MAR = core.cpu.CU.IR.leftAddress()
        core.memory.read(core.cpu)
    }

    override fun parseArgument(text: String): MemoryWord {
        val t = text.substring(text.indexOf("(")+1, text.indexOf(")"))
        return MemoryWord(when(NumericUtils.getType(t)){
            NumericType.DECIMAL -> t.toLong()
            NumericType.BINARY -> NumericUtils.binaryToDecimal(t)
            NumericType.HEXADECIMAL -> t.toLong(16)
        },12)
    }

    override fun lookFor() = display.substring(0, 6)
}