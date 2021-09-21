<template>
  <div id="bar-body">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
#bar-body {
  margin: 0;
  text-align: center;
  height: 50px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 3px 1px rgba(100, 100, 100, 0.1);
  background-color: white;
}

#bar-body .center {
  flex: 8;
  text-align: center;
}

.left, .right {
  flex: 1;
  text-align: center;
  padding: 0;
  margin: 0;
}

.left {
    background-color: #c93535;
}
</style>