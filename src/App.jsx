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
    const [lastUpdated, setLastUpdated] = useState(null);

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
        <div className="min-h-screen bg-[url('/sl_121021_47240_04.jpg')] bg-cover bg-center bg-no-repeat">


            {/* Header */}
            <div className="relative z-10 border-b shadow-lg bg-slate-900/90 backdrop-blur-md border-cyan-500/20">
                <div className="px-4 py-4 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={urlImage} alt="description" className="object-contain w-10 h-10" />
                            {/* <DollarSign className="w-6 h-6 text-white" /> */}

                            <div>
                                <h1 className="text-2xl font-bold text-white">Currency Exchange</h1>
                                <p className="text-sm text-cyan-200">Real-time currency conversion</p>
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
            <div className="relative z-10 max-w-2xl px-4 py-8 mx-auto">

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
                    <div className="p-4 mb-6 border shadow-lg bg-slate-800/40 backdrop-blur-md rounded-xl border-cyan-500/20">
                        <div className="flex flex-col items-center gap-1 text-center">
                            <p className="text-white">
                                <span className="font-semibold">1 {from.toUpperCase()}</span>
                                <span className="mx-2 text-cyan-300">=</span>
                                <span className="font-semibold text-cyan-400">{exchangeRate.toFixed(4)} {to.toUpperCase()}</span>
                            </p>
                              {lastUpdated && (
                                <div className="flex items-center gap-1 text-xs text-cyan-300">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Last updated: {formatTime(lastUpdated)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Centered Converter Card */}
                <div className="p-6 border shadow-2xl bg-slate-800/40 backdrop-blur-md rounded-2xl border-cyan-500/20">

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
                            className="p-3 my-4 transition-all duration-200 border-2 rounded-full shadow-lg bg-slate-700/60 hover:bg-slate-600/60 border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-xl backdrop-blur-sm group"
                            onClick={swap}
                            title="Swap currencies"
                        >
                            <ArrowUpDown className="w-5 h-5 transition-transform duration-300 text-cyan-400 group-hover:rotate-180" />
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
                        type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 border border-cyan-500/20 mt-4">
                        {loading
                            ? "Converting..."
                            : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
                    </button>
                </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 space-y-1 text-sm text-center text-cyan-200">
                <p>Exchange rates are updated in real-time</p>
            </div>

            {/* Footer - Bottom Right */}
            <div className="fixed z-20 bottom-4 right-4">
                <div className="max-w-xs px-4 py-3 border rounded-lg shadow-xl bg-slate-800/80 backdrop-blur-md border-cyan-500/20">
                    <p className="mb-1 text-sm text-center text-cyan-200">Made With 💗 and react</p>
                    <div className="text-xs text-cyan-300 space-y-0.5">
                        <p>
                            <span className="font-medium">Creator:</span>{" "}
                            <a
                                href="https://github.com/falgune2701"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline transition-colors duration-200 cursor-pointer hover:text-cyan-400 decoration-transparent hover:decoration-cyan-400"
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
                                className="underline transition-colors duration-200 cursor-pointer hover:text-cyan-400 decoration-transparent hover:decoration-cyan-400"
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
