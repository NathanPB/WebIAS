package cf.nathanpb.webias.utils

import kotlin.math.pow

class NumericUtils {
    companion object {

        fun hexaToDecimal(hex: String) = if(hex.isEmpty()) 0L else hex.toLong(16)
        fun hexToBinary(hex: String) = if(hex.isEmpty()) "0" else decimalToBinary(hex.toLong(16))

        fun decimalToHex(num: Long) = num.toString(16).toUpperCase()
        fun decimalToBinary(num : Long) = num.toString(2)

        fun binaryToHex(num : String) = binaryToDecimal(num).toString(16).toUpperCase()
        fun binaryToDecimal(num : String) = if(num.isEmpty()) 0L else num.toLong(2)


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

        fun prefix(num : Any) = getType(num).prefix+num
    }
}