import { useState } from 'react'
import { InputBox } from "./components";
import useCurrencyInfo  from "./hooks/useCurrencyInfo";

function App() {
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

    return (
        <div
            className="flex flex-wrap w-full h-screen bg-no-repeat bg-cover"
            style={{backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/040/959/652/non_2x/currency-exchange-concept-with-graph-chart-and-dollar-coin-forex-trading-financial-markets-and-global-economy-design-background-illustration-vector.jpg")`}}
        >
          <div className='flex items-center justify-center gap-3 mx-auto '>
            <img src="./src/assets/url-image.png" alt="currency-exchange-logo" className='p-1.5 w-9 lg:w-11 bg-white/35 rounded-2xl' />
            <h1 className='text-xl font-semibold text-white uppercase lg:text-2xl'>Currency Convertor</h1>
          </div>
            <div className="w-full">
                <div className="w-full max-w-md p-5 mx-auto border rounded-lg border-gray-60 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onAmountChange={(amount) => setAmount(amount)}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectedCurrency={from}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onAmountChange={(convertedAmount) => setAmount(convertedAmount)}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectedCurrency={to}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg border-[1px] border-white hover:border-gray-800">
                           Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App
