package cf.nathanpb.webias.core

import cf.nathanpb.webias.gui.GUIHandler

class IASCore {

    companion object {
        var instance : IASCore? = null
        var debug = true
    }

    val cpu = CPU(this)
    val memory = MemoryArray<Long>(1024, "RAM")


init {
        for(i in 0L.until(memory.capacity)){
            memory[i] = MemoryWord(0, 40)
        }
    }
    override fun toString(): String {
        var cpu = cpu.ALU.toString()+"\n"+cpu.CU.toString()
        val mem = memory.toString()
        return "[CPU]\n$cpu\n\n[Memory]\n$mem"
    }
}

fun main(args : Array<String>){
    IASCore.instance = IASCore()
    IASCore.instance!!.memory[1] = MemoryWord(10, 40)
    GUIHandler(IASCore.instance as IASCore)
}