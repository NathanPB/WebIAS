package cf.nathanpb.webias.core

import cf.nathanpb.webias.gui.GUIHandler

class IASCore {

    companion object {
        var instance : IASCore? = null
        var debug = true
    }

    val cpu = CPU(this)
    val memory = MemoryArray<Int>(1024, "RAM")


    init {
        for(i in 0.until(memory.capacity)){
            memory[i] = MemoryWord(0, 40)
        }
    }
    override fun toString(): String {
        val cpu = cpu.ALU.toString()+"\n"+cpu.CU.toString()
        return "[CPU]\n$cpu\n\n[Memory]\n$memory"
    }
}

fun main(args : Array<String>){
    IASCore.instance = IASCore()
    IASCore.instance!!.memory[1] = MemoryWord(10, 40)
    GUIHandler(IASCore.instance as IASCore)
}