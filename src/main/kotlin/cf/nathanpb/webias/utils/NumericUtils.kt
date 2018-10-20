package cf.nathanpb.webias.utils

import kotlin.math.pow

class NumericUtils {
    companion object {

        /*
        fun hexaToDecimal(){

        }

        fun hexaToBinary(){

        }


        fun decimalToHexa(){

        }
        */

        fun decimalToBinary(num : Long) = num.toString(2)

        fun binaryToHexa(num : String) : String {
            val a = binaryToDecimal(num).toString(16).toUpperCase()
            Logger.debug(NumericUtils::class){"Convertin from binary to hexadecimal: $num is $a"}
            return a
        }

        fun binaryToDecimal(num : String) : Long {
            var output = 0L
            for(i in (0..num.length)) {
                val current = num.reversed()[i]
                if(current == '1') {
                    output += (2.0).pow(i).toInt()
                }
            }
            Logger.debug(NumericUtils::class) {"Converting from binary to decimal: $num is $output"}
            return output
        }

        fun getType(num : Any) : NumericType {
            var num = num.toString()
            val type = when{
                num.startsWith("2x") ->  NumericType.BINARY
                num.startsWith("0x") -> NumericType.HEXADECIMAL
                num.startsWith("10x") -> NumericType.DECIMAL
                num.contains('A') || num.contains('B') ||
                        num.contains('C') || num.contains('D') ||
                        num.contains('E') || num.contains('F') -> NumericType.HEXADECIMAL
                else -> NumericType.DECIMAL
            }
            Logger.debug(NumericUtils::class) {"Finding numeric type: $num is $type"}
            return type
        }

        fun pad(str : String, size : Int) : String {
            var str = str
            while (str.length < size) str = "0$str"
            return str
        }

        fun prefix(num : Any) = getType(num).prefix+num
    }
}