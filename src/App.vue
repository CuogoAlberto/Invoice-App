<template>
  <div v-if="invoicesLoaded">
    <div v-if="!mobile" class="app d-flex flex-column bg-dark">
      <Navigation />
      <div class="app-content d-flex flex-column">
        <Modal v-if="modalActive" />
        <transition name="invoice">
          <InvoiceModal v-if="invoiceModal" />
        </transition>
       <router-view /> 
      </div>
    </div>
    <div v-else class="mobile-message d-flex flex-column text-center justify-content-center align-items-center bg-dark">
      <h2>Sorry, this app is not supported on Mobile Devices</h2>
      <p>To use this app, please use a computer!</p>
    </div>
  </div>
</template>



<script>
  import { mapState, mapActions } from 'vuex'
  import Navigation from "./components/Navigation.vue"
  import InvoiceModal from "./components/InvoiceModal.vue"
  import Modal from "./components/Modal.vue"

  export default{
    data() {
      return {
        mobile:null,
      }
    },
    components: {
      Navigation,
      InvoiceModal,
      Modal,
    },
    created() {
      this.GET_INVOICES()
      this.checkScreen()
      window.addEventListener("resize", this.checkScreen)
    },
    methods: {
      ...mapActions(['GET_INVOICES']),
      checkScreen() {
        const windowWidth = window.innerWidth
        if (windowWidth <= 750) {
          this.mobile = true
          return
        }
        this.mobile = false
      }
    },
    computed: {
      ...mapState(['invoiceModal', 'modalActive', 'invoicesLoaded'])
    }
  }
</script>


<style lang="scss">
  .app {
    min-height: 100vh;
    @media(min-width: 900px) {
      flex-direction: row !important;
    }

    .app-content {
      padding: 0 20px;
      flex: 1;
      position: relative;
    }
  }

  .mobile-message {
    height: 100vh;
    color: var(--white);
    padding: 0 20px;

    p {
      margin-top: 16px;
    }
  }

  // animation invoice
  .invoice-enter-active, .invoice-leave-active {
    transition: 0.8s ease all;
  }

  .invoice-enter-from, .invoice-leave-to {
    transform: translateX(-700px)
  }
</style>
