package cf.nathanpb.webias.core.instructions

import cf.nathanpb.webias.core.IASCore
import cf.nathanpb.webias.core.InstructionType
import cf.nathanpb.webias.core.MemoryWord

interface Instruction {
    val opcode : Int
    val description : String
    val display : String
    val type : InstructionType
    val argswordsize : Int

    fun run(core : IASCore)

    fun parseArgument(text : String) : MemoryWord
    fun lookFor() : String
}