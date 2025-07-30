import { useId } from "react";


function InputBox({
    label,
    amount,
    onAmountChange = () => { },
    onCurrencyChange = () => { },
    currencyOptions = [],
    selectedCurrency,
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {

    const amountInputId = useId();
    const currencySelectId = useId();

    return (
        <div className={`bg-slate-700/40 backdrop-blur-md p-4 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-xl transition-all duration-200 hover:border-cyan-400/30 ${className}`}>
            <div className="flex items-center justify-between">

                <div className="flex-1 mr-4">
                    <label htmlFor={amountInputId} className="block mb-2 text-sm font-medium text-cyan-200">
                        {label}
                    </label>
                    <input
                        id={amountInputId}
                        className="w-full text-2xl font-semibold text-white bg-transparent border-none outline-none placeholder-cyan-400/50"
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
                    <label htmlFor={currencySelectId} className="block mb-2 text-sm font-medium text-cyan-200">Currency</label>
                    <select
                        id={currencySelectId}
                        className="px-1 py-1 rounded-lg outline-none cursor-pointer bg-gray-300/70 text-slate-900"
                        value={selectedCurrency}
                        disabled={currencyDisable}
                        onChange={(e) => onCurrencyChange(e.target.value)}
                        aria-label="currency-type"

                    >

                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency} className="text-white bg-slate-700">
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
