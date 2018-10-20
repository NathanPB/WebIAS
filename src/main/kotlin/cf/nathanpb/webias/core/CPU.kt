package cf.nathanpb.webias.core

import cf.nathanpb.webias.core.instructions.LoadMQ
import cf.nathanpb.webias.core.instructions.LoadMQMX
import cf.nathanpb.webias.core.instructions.StorMX
import cf.nathanpb.webias.utils.Logger

class CPU(val core : IASCore) {
    val instructions = arrayListOf(
            LoadMQ(),
            LoadMQMX(),
            StorMX()
    )

    val CU = MemoryArray<String>(4, "CU")
    val ALU = MemoryArray<String>(3, "ALU")

    init {
        CU["PC"] = MemoryWord(0, 12) //Program Counter
        CU["IR"] = MemoryWord(0, 20) //Instruction Register
        CU["MAR"] = MemoryWord(0, 12) //Memory Address Register
        CU["IBR"] = MemoryWord(0, 20) //Instruction Buffer Register

        ALU["AC"] = MemoryWord(0, 20) //Accumulator
        ALU["MQ"] = MemoryWord(0, 20) //Multiplier Quotient
        ALU["MBR"] = MemoryWord(0, 40) //Memory Buffer Register
    }


    fun next() {
        nextSearchCycle()
        nextExecutionCycle()
    }

    fun nextSearchCycle() {
        if(CU["IBR"].isEmpty()) {
            CU["MAR"] = CU["PC"]
            val word = core.memory[CU["PC"].decimal]
            CU["IR"] = word.firstInstruction()
            CU["IBR"] = word.secondInstruction()
            core.memory.read(this)
        } else {
            CU["IR"] = CU["IBR"]
            CU["IBR"] = MemoryWord(0, 0)
            CU["PC"] = CU["PC"]+1
        }
    }

    fun nextExecutionCycle() {
        Logger.debug(this::class){
            "${CU["IR"]}\n${CU["IR"].firstOpcode()}\n${CU["IR"].secondOpcode()}"
        }
        instructions
            .filter {it.opcode == CU["IR"].firstOpcode().decimal.toInt()}
            .firstOrNull()?.run(core)
    }
}