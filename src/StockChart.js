import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const StockChart = (props) => {
  console.log(props.query)

  const [stock, stockChange] = useState("OANDA:SPX500USD")

  useEffect(() => {
    stockChange(props.query)
  }, [props.query])


  const a = `
  new TradingView.widget(
    {
       
        "autosize" : true,
    "symbol": "${stock}",
    "interval": "D",
      "timezone": "Etc/UTC",
        "theme": "light",
          "style": "1",
            "locale": "en",
              "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                  "container_id": "tradingview_fe49f"
}
    );
`


  return (
    <>
      {/* 
      {stockHandler}
      {stockSubmit} */}

      <Helmet>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script type="text/javascript">


          {a}

        </script>
      </Helmet>

      <div className="tradingview-widget-container">
        <div id="tradingview_fe49f"></div>
        {/* <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/TVC-SPX/" rel="noreferrer noopener" target="_blank"><span className="blue-text">SPX Chart</span></a> by TradingView</div> */}

      </div>
    </>
  )
}

export default StockChart
