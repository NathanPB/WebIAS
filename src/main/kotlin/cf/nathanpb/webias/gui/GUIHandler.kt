package cf.nathanpb.webias.gui

import cf.nathanpb.webias.core.AssemblyParser
import cf.nathanpb.webias.core.IASCore
import org.w3c.dom.HTMLSelectElement
import kotlin.browser.document


class GUIHandler(val core : IASCore){

    companion object {
        val terminal = CodingArea("coding-area")
        val numBase = document.querySelector("#numeric-base-display") as HTMLSelectElement
    }
    val mainmemory = MemoryTable("main-memory", core.memory)
    val cu = MemoryTable("cu-memory", core.cpu.CU)
    val alu = MemoryTable("alu-memory", core.cpu.ALU)

    init {
        document.querySelector("#button-next-search")?.addEventListener("click", {
            core.cpu.nextSearchCycle()
        })
        document.querySelector("#button-next-execution")?.addEventListener("click", {
            core.cpu.nextExecutionCycle()
        })
        document.querySelector("#button-next")?.addEventListener("click", {
            core.cpu.next()
        })
        document.querySelector("#button-w2m")?.addEventListener("click", {
            AssemblyParser(core, terminal.dom.value).writeToMemory()
        })

        document.querySelector("#debugger-filter").let{
            //todo list all classes
        }

        GUIHandler.numBase.addEventListener("change", {
            mainmemory.update()
            cu.update()
            alu.update()
        })
    }
}