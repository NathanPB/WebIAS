package cf.nathanpb.webias.core

import cf.nathanpb.webias.core.instructions.Instruction

data class InstructionRuntime (val ins : Instruction, val arg : MemoryWord?){
    fun format() = ins.display.replace("X", if(arg == null) "10x0" else "10x${arg.decimal}")
}