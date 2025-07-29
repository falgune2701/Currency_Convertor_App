import { useId } from "react";


function InputBox({
    label,
    amount,
    onAmountChange = () => { },
    onCurrencyChange = () => { },
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {

    const amountInputId = useId();
    const currencySelectId = useId();

    return (
        <div className={`bg-white/95 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
            <div className="flex items-center justify-between">

                <div className="flex-1 mr-4">
                    <label htmlFor={amountInputId} className="block mb-2 text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <input
                        id={amountInputId}
                        className="w-full text-2xl font-semibold text-gray-900 placeholder-gray-400 bg-transparent border-none outline-none"
                        type="number"
                        placeholder="0.00"
                        disabled={amountDisable}
                        value={amount}
                        onChange={(e) => {
                            const value = e.target.value;
                            onAmountChange(value === "" ? "" : Number(value));
                        }}
                    />
                </div>
                <div className="flex flex-col items-end">
                    <label htmlFor={currencySelectId} className="block mb-2 text-sm font-medium text-gray-700">Currency</label>
                    <select
                        id={currencySelectId}
                        className="px-1 py-1 rounded-lg outline-none cursor-pointer bg-gray-300/70"
                        value={selectedCurrency}
                        disabled={currencyDisable}
                        onChange={(e) => onCurrencyChange(e.target.value)}
                        aria-label="currency-type"

                    >

                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}

                    </select>
                </div>
            </div>
        </div>
    );
}

export default InputBox;
