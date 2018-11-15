package cf.nathanpb.webias.core

import cf.nathanpb.webias.core.instructions.LoadMQ
import cf.nathanpb.webias.core.instructions.LoadMQMX
import cf.nathanpb.webias.core.instructions.StorMX

class CPU(val core : IASCore) {
    val instructions = arrayListOf(
            LoadMQ(),
            LoadMQMX(),
            StorMX()
    )

    val CU = CU()
    val ALU = ALU()
    var left = true


    init {
        CU.PC = MemoryWord(0, 12) //Program Counter
        CU.IR = MemoryWord(0, 20) //Instruction Register
        CU.MAR = MemoryWord(0, 12) //Memory Address Register
        CU.IBR = MemoryWord(0, 20) //Instruction Buffer Register

        ALU.AC = MemoryWord(0, 20) //Accumulator
        ALU.MQ = MemoryWord(0, 20) //Multiplier Quotient
        ALU.MBR = MemoryWord(0, 40) //Memory Buffer Register
    }


    fun next() {
        nextSearchCycle()
        nextExecutionCycle()
    }

    fun nextSearchCycle() {
        if(left) {
            CU.MAR = CU.PC
            core.memory.read(this)
            CU.IR = ALU.MBR.leftInstruction()
            CU.IBR = ALU.MBR.rightInstruction()
        } else {
            CU.IR = CU.IBR
            CU.IBR = MemoryWord.EMPTY
        }
    }

    fun nextExecutionCycle() {
        CU.IBR = ALU.MBR.rightInstruction()
        CU.IR = ALU.MBR.leftInstruction()
        CU.MAR = CU.IR.leftAddress()

        if(left){
            CU.MAR = CU.PC
            core.memory.read(this)
            CU.IR = ALU.MBR.rightOpcode()
            CU.MAR = ALU.MBR.rightAddress()
        } else {
            CU.IR = CU.IBR.leftOpcode()
            CU.IR = CU.IBR.leftAddress()
            CU.PC = CU.PC+1
        }

        instructions.firstOrNull { it.opcode == CU.IR.leftOpcode().decimal.toInt() }?.run(core)
        left = !left
    }
}