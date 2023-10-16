<template>
    <div class="modal d-flex justify-content-center align-items-center">
        <div class="modal-content bg-dark-blue">
            <p class="text-center">Are you sure you want to exit?<br>Your changes will not be saved!</p>
            <div class="actions d-flex">
                <button type="button" @click="closeModal" id="return" class="btn bg-blue"><i class="bi bi-arrow-counterclockwise"></i>Return</button>
                <button type="button" @click="closeInvoice" id="close" class="btn btn-danger"><i class="bi bi-x-lg"></i>Close</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: "modal",
    methods: {
        ...mapMutations(['TOGGLE_MODAL', 'TOGGLE_INVOICE', 'TOGGLE_EDIT_INVOICE']),
        closeModal() {
            this.TOGGLE_MODAL()
        },
        closeInvoice() {
            this.TOGGLE_MODAL()
            this.TOGGLE_INVOICE()
            if (this.editInvoice) {
                this.TOGGLE_EDIT_INVOICE()
            }
        },
    },
    computed: {
        ...mapState(['editInvoice']),
    },
}
</script>

<style lang="scss" scoped>
    .modal {
        z-index: 100;
        position: fixed;
        height: 100vh;
        widows: 100%;
        .modal-content {
            border-radius: 20px;
            padding: 48px 32px;
            max-width: 400px;
            p {
                font-size: 18px;
            }
            .actions {
                margin-top: 12px;
                .btn {
                    flex: 1;
                    padding: 5px 12px;
                    border-radius: 40px;
                    font-size: 15px;

                    i {
                        margin-right: 5px;
                        font-size: 15px;
                    }
                    &#return:hover {
                        background-color: var(--tan);
                        color: var(--white);
                    }
                    &#close:hover {
                        background-color: var(--bs-btn-hover-bg);
                        color: var(--white);
                    }
                }
            }
        }
    }
</style>