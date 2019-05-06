<template>
    <div class="row justify-content-md-center">
        <div class="col-md-3">
            <h4>
                Адрес
            </h4>
            <address>
                Университетская площадь 1<br />
                Воронеж, Россия 98052-6399<br />
                <abbr title="Phone">P:</abbr>
                XXX-XX-XX
            </address>

            <address>
                <strong>Поддержка: </strong><a href="http://www.amm.vsu.ru/">www.amm.vsu.ru</a><br />
            </address>
        </div>
        <div class="col-md-8">
            <div style="overflow:hidden;width: 650px; position: relative;">
                <iframe width="450" height="400" src="https://maps.google.com/maps?width=250&amp;height=250&amp;hl=en&amp;q=Moscow%2C%20Voronezh%2C%20Universitetskaya%20Ploshchad%5C'%2C%201+(AMM%20Car%20Dealer)&amp;ie=UTF8&amp;t=&amp;z=15&amp;iwloc=B&amp;output=embed" frameborder="1" scrolling="no" marginheight="10" marginwidth="10"></iframe><div style="position: absolute;width: 80%;bottom: 10px;left: 0;right: 0;margin-left: auto;margin-right: auto;color: #000;text-align: center;"><small style="line-height: 1.8;font-size: 2px;background: #fff;">Powered by <a href="https://embedgooglemaps.com/en/">https://embedgooglemaps.com/en/</a> & <a href="https://iamsterdamcard.it">i amsterdamcard it</a></small></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Contact"
    }
</script>

<style scoped>
    #gmap_canvas img {
        max-width: none !important;
        background: none !important
    }
</style>