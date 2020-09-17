<template>
    <div :class="[ 'card' , 'shadow-sm', classType(item.Status) ]" >
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">{{ item.County }} - {{ item.SiteName }}</h4>
        </div>
        <div class="card-body">
          <ul class="list-unstyled mb-4">
            <li>{{ fields.AQI }} : {{ item.AQI }}</li>
            <li>{{ fields['PM2.5'] }} : {{ item['PM2.5'] }}</li>
            <li>{{ fields.Status }} : {{ item.Status }}</li>
            <li>{{ fields.WindSpeed }} : {{ item.WindSpeed }}</li>
            <li>{{ fields.WindDirec }} : {{ item.WindDirec }}</li>
            <li>{{ fields.Longitude }} : {{ item.Longitude }}</li>
            <li>{{ fields.Latitude }} : {{ item.Latitude }}</li>
          </ul>
          <div>{{ fields.PublishTime }} : {{ item.PublishTime }}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CardTemplate',
  props: {
    item: Object, 
    fields: Object
  },
  methods: {
    classType: function(status) {
      switch(status){
        case '普通':
                return 'bg-light';
        case '對敏感族群不健康':
                return 'bg-warning';
        case '對所有族群不健康':
                return 'bg-warning';
        case '非常不健康':
                return 'bg-warning';
        case '危害':
                return 'bg-danger';
        default:
                return '';
      }
    }
  }
}
</script>