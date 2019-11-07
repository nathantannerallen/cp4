  /*global fetch*/
  // https://financialmodelingprep.com/developer/docs/

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });


  let app = new Vue({
    el: '#app',
    data: {
      stocks: [],
      prefix: '',
      done: false,
      searchText: '',
      currentTicker: {
        price: '',
        revenue: '',
        revenueGrowth: '',
        COGS: '',
        NetIncome: '',
        NetProfitMargin: '',
        EPS: '',
      },
    },
    created() {

    },
    computed: {

    },
    watch: {

    },
    methods: {
      tickerREST() {
        console.log("Find ticker " + this.prefix);
        var url = "/findTicker?q=" + this.prefix;
        console.log("URL " + url);
        fetch(url)
          .then((data) => {
            return (data.json());
          })
          .then((tickerInfo) => {
            console.log(tickerInfo);
            this.stocks = tickerInfo;
          });
          
      },
      async grabStockInfo() {
        console.log("inStockInfo");
        await this.grabPriceInfo();
        await this.grabIncomeInfo();
        this.done = true;
      },
      async grabPriceInfo() {
        console.log("inPriceInfo");
        try {
          const url = "http://web.nathantannerallen.com:4205/grabPriceInfo?q=" + this.searchText; //keep everything the same except for // route url to routee 
          const response = await axios.get(url);
          console.log(response);
          this.currentTicker.price = formatter.format(response.data.price)
          console.log(this.currentTicker.price);
        }
        catch (error) {
          console.log(error);
        }
      },
      async grabIncomeInfo() {
        console.log("inIncomeInfo");
        try {
          const url = "http://web.nathantannerallen.com:4205/grabIncomeInfo?q=" + this.searchText;
          const response = await axios.get(url);
          console.log(response);
          this.currentTicker.revenue = formatter.format(response.data.financials[0].Revenue)
          this.currentTicker.revenueGrowth = parseFloat(response.data.financials[0]["Revenue Growth"] * 100).toFixed(2) + "%"
          this.currentTicker.COGS = formatter.format(response.data.financials[0]["Cost of Revenue"])
          this.currentTicker.NetIncome = formatter.format(response.data.financials[0]["Net Income"])
          this.currentTicker.NetProfitMargin = parseFloat(response.data.financials[0]["Net Profit Margin"] * 100).toFixed(2) + "%"
          this.currentTicker.EPS = formatter.format(response.data.financials[0].EPS)

          console.log(this.currentTicker.revenue);
          console.log(this.currentTicker.revenueGrowth);
          console.log(this.currentTicker.COGS);
          console.log(this.currentTicker.NetIncome);
          console.log(this.currentTicker.NetProfitMargin);
          console.log(this.currentTicker.EPS);

        }
        catch (error) {
          console.log(error);
        }
      },
    }

  });
  