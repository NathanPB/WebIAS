package cf.nathanpb.webias.core

import cf.nathanpb.webias.utils.Logger
import cf.nathanpb.webias.gui.MemoryTable

class MemoryArray<T>(val capacity: Int, val name : String) : HashMap<T, MemoryWord>(capacity) {

    private val links = ArrayList<MemoryTable<T>>()

    override fun get(index: T): MemoryWord {
        val a = super.get(index) ?: MemoryWord(0, 0)
        Logger.debug(this::class) {
            "[$name] Internal Memory Read: [$index] = $a"
        }
        return a
    }

    override fun put(key: T, value: MemoryWord): MemoryWord? {
        val a = super.put(key, value)
        Logger.debug(this::class) {
            "[$name] Internal Memory Write: [$key] = $a"
        }
        links.forEach { t -> t.update() }
        return a
    }

    fun read(cpu : CPU) {
        cpu.ALU["MBR"] = this[cpu.CU["MAR"].decimal as T]
    }

    fun write(cpu : CPU) {
        this[cpu.CU["MAR"].decimal as T] =  cpu.ALU["MBR"]
    }

    override fun toString(): String {
        return this.filter {!it.value.isEmpty()}.map {"${it.key}:\t${it.value}" }.joinTo(StringBuilder(), "\n").toString()
    }

    fun link(table : MemoryTable<T>) = links.add(table)
    fun unlink(table : MemoryTable<T>) = links.remove(table)
}