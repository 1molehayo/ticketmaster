import Vue from 'vue'
import Flutterwave from 'flutterwave-vue-v3'

Vue.use(Flutterwave, { publicKey: process.env.apiPublicKey })
