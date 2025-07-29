import { useState } from 'react'
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo.jsx";
import urlImage from './assets/url-image.png';
import { ArrowUpDown, TrendingUp, DollarSign } from 'lucide-react';


function App() {
    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("inr")
    const [amount, setAmount] = useState(0)
    const [convertedAmount, setConvertedAmount] = useState(0)

    //   const currencyInfo = useCurrencyInfo(from)
    //   const options = Object.keys(currencyInfo)

    const { data: currencyInfo, loading, error } = useCurrencyInfo(from);
    const options = Object.keys(currencyInfo || {});

    const swap = () => {
        setFrom(to)
        setTo(from)
        setConvertedAmount(amount)
        setAmount(convertedAmount)
    }
    const convert = () => {
        if (!currencyInfo[to]) return;
        setConvertedAmount(amount * currencyInfo[to]);
    }

    const exchangeRate = currencyInfo[to] || 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="border-b shadow-sm bg-white/80 backdrop-blur-sm border-gray-200/50">
                <div className="px-4 py-4 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={urlImage} alt="description" className="object-contain w-10 h-10" />
                            {/* <DollarSign className="w-6 h-6 text-white" /> */}

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Currency Exchange</h1>
                                <p className="text-sm text-gray-600">Real-time currency conversion</p>
                            </div>
                        </div>
                        <div className="items-center hidden gap-2 text-sm text-gray-600 md:flex">
                            <a href="https://www.xe.com/currencyconverter/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:underline">
                                <TrendingUp className="w-4 h-4" />
                                <span>Live rates</span>

                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title & Logo */}
            {/* <div className="flex items-center justify-center gap-3 p-4">
                <img src="./src/assets/url-image.png" alt="currency-exchange-logo" className='p-1.5 w-9 lg:w-11 bg-white/35 rounded-2xl' />
                <h1 className='text-xl font-semibold text-white uppercase lg:text-2xl'>Currency Convertor</h1>
            </div> */}

            {/* Main Content */}
            <div className="max-w-2xl px-4 py-8 mx-auto">

                {/* Error / Loading Messages */}
                {error && (
                    <div className="p-4 mb-6 border border-red-200 bg-red-50 rounded-xl">
                        <p className="flex items-center gap-2 font-medium text-red-700">
                            ⚠ {error}
                        </p>
                    </div>
                )}
                {loading && (
                    <div className='p-4 mb-6 border border-blue-200 bg-blue-50 rounded-xl'>
                        <p className="flex items-center gap-2 font-medium text-blue-700">
                            <div className="w-4 h-4 border-2 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            Loading exchange rates...
                        </p>

                    </div>
                )}

                {/* Exchange Rate Display */}
                {exchangeRate > 0 && (
                    <div className="p-4 mb-6 border bg-white/70 backdrop-blur-sm rounded-xl border-gray-200/50">
                        <p className="text-center text-gray-700">
                            <span className="font-semibold">1 {from.toUpperCase()}</span>
                            <span className="mx-2">=</span>
                            <span className="font-semibold text-blue-600">{exchangeRate.toFixed(4)} {to.toUpperCase()}</span>
                        </p>
                    </div>
                )}

                {/* Centered Converter Card */}
                <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-2xl border-gray-200/50">

                    <div className="space-y-6">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onAmountChange={(amount) => setAmount(amount)}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectedCurrency={from}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="p-3 my-4 transition-all duration-200 bg-white border-2 border-blue-200 rounded-full shadow-md hover:bg-gray-50 hover:border-blue-300 hover:shadow-lg group"
                            onClick={swap}
                            title="Swap currencies"
                        >
                            <ArrowUpDown className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:rotate-180" />
                            {/* ⇅ istead of "swap" */}
                        </button>
                    </div>

                    {/* To Currency */}
                    <InputBox
                        label="To"
                        amount={convertedAmount}
                        currencyOptions={options}
                        onAmountChange={(convertedAmount) => setAmount(convertedAmount)}
                        onCurrencyChange={(currency) => setTo(currency)}
                        selectedCurrency={to}
                    />
                    {/* Convert Button */}
                    <button
                        onClick={convert}
                        disabled={loading}
                        type="submit" className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100">
                        {loading
                            ? "Converting..."
                            : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
                    </button>
                </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-sm text-center text-gray-600">
                <p>Exchange rates are updated in real-time</p>
            </div>

            {/* Footer - Bottom Right */}
            <div className="fixed bottom-4 right-4">
                <div className="max-w-xs px-4 py-3 border rounded-lg shadow-md bg-white/80 backdrop-blur-sm border-gray-200/50">
                    <p className="mb-1 text-sm text-center text-gray-600">Made With 💗 and react</p>
                    <div className="text-xs text-gray-500 space-y-0.5">
                        <p>
                            <span className="font-medium">Creator:</span>{" "}
                            <a
                                href="https://github.com/falgune2701"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline transition-colors duration-200 cursor-pointer hover:text-blue-600 decoration-transparent hover:decoration-blue-600"
                            >
                                Falgune Mondal
                            </a>
                        </p>
                        <p>
                            <span className="font-medium">Contributor:</span>{" "}
                            <a
                                href="https://github.com/Kalyan-github-4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline transition-colors duration-200 cursor-pointer hover:text-blue-600 decoration-transparent hover:decoration-blue-600"
                            >
                                Kalyan Manna
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App
