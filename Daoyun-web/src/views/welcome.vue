<style scoped>
  #welcome{width:100%;height:100%;background-size:cover;overflow: auto;background-position:center center;box-shadow: 0 0px 3px rgba(0,0,0,.5);text-align: center;}
  #welcome img{
    width:100%;
    height:100%;
    overflow:auto;
  }
  .con {
    display: flex;
    align-items: center;
    height: 80%;
    min-height: 500px;
    .con1 {
      flex: 0 0 62.5%;
      width: 62.5%;
      padding-right: 152px;
      zoom: 1;
      }
  }
  .con2 {
    position: relative;
    float: left;
    left: 90%;
    border: none;
  }
  .imgEle {
    float: left;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }
</style>
<template>
  <div class="con">
    <div class="con1">
      <div class="con2" id="welcome">
        <div class="imgEle" >
          <img src="../assets/welcome.jpg"></img>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
