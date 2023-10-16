<template>
    <LoadingInvoice v-if="loading" />
    <div v-if="currentInvoice" class="invoice-view container">
        <router-link class="nav-link d-flex" :to="{ name: 'Home' }">
            <i class="bi bi-arrow-left"></i>Go back
        </router-link>
        <!-- Header -->
        <div class="header d-flex">
            <div class="left d-flex">
                <span>Status</span>
                <div class="status-button d-flex" :class="{paid : currentInvoice.invoicePaid, draft : currentInvoice.invoiceDraft, pending : currentInvoice.invoicePending }">
                    <span v-if="currentInvoice.invoicePaid">Paid</span>
                    <span v-if="currentInvoice.invoiceDraft">Draft</span>
                    <span v-if="currentInvoice.invoicePending">Pending</span>
                </div>
            </div>
            <div class="right d-flex">
                <button @click="toggleEditInvoice" id="edit" class="btn bg-light-brown"><i class="bi bi-pencil me-2"></i>Edit</button>
                <button @click="deleteInvoice(currentInvoice.docId)" class="btn btn-danger"><i class="bi bi-trash me-2"></i>Delete</button>
                <button v-if="currentInvoice.invoicePending" @click="updateStatusToPaid(currentInvoice.docId)" class="btn btn-primary"><i class="bi bi-check-circle me-2"></i>Mark as Paid</button>
                <button v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid" @click="updateStatusToPending(currentInvoice.docId)" id="pending" class="btn bg-dark"><i class="bi bi-arrow-counterclockwise me-2"></i>Mark as Pending</button>
            </div>
        </div>
        <!-- Invoice Details -->
        <div class="invoice-details d-flex flex-column">
            <div class="top d-flex">
                <div class="left d-flex flex-column">
                    <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
                    <p>{{ currentInvoice.productDescription }}</p>
                </div>
                <div class="right d-flex flex-column">
                    <p>{{ currentInvoice.billerStreetAddress }}</p>
                    <p>{{ currentInvoice.billerCity }}</p>
                    <p>{{ currentInvoice.billerZipCode }}</p>
                    <p>{{ currentInvoice.billerCountry }}</p>
                </div>
            </div>
            <div class="middle d-flex">
                <div class="payment d-flex flex-column">
                    <h4>Invoice Date</h4>
                    <p>{{ currentInvoice.invoiceDate }}</p>
                    <h4>Payment Date</h4>
                    <p>{{ currentInvoice.paymentDueDate }}</p>
                </div>
                <div class="bill d-flex flex-column">
                    <h4>Bill To</h4>
                    <p>{{ currentInvoice.clientName }}</p>
                    <p>{{ currentInvoice.clientStreetAddress }}</p>
                    <p>{{ currentInvoice.clientCity }}</p>
                    <p>{{ currentInvoice.clientZipCode }}</p>
                    <p>{{ currentInvoice.clientCountry }}</p>
                </div>
                <div class="send-to d-flex flex-column">
                    <h4>Sent To</h4>
                    <p>{{ currentInvoice.clientEmail }}</p>
                </div>
            </div>
            <div class="bottom d-flex flex-column">
                <div class="billing-items">
                    <div class="heading d-flex">
                        <p>Item Name</p>
                        <p>QTY</p>
                        <p>Price</p>
                        <p>Total</p>
                    </div>
                    <div v-for="(item, index) in currentInvoice.invoiceItemList" :key="index" class="item d-flex">
                        <p>{{ item.itemName }}</p>
                        <p>{{ item.qty }}</p>
                        <p>{{ item.price }}</p>
                        <p>{{ item.total }}</p>
                    </div>
                </div>
                <div class="total d-flex">
                    <p>Amount Due</p>
                    <p>{{ currentInvoice.invoiceTotal }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import LoadingInvoice from '../components/LoadingInvoice.vue'
export default {
    name: 'invoiceView',
    data() {
        return {
            currentInvoice: null,
            loading: null,
        }
    },
    components: {
        LoadingInvoice,
    },
    created() {
        this.getCurrentInvoice()
    },
    methods: {
        ...mapMutations(['SET_CURRENT_INVOICE', 'TOGGLE_EDIT_INVOICE', 'TOGGLE_INVOICE']),
        ...mapActions(['DELETE_INVOICE', 'UPDATE_STATUS_TO_PENDING', 'UPDATE_STATUS_TO_PAID']),
        getCurrentInvoice() {
            this.SET_CURRENT_INVOICE(this.$route.params.invoiceId)
            this.currentInvoice = this.currentInvoiceArray[0]
        },
        toggleEditInvoice() {
            this.TOGGLE_EDIT_INVOICE()
            this.TOGGLE_INVOICE()
        },
        async deleteInvoice(docId) {
            this.loading = true
            await this.DELETE_INVOICE(docId)
            this.loading = false
            this.$router.push({name: 'Home'})
        },
        updateStatusToPaid(docId) {
            this.UPDATE_STATUS_TO_PAID(docId)
        },
        updateStatusToPending(docId) {
            this.UPDATE_STATUS_TO_PENDING(docId)
        },
    },
    computed: {
        ...mapState(['currentInvoiceArray', 'editInvoice']),
    },
    watch: {
        editInvoice() {
            if (!this.editInvoice) {
                this.currentInvoice = this.currentInvoiceArray[0]
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .invoice-view {
        .nav-link {
            margin-bottom: 32px;
            align-items: center;
            font-size: 12px;
            i {
                margin-right: 5px;
            }
        }
        .header, .invoice-details {
            background-color: var(--prussian-blue);
            border-radius: 20px;
        }
        .header {
            align-items: center;
            padding: 24px 32px;
            font-size: 12px;
            .left {
                align-items: center;
                span {
                    color: #dfe3fa;
                    margin-right: 16px;
                }
            }
            .right {
                flex: 1;
                justify-content: flex-end;

                #edit:hover {
                    background-color: var(--garnet);
                }
                #pending:hover {
                    background-color: var(--bs-dark);
                }
            }
        }
        .invoice-details {
            padding: 48px;
            margin-top: 24px;
            .top {
                div {
                    color: #dfe3fa;
                    flex: 1;
                }
                .left {
                    font-size: 12px;
                    p:first-child {
                        font-size: 24px;
                        color: #fff;
                        text-transform: uppercase;
                        margin-bottom: 8px;
                    }
                    p:nth-child(2) {
                        font-size: 16px;
                    }
                    span {
                        color: #888eb0;
                    }
                }
                .right {
                    font-size: 12px;
                    align-items: flex-end;
                }
            }
            .middle {
                margin-top: 50px;
                color: #dfe3fa;
                gap: 16px;
                h4 {
                    font-size: 12px;
                    font-weight: 400;
                    margin-bottom: 12px;
                }
                p {
                    font-size: 16px;
                }
                .bill, .payment {
                    flex: 1;
                }
                .payment {
                    h4:nth-child(3) {
                        margin-top: 32px;
                    }
                    p {
                        font-weight: 600;
                    }
                }
                .bill {
                    p:nth-child(2) {
                        font-size: 16px;
                    }
                    p:nth-child(3) {
                        margin-top: auto;
                    }
                    p {
                        font-size: 12px;
                    }
                }
                .send-to {
                    flex: 2;
                }
            }
            .bottom {
                margin-top: 50px;
                .billing-items {
                    padding: 32px;
                    border-radius: 20px 20px 0 0;
                    background-color: var(--bs-dark);
                    .heading {
                        color: #dfe3fa;
                        font-size: 12px;
                        margin-bottom: 32px;
                        p:first-child {
                            flex: 3;
                            text-align: left;
                        }
                        p {
                            flex: 1;
                            text-align: right;
                        }
                    }
                    .item {
                        margin-bottom: 32px;
                        font-size: 13px;
                        color: #fff;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        p:first-child {
                            flex: 3;
                            text-align: left;
                        }
                        p {
                            flex: 1;
                            text-align: right;
                        }
                    }
                }
                .total {
                    padding: 32px 32px 16px;
                    background-color: rgba(33, 37, 41, 0.5);
                    align-items: center;
                    border-radius: 0 0 20px 20px;
                    p {
                        flex: 1;
                        font-size: 12px;
                    }
                    p:nth-child(2) {
                        font-size: 28px;
                        text-align: right;
                    }
                }
            }
        }
    }
</style>