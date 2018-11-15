package cf.nathanpb.webias.core

import cf.nathanpb.webias.gui.GUIHandler

class IASCore {

    companion object {
        var instance : IASCore = IASCore()
        var debug = true
    }

    val cpu = CPU(this)
    val memory = MemoryArray<Int>(1024, "RAM")


    init {
        0.until(memory.capacity).withIndex().forEach {
            memory[it.index] = MemoryWord(0, 40)
        }
    }
    override fun toString(): String {
        val cpu = cpu.ALU.toString()+"\n"+cpu.CU.toString()
        return "[CPU]\n$cpu\n\n[Memory]\n$memory"
    }
}

fun main(args : Array<String>){
    GUIHandler(IASCore.instance)
}