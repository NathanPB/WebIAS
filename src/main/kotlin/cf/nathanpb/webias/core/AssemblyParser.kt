package cf.nathanpb.webias.core

import cf.nathanpb.webias.utils.Logger
import cf.nathanpb.webias.utils.NumericUtils
import cf.nathanpb.webias.utils.StringUtils

class AssemblyParser(val core : IASCore, code : String) {
    val instructions = ArrayList<InstructionRuntime>()
    val changes = mutableMapOf<Int, MemoryWord>()

    init {
        Logger.debug(this::class){"Starting Parsing Process"}
        code.toUpperCase().split("\n").forEach { line ->
            val opcode = core.cpu.instructions.filter {
                Logger.debug(this::class) {it.display}
                if(line == it.lookFor()){
                    return@filter true
                } else {
                    if(line.length <= it.lookFor().length){
                        return@filter false
                    } else {
                        val next = line[it.lookFor().length]
                        return@filter line.startsWith(it.lookFor()) && (next == '(' || next == '[')
                    }
                }
            }.firstOrNull()
            val args = opcode?.parseArgument(line)
            if(opcode != null) {
                instructions.add(InstructionRuntime(opcode, args))
            }
        }
        Logger.debug(this::class){"Parsing Process is Done"}
    }

    fun writeToMemory(){
        Logger.debug(this::class) {
            "Starting Writing Proccess"
        }
        var clockdivisor = false
        var addr = 0
        instructions.forEach {
            val opcode = StringUtils.pad(NumericUtils.decimalToBinary(it.ins.opcode.toLong()), 8)
            val adr = if(it.arg == null) "000000000000" else  StringUtils.pad(it.arg.binary, 12)

            var word = MemoryWord(NumericUtils.binaryToDecimal("$opcode$adr"), 40)
            if(clockdivisor){
                word = MemoryWord(NumericUtils.binaryToDecimal(
                        "${word.leftInstruction().binary}${core.memory[addr].leftInstruction().binary}"
                ),40)
            }

            core.memory[addr] = word
            if(changes.containsKey(addr)) changes.remove(addr)
            changes[addr] = word

            Logger.debug(this::class) {
                "Instruction written to M[$addr]: ${it.format()} | $word"
            }

            if(clockdivisor){
                addr++
            }
            clockdivisor = !clockdivisor
        }
        Logger.debug(this::class) {
            val curmemory = core.memory.toString()
            core.memory[0].toString()+"\n"
            "Writing Process is Done!\nCurrent Memory: ${if(curmemory.isEmpty()) "Empty" else "\n$curmemory"}"
        }
    }

}