<template>
  <div class="staff">
    <p class="staff-title">请选择联系人</p>
    <p class="p-else" v-for="(item,index1) in planAddressBooks" :key="index1">
      <span>{{item.addressBooksName}}</span>
      <span>
        <a :href="`tel:${item.addressBooksPhone}`">{{item.addressBooksPhone}}</a>
      </span>
      <span>
        <div class="staff-style">{{item.role}}</div>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["planAddressBooks"],
  data() {
    return {};
  },
  computed: {},
  mounted() {},

  methods: {}
};
</script>

<style scoped lang="less" style="text/less">
.staff {
  width: 100%;
  height: 100%;
  background: #fff;
  p {
    color: #212128;
    display: flex;
    justify-content: space-between;
    padding-left: 32px;
  }
  p:nth-of-type(1) {
    color: #a6a6a6;
    padding-top: 38px;
    padding-bottom: 38px;
    font-size: 28px;
    border-bottom: 1px solid #e6e7f0;
    text-align: center;
    padding-left: 40%;
  }
  .p-else {
    font-size: 32px;
    margin-left: 34px;
    padding: 30px 32px 30px 0;
    border-bottom: 2px solid #e6e7f0;
    span:nth-of-type(1) {
      display: inline-block;
      width: 120px;
    }
    span:nth-of-type(2) {
      display: inline-block;
      width: 240px;
    }
    span:nth-of-type(3) {
      display: inline-block;
      width: 300px;
    }
    .staff-style {
      color: #a6a6a6;
    }
  }
  p:last-child {
    border-bottom: none;
  }
}
</style>



