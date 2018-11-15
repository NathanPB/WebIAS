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
            var text = "<span style='color: green;'>Assembled Successful</span>\n"
            val telement = document.querySelector("#assembler-status-text")
            val tlist = document.querySelector("#assembler-status-list")

            telement?.innerHTML = ""
            tlist?.innerHTML = ""
            try{
                val parser = AssemblyParser(core, terminal.dom.value)
                parser.writeToMemory()
                parser.changes
                    .map { "M[${it.key}] = ${it.value}" }
                    .forEach { tlist?.innerHTML += "\n<li class='list-group-item'>$it</li>" }

            } catch (ex: Exception) {
                text = "<span style='color: red;'>${ex.message}</span>"
            }
            telement?.innerHTML = text
            eval("$('#modal-assemblerstatus').modal({focus: true, show: true})")
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