<template>
  <div id="app" class="container my-3">      
      <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">台灣空氣品質指標(AQI)</h1>
        <p class="lead">每小時提供各測站之空氣品質指標（AQI），原始資料版本公告於空氣品質監測網 <a href="https://airtw.epa.gov.tw" target="_blank">https://airtw.epa.gov.tw</a></p>
      </div>

      <div class="form-group row">
          <label for="filterByCounty" class="col-sm-2 col-form-label">篩選城市</label>
          <div class="col-sm-10">
              <select class="form-control" id="filterByCounty" v-model="filterCounty">
                  <option value="all">顯示全部</option>
                  <option :value="country" v-for="country in counties" :key="country"> {{ country }}</option>
              </select>
          </div>
      </div>
      <hr />
      <div class="card-columns mb-3">
          <Card-template v-for="val in filterRecords" :item="val" :fields="fieldsMap" :key="val.SiteId"  />
      </div>
  </div>
</template>

<script>
import CardTemplate from './components/CardTemplate.vue'
import moment from 'moment';

export default {
  name: 'App',
  components: {
    CardTemplate
  },
  data: function() {
    return {
      records: [],
      fieldsMap: {},
      counties: [],
      loading: true,
      filterCounty: 'all'
    }
  },
  mounted: function() {
      let getApi = function(moment) {
        let queryTime = moment.startOf('hour').format('YYYY-MM-DD HH:mm');
        let api = `https://data.epa.gov.tw/api/v1/aqx_p_432?format=json&limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&filters=PublishTime,GR,${queryTime}&sort=SiteId`;
        console.log(api);
        return api;
      }

      let vm = this;
      vm.$http.get(getApi(moment()))
      .then(response => {
          let result = response.data;
          if (result.total == 0) {
              console.log('result.total=' + result.total);
              return vm.$http.get(getApi(moment().add(-1, 'hours')));
          }
          return Promise.resolve(response);
      })
      .then(response => {
          let records = response.data.records;
          let fields = response.data.fields;
          let fieldsMap = {};
          fields.forEach(element => {
              fieldsMap[element.id] = element.info.label;
          });
          this.records = records;
          this.fieldsMap = fieldsMap;
          this.counties = Array.from(new Set(records.map(item => item.County)));              
      })
      .catch(error => {
          console.log(error)
      })
      .finally(() => this.loading = false);                
  },
  computed: {
      filterRecords: function() {
          let vm = this;
          return vm.filterCounty == 'all' ? vm.records : vm.records.filter(item => item.County === vm.filterCounty);
      }            
  }
}
</script>