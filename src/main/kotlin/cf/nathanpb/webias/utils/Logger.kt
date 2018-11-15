package cf.nathanpb.webias.utils

import cf.nathanpb.webias.core.AssemblyParser
import cf.nathanpb.webias.core.MemoryArray
import cf.nathanpb.webias.gui.MemoryTable
import kotlin.reflect.KClass

class Logger {
    companion object {

        //todo colcoar isso em uma gui
        val blacklist = arrayOf(
                NumericUtils::class,
                MemoryTable::class,
                AssemblyParser::class
        )

        fun debug(from : KClass<*>, run : () -> Any){
            if(!blacklist.contains(from)) {
                val cache = run().toString().split("\n")
                if(cache.size > 1){
                    cache.forEach { debug(from){it}}
                } else {
                    println("[DEBUG] [${from.simpleName}] ${run()}")
                }
            }
        }
    }
}