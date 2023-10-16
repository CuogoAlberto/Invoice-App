<template>
    <div class="home container">
        <!-- Header -->
        <div class="header d-flex">
            <div class="left d-flex flex-column">
                <h1>Invoices</h1>
                <span>There are {{ invoiceData.length }} total invoices</span>
            </div>
            <div class="right d-flex justify-content-end align-items-center">
                <div @click="toggleFilterMenu" class="filter d-flex align-items-center">
                    <span>Filter by status<span v-if="filteredInvoice">: {{ filteredInvoice }}</span></span>
                    <i class="bi bi-chevron-down"></i>
                    <ul v-show="filterMenu" class="filter-menu bg-dark-blue p-0">
                        <li @click="filteredInvoices">Draft</li>
                        <li @click="filteredInvoices">Pending</li>
                        <li @click="filteredInvoices">Paid</li>
                        <li @click="filteredInvoices">Clear Filter</li>
                    </ul>
                </div>
                <div @click="newInvoice" class="btn bg-dark-blue d-flex">
                    <div class="inner-button d-flex justify-content-center align-items-center">
                        <i class="bi bi-plus-circle"></i>
                        <span>New Invoice</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Invoices -->
        <div v-if="invoiceData.length > 0">
            <Invoice v-for="(invoice, index) in filteredData" :invoice="invoice" :key="index" />
        </div>
        <div v-else class="empty d-flex flex-column">
            <img src="@/assets/illustration-empty.svg" alt="">
            <h3>There is nothing here</h3>
            <p>Create a new invoice by clicking the [New Invoice] button and get started!</p>
        </div>
    </div>
</template>

<script>
    import Invoice from "../components/Invoice.vue"
    import { mapMutations, mapState } from 'vuex'
    export default {
        name: "Home",
        data() {
            return {
                filterMenu: null,
                filteredInvoice: null,
            }
        },
        components: {
            Invoice,
        },
        methods: {
            ...mapMutations(['TOGGLE_INVOICE', 'TOGGLE_EDIT_INVOICE']),
            newInvoice() {
                if (this.editInvoice) {
                    this.TOGGLE_EDIT_INVOICE()
                }
                this.TOGGLE_INVOICE()
            },
            toggleFilterMenu() {
                this.filterMenu = !this.filterMenu
            },
            filteredInvoices(e) {
                if (e.target.innerText === 'Clear Filter') {
                    this.filteredInvoice = null
                    return
                }
                this.filteredInvoice = e.target.innerText
            },
        },
        computed: {
            ...mapState(['invoiceData']),
            filteredData() {
                return this.invoiceData.filter((invoice) => {
                    if (this.filteredInvoice === 'Draft') {
                        return invoice.invoiceDraft === true
                    }
                    if (this.filteredInvoice === 'Pending') {
                        return invoice.invoicePending === true
                    }
                    if (this.filteredInvoice === 'Paid') {
                        return invoice.invoicePaid === true
                    }
                    return invoice
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        .header {
            margin-bottom: 65px;

            .left,
            .right {
                flex: 1;
            }

            .filter {
                position: relative;
                margin-right: 40px;
                cursor: pointer;

                span {
                    font-size: 12px;
                }

                .bi-chevron-down {
                    font-size: 10px;
                    margin-left: 5px;
                }

                .filter-menu {
                    width: 100px;
                    position: absolute;
                    top: 25px;
                    list-style: none;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                    li {
                        cursor: pointer;
                        font-size: 12px;
                        padding: 10px 15px;

                        &:hover {
                            color: var(--prussian-blue);
                            background-color: var(--white);
                        }
                    }
                }
            }

            .btn {
                padding: 5px 12px;
                border-radius: 40px;

                .inner-button {
                    i {
                        margin-right: 8px;
                        font-size: 20px;
                    }
                }
                &:hover {
                    background-color: var(--bs-primary);
                    color: var(--white);
                }
            }
        }
        .empty {
            margin-top: 160px;
            align-items: center;

            img {
                width: 214px;
                height: 200px;
            }

            h3 {
                font-size: 20px;
                margin-top: 40px;
            }

            p {
                text-align: center;
                max-width: 250px;
                font-size: 13px;
                font-weight: 300;
                margin-top: 10px;
            }
        }
    }
</style>