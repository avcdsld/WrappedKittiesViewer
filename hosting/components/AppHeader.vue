<template>
    <div>
        <br>
        <p></p>
        <p class="logo-title">Wrapped Kitties Viewer</p>
        <p></p>
    </div>
</template>

<style>
.logo-title {
  font: "Helvetica Neue", Helvetica, Arial, sans-serif;
  letter-spacing: -2px;
  font-size: 61px;
  font-weight: bold;
  text-align: center;

  background: linear-gradient(to right, #f00 0%, #f80 14.28%, #dd0 28.56%, #0d0 42.85%, #0dd 57.14%, #00f 71.42%, #e0e 85.71%, #f00 100%) 0% center / 200% auto;
  
  background-clip: text;
  -webkit-background-clip: text;
  
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;

  animation: example 4s linear infinite;
}

@keyframes example {
  to { background-position-x: 200%; }
}

.head_test {
    font: "Helvetica Neue", Helvetica, Arial, sans-serif;
    letter-spacing: -2px;
    font-size: 61px;

    margin: 0;
    position: relative;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
    background-color: #fff;
}
p {
    margin: 0;
    line-height: 2;
}
 
.head_test:before {
    content: '';
    height: 150px;
    width: 150px;
    border: solid 1px #000;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: -1;
}
 
.head_test-wrap {
    padding-bottom: 20px;
}


.navbar-toggle {
    z-index: 2;
}

.navbar-brand-center {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    text-align:center;
    margin: auto;
}

@media (min-width: 768px) {
    .navbar-brand-center {
        margin-left: 0 !important;
    }
}
</style>